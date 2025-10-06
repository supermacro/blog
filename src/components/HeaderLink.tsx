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
		'relative inline-flex items-center px-2 py-1 font-medium text-mist transition-colors hover:text-accent';
	const activeClasses =
		'text-ink after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-accent after:content-[""]';
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
