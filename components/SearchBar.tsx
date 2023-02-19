import { faCircleXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useContext } from "react";

interface Props {
    search: string,
    setSearch: Dispatch<SetStateAction<string>>
}

export default function SearchBar({search, setSearch}: Props){

    function handleChange(event: ChangeEvent<HTMLInputElement>){
        setSearch(event.target.value);
    }

    //blur the search bar if the form is submitted
    function handleSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        document.getElementById('search-bar')?.blur();
    }

    //clear the global search state
    function clearSearch(){
        setSearch('');
    }

    return (
        <div className="relative w-full">
            <form className="w-full" onSubmit={handleSubmit}>
                <label htmlFor="search-bar" className="sr-only ">Search Bar</label>
                <input
                    id="search-bar"
                    name={'search'}
                    value={search}
                    onChange={handleChange}
                    className="appearance-none shadow-inner rounded relative block w-full px-3 py-2 sm:px-2 sm:py-1 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-1 focus:ring-violet-400 focus:border-violet-400 focus:z-10"
                    placeholder="Search Exercise History"
                />
            </form>
            <div className="absolute top-1/2 -translate-y-1/2 right-2 z-20 flex items-center text-xl">
                {search.length > 0 
                    ? <button onClick={clearSearch} className='text-rose-500'><FontAwesomeIcon icon={faCircleXmark}/></button>
                    : <FontAwesomeIcon icon={faMagnifyingGlass}/>
                }
            </div>
        </div>
    )
}