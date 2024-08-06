import { useNavigate, useLocation } from 'react-router-dom';
import { NavbarOptions } from "models/enums/navbarOption"
import { PathName } from "models/enums/pathName";
import { useEffect } from 'react';

const TINY_URL = 'TinyURL'

interface Navbar {
	item: string,
	path: string,
}

const NavbarPathOptions: Navbar[] = [
	{ item: NavbarOptions.CREATE_SHORTCUT_URL, path: PathName.CREATE_SHORTCUT_URL },
	{ item: NavbarOptions.BEST_DOMAINS_TABLE, path: PathName.BEST_DOMAINS_TABLE },
]

const Navbar = () => {
	const navigation = useNavigate();
	const currentPath = useLocation();

	const navigationPage = (path: string) => {
		navigation(path);
	}

	useEffect(() => {
		if (currentPath.pathname === PathName.HOME) {
			navigation(PathName.CREATE_SHORTCUT_URL);
		}
	}, [currentPath])


	return (
		<div className='z-50 sticky top-0 px-[10%] w-full h-[10%] bg-[#15152a]/20 items-end flex flex-row justify-between  backdrop-blur-lg'>
			<div className='flex flex-row gap-2 w-[30%]'>
				<p className='text-black/90 font-semibold'>{TINY_URL}</p>
			</div>
			<div className='w-[80%]'>
				<ul className=" justify-end flex flex-row gap-[6%] items-center">
					{
						Object.values(NavbarPathOptions).map((option) => (
							<li key={option.item}>
								<a
									onClick={() => navigationPage(option.path)}
									className={`${currentPath.pathname === option.path ? 'text-primary-color font-bold' : 'text-black/80'} text-base font-medium tracking-widest  relative group`}>
									{option.item}
									<div className={`${currentPath.pathname === option.path ? 'bg-primary-color font-bold' : 'text-black/80 group-hover:scale-x-100 scale-x-0 transition-transform'} absolute w-full h-0.5 `} />
								</a>
							</li>
						))
					}
				</ul>
			</div>
		</div>
	)
}

export default Navbar