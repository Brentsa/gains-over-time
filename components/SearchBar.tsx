import { faCircleXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, Dispatch, SetStateAction, useContext, useEffect, useRef } from "react";
import FormInput from "./forms/FormInput";
import { searchContext } from "./MainPageContent";

interface Props {
    setSearch: Dispatch<SetStateAction<string>>
}

export default function SearchBar({setSearch}: Props){

    const search = useContext(searchContext);

    function handleChange(event: ChangeEvent<HTMLInputElement>){
        setSearch(event.target.value);
    }

    //clear the global search state
    function clearSearch(){
        setSearch('');
    }

    return (
        <div 
            className="relative w-full h-full mb-2"
        >
            <div className="w-full">
                <label htmlFor="search-bar" className="sr-only ">Search Bar</label>
                <input
                    id="search-bar"
                    name={'search'}
                    value={search}
                    onChange={handleChange}
                    className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-1 focus:ring-violet-400 focus:border-violet-400 focus:z-10"
                    placeholder="Filter Exercise Table"
                />
            </div>
            <div className="absolute top-0 right-0 z-20 p-2 pr-3 h-full flex items-center text-xl">
                {search.length > 0 
                    ? <button onClick={clearSearch} className='text-rose-500'><FontAwesomeIcon icon={faCircleXmark}/></button>
                    : <FontAwesomeIcon icon={faMagnifyingGlass}/>
                }
            </div>
        </div>
    )
}