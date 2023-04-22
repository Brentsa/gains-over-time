import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'
import { userContext } from '../pages/index';
import { useContext } from 'react';
import SearchBar from './SearchBar';
import OptionsMenu from './OptionsMenu';

interface Props {
    isMobile?: boolean
}

export default function Navbar({isMobile}: Props){

    const user = useContext(userContext);

    return (
        <nav className="bg-white shadow-lg z-50 static lg:sticky top-0">
            <div className="grid grid-cols-12 px-4">
                <div className='order-1 col-span-6 md:col-span-4 xl:col-span-3 flex justify-start items-center space-x-2 p-1'>
                    <div className='text-rose-500'>
                        <FontAwesomeIcon icon={faDumbbell} size="3x"/>
                    </div>
                    <div>
                        <h1 className='text-xl border-b-4 border-violet-500'>Gains</h1>
                        <h1 className='text-xl'>Time</h1>
                    </div> 
                </div>
                <div className='order-last col-span-12 md:col-span-4 xl:col-span-6 py-2 sm:py-4 md:py-0 md:order-2 flex justify-center items-center h-full'>
                    <h1 className='w-full text-3xl sm:text-4xl rounded text-center font-bold'>
                        Welcome {user?.firstName} {user?.lastName}
                    </h1>
                </div>
                <div className='order-3 col-span-6 md:col-span-4 xl:col-span-3 flex justify-end items-center'>
                    {!isMobile &&
                        <div className="grow mr-2">
                            <SearchBar/>
                        </div>
                    }
                    <OptionsMenu/>
                </div>
            </div>
            <div className='w-full h-3 bg-gradient-to-r from-rose-500 via-violet-500 to-rose-500'/>
        </nav>
    )
}