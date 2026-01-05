#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Tag mapping based on gdelgado.ca original site
const tagMapping = {
  // software tag
  'software': [
    '2022-01-08-reference-xargs-input-string-in-your-shell-expressions',
    '2021-01-26-neverthrow-subtyping',
    '2020-03-07-chaining-failable-tasks',
    '2019-04-29-type-safe-error-handling-in-typescript',
    '2019-03-08-parlez-vous-anglais-part-2',
    '2018-12-28-parlez-vous-anglais-part-1',
    '2018-10-06-my-over-engineered-blogging-setup',
    '2018-05-27-zero-dependancy-pub-sub-system-with-postgresql',
    '2018-04-01-the-economics-of-js',
    '2015-07-30-soup',
  ],
  // tutorial tag
  'tutorial': [
    '2018-10-06-my-over-engineered-blogging-setup',
  ],
  // entrepreneurship tag
  'entrepreneurship': [
    '2017-04-23-in-the-trenches',
    '2017-01-21-autodidact',
    '2017-01-07-2016-review',
    '2016-09-22-hello-again',
    '2016-04-24-bye-bye-bykme',
  ],
  // habits tag
  'habits': [
    '2017-01-28-on-improvement-kaizen',
    '2017-01-12-values-goals',
    '2016-10-16-introversion',
  ],
  // posts tag (general 2015-2016 posts)
  'posts': [
    '2016-04-02-so-you-want-to-take-a-mooc',
    '2016-01-04-thoughts-from-a-wanna-be-entrepreneur',
    '2015-11-18-free-code-camp-meet-exercism-io',
    '2015-11-05-free-men',
    '2015-09-27-thanks-hack-the-north',
    '2015-08-08-information-diets',
    '2015-08-04-context-then-content',
    '2015-07-25-renovations-almost-complete',
    '2015-07-22-bye-bye-wordpress',
    '2015-07-11-the-spirit-of-man-kind',
    '2015-07-06-renovations-2-0',
    '2015-06-29-frameworks-vs-abstract-thinking',
    '2015-06-02-uncomfortableness',
    '2015-03-31-your-mind-is-an-input-output-machine',
    '2015-03-24-say-hello-to-bykme',
    '2015-03-02-what-happened-to-the-laurier-entrepreneur',
    '2015-02-24-i-just-did-what',
    '2015-02-14-to-do-make-list-making-a-habit',
    '2015-02-10-10-days-of-learning',
    '2015-02-06-let-the-excitement-begin',
    '2015-01-23-restarting-for-efficiency-s-sake',
    '2015-01-20-artificially-defeated',
    '2015-01-15-business-development-week',
    '2015-01-07-some-updates',
    '2015-01-05-and-we-re-off-to-the-races',
    '2014-12-28-self-development-challenge-the-plan',
    '2014-12-26-self-development-challenge',
    '2014-11-07-renovations-underway',
  ],
  // forty-eight tag (early 2014 posts - the 48 posts challenge)
  'forty-eight': [
    '2014-05-01-adios',
    '2014-04-29-be-water-my-friend',
    '2014-04-27-empathizing',
    '2014-04-25-new-month-new-vision',
    '2014-04-23-irrational-rationalizations',
    '2014-04-21-the-market-for-uniqueness',
    '2014-04-19-internalizing-books',
    '2014-04-17-mindful-meditation',
    '2014-04-15-paradoxical-intention',
    '2014-04-13-listen-to-tyler-durden',
    '2014-04-11-reducing-noise',
    '2014-04-09-the-age-of-joblessness',
    '2014-04-07-therapy-in-writing',
    '2014-04-05-the-golden-rule',
    '2014-04-03-chilling-out',
    '2014-04-01-self-teaching',
    '2014-03-30-unlimit-yourself',
    '2014-03-28-exploiting-disruptive-innovation',
    '2014-03-26-iatrogenesis',
    '2014-03-24-the-best-investment',
    '2014-03-22-automation-is-nigh',
    '2014-03-20-rewiring-yourself-again',
    '2014-03-18-interesting-podcasts',
    '2014-03-16-war-s-broken-window',
    '2014-03-14-sonder',
    '2014-03-12-eliminating-dependance',
    '2014-03-10-the-siddhartha-effect',
    '2014-03-08-a-note-on-guidance-councillors',
    '2014-03-06-one-of-my-idols',
    '2014-03-04-diminishing-marginal-returns-to-life',
    '2014-03-02-work-now-relax-later',
    '2014-02-28-robinhood-the-finance-industry-s-newest-innovation',
    '2014-02-26-controlling-information-overload',
    '2014-02-24-the-irony-in-anarchy',
    '2014-02-22-be-a-yes-man-or-woman',
    '2014-02-20-venezuela-needs-your-help',
    '2014-02-18-core-concepts-of-value',
    '2014-02-16-mentally-exhausted',
    '2014-02-14-the-modern-allegory-of-the-cave',
    '2014-02-12-my-year-so-far-in-haiku',
    '2014-02-10-statistical-illusions',
    '2014-02-08-my-reading-list',
    '2014-02-06-instagram-horde-of-naive-businessmen',
    '2014-02-04-survivorship-bias-and-other-cool-stuff',
    '2014-02-02-be-adventurous',
    '2014-01-31-the-egg',
    '2014-01-29-the-starbucks-alternative',
    '2014-01-27-how-valuable-would-your-stock-be',
    '2014-01-25-i-suck-at-math-for-now',
    '2014-01-23-steer-clear-of-markets',
    '2014-01-21-hello-world',
  ],
};

// Create a reverse mapping: filename -> tags
const fileToTags = {};
for (const [tag, files] of Object.entries(tagMapping)) {
  for (const file of files) {
    if (!fileToTags[file]) {
      fileToTags[file] = [];
    }
    fileToTags[file].push(tag);
  }
}

const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

let updated = 0;
let skipped = 0;

for (const file of files) {
  const filePath = path.join(blogDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');

  // Extract the slug from filename (remove .md extension)
  const slug = file.replace('.md', '');
  const tags = fileToTags[slug] || [];

  if (tags.length === 0) {
    console.log(`No tags for: ${file}`);
    skipped++;
    continue;
  }

  // Check if tags already exist in frontmatter
  if (content.includes('tags:')) {
    console.log(`Tags already exist in: ${file}`);
    skipped++;
    continue;
  }

  // Add tags to frontmatter
  const tagsLine = `tags: [${tags.map(t => `"${t}"`).join(', ')}]`;

  // Insert tags before the closing ---
  const updatedContent = content.replace(
    /^(---\n[\s\S]*?)(---)$/m,
    (match, frontmatter, closing) => {
      return frontmatter + tagsLine + '\n' + closing;
    }
  );

  fs.writeFileSync(filePath, updatedContent);
  console.log(`Added tags [${tags.join(', ')}] to: ${file}`);
  updated++;
}

console.log(`\nDone! Updated: ${updated}, Skipped: ${skipped}`);
