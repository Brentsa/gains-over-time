import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'
import LogoutButton from './buttons/LogoutButton';
import { userContext } from '../pages/index';
import { useContext } from 'react';

export default function Navbar(){

    const user = useContext(userContext);

    return (
        <nav className="bg-white shadow-lg z-50 static lg:sticky top-0">
            <div className="grid grid-cols-12 px-4">
                <div className='order-1 col-span-6 md:col-span-2 flex justify-start items-center space-x-4 p-1'>
                    <div className='text-rose-500'>
                        <FontAwesomeIcon icon={faDumbbell} size="3x"/>
                    </div>
                    <div>
                        <h1 className='text-xl border-b-4 border-violet-400'>Gains</h1>
                        <h1 className='text-xl'>Time</h1>
                    </div> 
                </div>
                <div className='order-last col-span-12 py-4 md:py-0 md:order-2 md:col-span-8 flex justify-center items-center h-full'>
                    <h1 className='w-full md:w-1/2 text-4xl rounded text-center font-bold'>
                        Welcome {user?.firstName} {user?.lastName}
                    </h1>
                </div>
                <div className='order-3 col-span-6 md:col-span-2 flex justify-end items-center'>
                    <LogoutButton/>
                </div>
            </div>
            <div className='w-full h-3 bg-gradient-to-r from-rose-500 via-violet-500 to-rose-500'/>
        </nav>
    )
}