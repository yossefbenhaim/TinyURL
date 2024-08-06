import { Outlet } from 'react-router-dom';

import Navbar from '../navbar/navbar';

const Library = () => {

	return (
		<div className=" h-[100vh] ">
			<Navbar />
			<div className='h-[90%] pt-5 flex flex-col items-center  overflow-y-auto overflow-x-hidden scrollbar  scrollbar-w-1.5  scrollbar-h-1  scrollbar-thumb-primary-color scrollbar-thumb-rounded-xl mr-1'>
				<Outlet />
			</div>
		</div>
	)
}

export default Library