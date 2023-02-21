import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import FeedbackBar from "./FeedbackBar";
import AddExerciseForm from "./forms/AddExerciseForm";
import Navbar from "./Navbar";
import RenderVerticalTabs from "./RenderVerticalTabs";
import SearchBar from "./SearchBar";
import ExerciseTable from "./tables/ExerciseTable";
import Paper from "./utilities/Paper";
import TabContent from "./utilities/TabContent";
import VerticalTabs from "./utilities/VerticalTabs";

interface Props {
    showOnMobile: boolean
}

interface Feedback {
    message: string,
    type: '' | 'success' | 'failure'
}

interface FeedbackPackage {
    feedback: Feedback,
    setFeedback: Dispatch<SetStateAction<Feedback>>
}

interface SearchPackage {
    search: string,
    setSearch: Dispatch<SetStateAction<string>>
}

export const feedbackContext = createContext<FeedbackPackage>({
    feedback: {
        message: '',
        type: '',
    },
    setFeedback: () => {}
});

export const searchContext = createContext<SearchPackage>({
    search: '',
    setSearch: () => {}
});

export default function MainPageContent({showOnMobile}: Props){

    const [showVertTabs, setShowVertTabs] = useState(false);
    const [feedback, setFeedback] = useState<Feedback>({message: '', type: ''});
    const [search, setSearch] = useState<string>('');

    return (
        <searchContext.Provider value={{search, setSearch}}>
        <feedbackContext.Provider value={{feedback, setFeedback}}>
            <main>
                <Navbar isMobile={showOnMobile}/>
                <section className='container pb-4 pt-0 sm:pt-4'>
                    {showOnMobile 
                        ?
                            <div className='flex flex-col'>
                                <div className='basis-1/3'>
                                <div className='flex flex-col flex-wrap space-y-4'>
                                    <Paper>
                                        <div className='flex justify-around' id='mobile-state-buttons'>
                                            <button 
                                                onClick={() => setShowVertTabs(false)} 
                                                className={!showVertTabs ? 'font-bold border-b-2 border-rose-400' : ''}
                                            >
                                                Exercise List
                                            </button>
                                            <button 
                                                onClick={() => setShowVertTabs(true)} 
                                                className={showVertTabs ? 'font-bold border-b-2 border-rose-400' : ''}
                                            >
                                                Modify Exercises
                                            </button>
                                        </div>
                                    </Paper>
                                    {showVertTabs 
                                        ? 
                                            <Paper><RenderVerticalTabs/></Paper>
                                        : 
                                            <>
                                                <Paper className='sticky top-0 z-30 flex flex-col p-1' paddingNone id='search-add-box'>
                                                    <VerticalTabs>
                                                        <TabContent icon={faPlus}>
                                                            <AddExerciseForm/>
                                                        </TabContent>
                                                        <TabContent icon={faSearch}>
                                                            <SearchBar search={search} setSearch={setSearch}/>
                                                        </TabContent>
                                                    </VerticalTabs>
                                                </Paper>
                                                <div className="w-full"><ExerciseTable/></div>
                                            </>
                                    }
                                    </div>
                                </div>
                            </div>
                        :
                            <div className='grid grid-cols-3 gap-y-4 gap-x-6'>
                                <div className='col-span-1'>
                                    <div className='sticky top-24 space-y-4'>
                                        <Paper className="flex flex-col" id='search-add-box'>
                                            <AddExerciseForm/>
                                        </Paper>
                                        <Paper><RenderVerticalTabs/></Paper>
                                    </div>
                                </div>
                                <div className='col-span-2'>
                                    <ExerciseTable/>
                                </div>
                            </div>
                    }
                </section>
                <FeedbackBar/>
            </main>
        </feedbackContext.Provider>
        </searchContext.Provider>
    )
}