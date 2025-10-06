import type { AnchorHTMLAttributes, PropsWithChildren } from 'react';

type HeaderLinkProps = PropsWithChildren<
	AnchorHTMLAttributes<HTMLAnchorElement> & {
		href: string;
		currentPath?: string;
	}
>;

const normalizePath = (path: string) => {
	if (path === '/') {
		return '/';
	}
	return path.replace(/\/+$/, '') || '/';
};

const HeaderLink = ({ href, currentPath = '/', className, children, ...rest }: HeaderLinkProps) => {
	const normalizedTarget = normalizePath(href);
	const normalizedPath = normalizePath(currentPath);
	const isActive =
		normalizedTarget === '/'
			? normalizedPath === '/'
			: normalizedPath === normalizedTarget || normalizedPath.startsWith(`${normalizedTarget}/`);

	const baseClasses =
		'inline-flex items-center border-b-2 border-transparent px-2 py-4 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent';
	const activeClasses = 'border-accent text-accent';
	const composedClassName = [baseClasses, isActive ? activeClasses : null, className]
		.filter(Boolean)
		.join(' ');

	return (
		<a href={href} className={composedClassName} {...rest}>
			{children}
		</a>
	);
};

export default HeaderLink;
