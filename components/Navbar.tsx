import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'
import { userContext } from '../pages/index';
import { Dispatch, ReactNode, SetStateAction, useContext } from 'react';
import SearchBar from './SearchBar';
import OptionsMenu from './OptionsMenu';
import { Pages } from './MainPageContainer';

interface Props {
    isMobile?: boolean,
    currentPage: Pages,
    setPage: Dispatch<SetStateAction<Pages>>
}

interface PageTitleProps{
    children: ReactNode,
    associatedPage: Pages,
    currentPage: Pages
}

//component to determins the current page title in the navbar
function PageTitle({children, associatedPage, currentPage}: PageTitleProps){
    return currentPage === associatedPage ? <h1 className='w-full text-3xl sm:text-4xl rounded text-center font-bold'>{children}</h1> : null;
}

export default function Navbar({isMobile, currentPage, setPage}: Props){
    const {user} = useContext(userContext);

    return (
        <nav className="bg-white shadow-lg z-50 static lg:sticky top-0">
            <div className="grid grid-cols-12 px-4">
                <button 
                    className='order-1 col-span-6 md:col-span-4 xl:col-span-3 flex justify-start items-center space-x-2 p-1' 
                    onClick={()=>setPage('home')}
                    style={{WebkitTapHighlightColor: 'transparent'}}
                >
                    <div className='text-rose-500'>
                        <FontAwesomeIcon icon={faDumbbell} size="3x"/>
                    </div>
                    <div>
                        <h1 className='text-xl border-b-4 border-violet-500'>Gains</h1>
                        <h1 className='text-xl'>Time</h1>
                    </div> 
                </button>
                <div className='order-last col-span-12 md:col-span-4 xl:col-span-6 py-2 sm:py-4 md:py-0 md:order-2 flex justify-center items-center h-full'>
                    <PageTitle currentPage={currentPage} associatedPage='home'>Welcome {user?.firstName} {user?.lastName}</PageTitle>
                    <PageTitle currentPage={currentPage} associatedPage='weight'>Weight Tracking</PageTitle>
                    <PageTitle currentPage={currentPage} associatedPage='account'>Account Details</PageTitle>
                    <PageTitle currentPage={currentPage} associatedPage='templates'>Exercise Templates</PageTitle>
                </div>
                <div className='order-3 col-span-6 md:col-span-4 xl:col-span-3 flex justify-end items-center'>
                    {!isMobile && currentPage === 'home' &&
                        <div className="grow mr-2"><SearchBar/></div>
                    }
                    <OptionsMenu currentPage={currentPage} setPage={setPage} isMobile={isMobile}/>
                </div>
            </div>
            <div className='w-full h-3 bg-gradient-to-r from-rose-500 via-violet-500 to-rose-500'/>
        </nav>
    );
}