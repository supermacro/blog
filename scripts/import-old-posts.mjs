import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const currentFile = fileURLToPath(import.meta.url);
const projectDir = path.resolve(path.dirname(currentFile), '..');
const sourceDir = path.resolve(projectDir, '../personal-site-old/content/posts');
const targetDir = path.resolve(projectDir, 'src/content/blog');

const isMarkdown = (filename) => filename.toLowerCase().endsWith('.md');

const slugify = (value) =>
	value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.replace(/-{2,}/g, '-');

const normalizeDate = (value, fallback) => {
	const raw = value?.trim() || fallback;
	const parsed = raw ? new Date(raw) : null;
	if (!parsed || Number.isNaN(parsed.getTime())) {
		throw new Error(`Unable to parse date for ${fallback} (raw: ${raw})`);
	}
	return parsed.toISOString().split('T')[0];
};

const toPlainText = (markdown) =>
	markdown
		.replace(/```[\s\S]*?```/g, '')
		.replace(/`([^`]+)`/g, '$1')
		.replace(/\[(.*?)\]\((.*?)\)/g, '$1')
		.replace(/[*_~]/g, '')
		.replace(/#+\s*/g, '')
		.replace(/>\s*/g, '')
		.replace(/\s+/g, ' ')
		.trim();

const buildDescription = (body, title) => {
	const paragraphs = body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
	const candidate = paragraphs[0] || title;
	const plain = toPlainText(candidate);
	if (!plain) {
		return title;
	}
	const limit = 180;
	return plain.length > limit ? `${plain.slice(0, limit - 1).trimEnd()}…` : plain;
};

const toFrontmatter = ({ title, description, pubDate }) =>
	['---', `title: ${JSON.stringify(title)}`, `description: ${JSON.stringify(description)}`, `pubDate: ${JSON.stringify(pubDate)}`, '---'].join('\n');

const parseFile = (contents) => {
	const lines = contents.split(/\r?\n/);
	const metadata = {};
	let index = 0;
	while (index < lines.length) {
		const line = lines[index];
		if (!line.trim()) {
			index += 1;
			break;
		}
		const match = line.match(/^([A-Za-z]+):\s*(.*)$/);
		if (!match) {
			break;
		}
		const [, key, value] = match;
		metadata[key.toLowerCase()] = value.trim();
		index += 1;
	}
	while (index < lines.length && !lines[index].trim()) {
		index += 1;
	}
	const body = lines.slice(index).join('\n').trimEnd();
	return { metadata, body };
};

const run = async () => {
	const files = (await fs.readdir(sourceDir)).filter(isMarkdown).sort();
	await fs.rm(targetDir, { recursive: true, force: true });
	await fs.mkdir(targetDir, { recursive: true });
	for (const filename of files) {
		const sourcePath = path.join(sourceDir, filename);
		const contents = await fs.readFile(sourcePath, 'utf8');
		const { metadata, body } = parseFile(contents);
		const fallbackTitle = filename
			.replace(/^[0-9]{4}-[0-9]{2}-[0-9]{2}-/, '')
			.replace(/\.md$/i, '')
			.replace(/[-_]+/g, ' ');
		const title = metadata.title || fallbackTitle;
		const fileDate = filename.slice(0, 10);
		const pubDate = normalizeDate(metadata.date, fileDate);
		const description = buildDescription(body, title);
		const slug = slugify(title) || slugify(fallbackTitle) || 'post';
		const outputFilename = `${fileDate}-${slug}.md`;
		const targetPath = path.join(targetDir, outputFilename);
		const frontmatter = toFrontmatter({ title, description, pubDate });
		const finalContent = `${frontmatter}\n\n${body}\n`;
		await fs.writeFile(targetPath, finalContent, 'utf8');
	}
};

run().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
