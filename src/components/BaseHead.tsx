import type { ImageMetadata } from 'astro';
import FallbackImage from '../assets/blog-placeholder-1.jpg';
import { SITE_TITLE } from '../consts';
import '../styles/global.css';

type BaseHeadProps = {
	title: string;
	description: string;
	canonicalUrl: string;
	pageUrl: string;
	rssUrl: string;
	sitemapUrl: string;
	generator: string;
	image?: ImageMetadata;
};

const BaseHead = ({
	title,
	description,
	canonicalUrl,
	pageUrl,
	rssUrl,
	sitemapUrl,
	generator,
	image = FallbackImage,
}: BaseHeadProps) => {
	const imageSrc = typeof image === 'string' ? image : image.src;
	const absoluteImageUrl = new URL(imageSrc, pageUrl).toString();

	return (
		<>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width,initial-scale=1" />
			<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
			<link rel="sitemap" href={sitemapUrl} />
			<link rel="alternate" type="application/rss+xml" title={SITE_TITLE} href={rssUrl} />
			<meta name="generator" content={generator} />
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
			<link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
			<link rel="canonical" href={canonicalUrl} />
			<title>{title}</title>
			<meta name="title" content={title} />
			<meta name="description" content={description} />
			<meta property="og:type" content="website" />
			<meta property="og:url" content={pageUrl} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={absoluteImageUrl} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content={pageUrl} />
			<meta property="twitter:title" content={title} />
			<meta property="twitter:description" content={description} />
			<meta property="twitter:image" content={absoluteImageUrl} />
		</>
	);
};

export default BaseHead;
