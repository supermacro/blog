const socialLinks = [
	{ href: 'https://m.webtoo.ls/@astro', label: 'Mastodon' },
	{ href: 'https://twitter.com/astrodotbuild', label: 'Twitter' },
	{ href: 'https://github.com/withastro/astro', label: 'GitHub' },
];

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="border-t border-cloud/70 py-10 text-center text-xs text-mist">
			<div className="mx-auto flex max-w-content flex-col items-center gap-3 px-4">
				<p className="tracking-[0.28em] uppercase text-mist/70">{currentYear} · Notes from the workshop</p>
				<nav className="flex flex-wrap justify-center gap-4">
					{socialLinks.map(({ href, label }) => (
						<a
							key={href}
							href={href}
							target="_blank"
							rel="noreferrer"
							className="font-medium text-mist transition-colors hover:text-accent"
						>
							{label}
						</a>
					))}
				</nav>
			</div>
		</footer>
	);
};

export default Footer;
