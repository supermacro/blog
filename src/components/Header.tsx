import { SITE_TITLE } from '../consts';
import HeaderLink from './HeaderLink';

type HeaderProps = {
	currentPath: string;
};

const Header = ({ currentPath }: HeaderProps) => (
	<header className="py-8">
		<div className="flex justify-center">
			<a href="/" className="text-heading transition-colors duration-200 hover:text-accent">
				<h1 className="text-center text-3xl italic font-normal">{SITE_TITLE}</h1>
			</a>
		</div>
		<nav className="mt-4">
			<ul className="flex justify-center gap-4 p-0 m-0">
				<li className="list-none">
					<HeaderLink href="/about" currentPath={currentPath}>
						About
					</HeaderLink>
				</li>
				<li className="list-none">
					<HeaderLink href="/archive" currentPath={currentPath}>
						Archives
					</HeaderLink>
				</li>
			</ul>
		</nav>
	</header>
);

export default Header;
