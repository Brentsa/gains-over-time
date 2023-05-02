import { useState } from "react"
import MobileSearchBar from "./MobileSearchBar"
import RenderVerticalTabs from "./RenderVerticalTabs"
import AddExerciseForm from "./forms/AddExerciseForm"
import ExerciseTable from "./tables/ExerciseTable"
import Paper from "./utilities/Paper"

interface Props {
    isMobile: boolean
}

export default function ExercisePage({isMobile}: Props){

    const [showVertTabs, setShowVertTabs] = useState(false);

    return ( isMobile ?
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
                                <div className="w-full">
                                    <div className="sticky top-0 z-30 flex flex-col items-end">
                                        <Paper className='flex flex-col w-full' id='search-add-box'>
                                            <AddExerciseForm/>
                                        </Paper>
                                        <MobileSearchBar/>
                                    </div>
                                    <div className="w-full pt-10"><ExerciseTable/></div>
                                </div>
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
    )
}