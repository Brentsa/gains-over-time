import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'
import LogoutButton from './buttons/LogoutButton';

export default function Navbar(){

    return (
        <nav className="bg-white shadow opacity-90 sticky top-0">
            <div className="flex items-center justify-between py-2 px-4">
                <div className='flex items-center space-x-4'>
                    <div className='text-amber-500'>
                        <FontAwesomeIcon icon={faDumbbell} size="3x"/>
                    </div>
                    <div>
                        <h1 className='text-xl border-b-4 border-black'>Gains</h1>
                        <h1 className='text-xl'>Time</h1>
                    </div> 
                </div>
                <LogoutButton/>
            </div>
        </nav>
    )
}