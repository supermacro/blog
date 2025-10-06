import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import HeaderLink from './HeaderLink';

type HeaderProps = {
	currentPath: string;
};

const Header = ({ currentPath }: HeaderProps) => (
	<header className="border-b border-cloud/70 bg-transparent">
		<nav className="mx-auto flex max-w-content items-center justify-between px-4 py-6">
			<div className="flex flex-col">
				<a href="/" className="text-base font-semibold uppercase tracking-[0.28em] text-mist no-underline">
					{SITE_TITLE}
				</a>
				<span className="mt-1 text-xs text-mist/70">{SITE_DESCRIPTION}</span>
			</div>
			<div className="flex items-center gap-3 text-sm">
				<HeaderLink href="/" currentPath={currentPath}>
					Home
				</HeaderLink>
				<HeaderLink href="/blog" currentPath={currentPath}>
					Archive
				</HeaderLink>
				<HeaderLink href="/about" currentPath={currentPath}>
					About
				</HeaderLink>
			</div>
		</nav>
	</header>
);

export default Header;
