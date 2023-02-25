import { faCircleXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useContext } from "react";
import { searchContext } from "./MainPageContent";

interface Props {
    rounded? : boolean
    setFocus? : Dispatch<SetStateAction<boolean>>
}

export default function SearchBar(props: Props){

    const {search, setSearch} = useContext(searchContext);

    function handleChange(event: ChangeEvent<HTMLInputElement>){
        setSearch(event.target.value);
    }

    //if there is a set focus props, provide a focus function to the search input
    function handleFocus(){
        return props.setFocus ? props.setFocus(true) : undefined
    }

    //if there is a set focus props, provide a blur function to the search input
    function handleBlur(){
        return props.setFocus ? props.setFocus(false) : undefined
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
                    className={`appearance-none shadow-inner ${props?.rounded ? 'rounded-full' : 'rounded'} relative block w-full px-3 py-2 sm:px-2 sm:py-1 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-1 focus:ring-violet-400 focus:border-violet-400 focus:z-10`}
                    placeholder="Search Exercise History"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </form>
            <div className={`absolute top-1/2 -translate-y-1/2 ${props?.rounded ? 'right-3' : 'right-2'} z-20 flex items-center text-xl`}>
                {search.length > 0 
                    ? <button onClick={clearSearch} className='text-rose-500'><FontAwesomeIcon icon={faCircleXmark}/></button>
                    : <FontAwesomeIcon icon={faMagnifyingGlass}/>
                }
            </div>
        </div>
    )
}