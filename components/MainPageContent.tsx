import { createContext, Dispatch, SetStateAction, useState } from "react";
import FeedbackBar from "./FeedbackBar";
import AddExerciseForm from "./forms/AddExerciseForm";
import Navbar from "./Navbar";
import RenderVerticalTabs from "./RenderVerticalTabs";
import ExerciseTable from "./tables/ExerciseTable";
import Paper from "./utilities/Paper";

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

export const feedbackContext = createContext<FeedbackPackage>({
    feedback: {
        message: '',
        type: '',
    },
    setFeedback: () => {}
});

export default function MainPageContent({showOnMobile}: Props){

    const [showVertTabs, setShowVertTabs] = useState(false);
    const [feedback, setFeedback] = useState<Feedback>({message: '', type: ''})

    return (
        <feedbackContext.Provider value={{feedback, setFeedback}}>
            <main>
                <Navbar/>
                <section className='container pb-4 pt-0 sm:pt-4'>
                    {showOnMobile ?
                        <div className='flex flex-col'>
                            <div className='basis-1/3'>
                            <div className='flex flex-col flex-wrap space-y-4'>
                                <Paper>
                                    <div className='flex justify-around' id='mobile-state-buttons'>
                                        <button 
                                            onClick={() => setShowVertTabs(false)} 
                                            className={!showVertTabs ? 'font-bold border-b-2 border-rose-400' : ''}
                                        >Exercise List</button>
                                        <button 
                                            onClick={() => setShowVertTabs(true)} 
                                            className={showVertTabs ? 'font-bold border-b-2 border-rose-400' : ''}
                                        >Modify Exercises</button>
                                    </div>
                                </Paper>
                                {showVertTabs 
                                    ? 
                                    <Paper><RenderVerticalTabs/></Paper>
                                    :
                                    <>
                                        <Paper className='sticky top-0 z-20'><AddExerciseForm/></Paper>
                                        <Paper className='w-full'><ExerciseTable/></Paper>
                                    </>
                                }
                                </div>
                            </div>
                        </div>
                        :
                        <div className='grid grid-cols-3 gap-4'>
                            <div className='col-span-1'>
                                <div className='sticky top-24 space-y-4'>
                                    <Paper><AddExerciseForm/></Paper>
                                    <Paper><RenderVerticalTabs/></Paper>
                                </div>
                            </div>
                            <div className='col-span-2'>
                                <Paper><ExerciseTable/></Paper>
                            </div>
                        </div>
                    }
                </section>
                <FeedbackBar/>
            </main>
        </feedbackContext.Provider>
    )
}