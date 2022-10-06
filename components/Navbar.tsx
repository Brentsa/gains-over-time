import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'
import LogoutButton from './buttons/LogoutButton';
import { Props } from '../pages/index';

export default function Navbar({user}: Props){

    return (
        <nav className="bg-white shadow opacity-90 sticky top-0">
            <div className="grid grid-cols-12 py-2 px-4">
                <div className='order-1 col-span-6 md:col-span-2 flex justify-start items-center space-x-4'>
                    <div className='text-rose-500'>
                        <FontAwesomeIcon icon={faDumbbell} size="3x"/>
                    </div>
                    <div>
                        <h1 className='text-xl border-b-4 border-violet-400'>Gains</h1>
                        <h1 className='text-xl'>Time</h1>
                    </div> 
                </div>
                <div className='order-last col-span-12 py-4 md:py-0 md:order-2 md:col-span-8 flex justify-center items-center'>
                    <h1 className='w-full md:w-1/2 text-2xl bg-violet-300 rounded py-2 text-center'>
                        Welcome {user?.firstName} {user?.lastName}
                    </h1>
                </div>
                <div className='order-3 col-span-6 md:col-span-2 flex justify-end items-center'>
                    <LogoutButton/>
                </div>
            </div>
        </nav>
    )
}