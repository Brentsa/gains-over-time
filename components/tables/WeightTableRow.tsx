import { Weight } from "@prisma/client"
import Paper from "../utilities/Paper"
import { formatDateShortMonth } from "../../utils/helpers"
import { SwipeEventData, useSwipeable } from "react-swipeable"
import { useContext, useEffect, useRef, useState } from "react"
import IconButton from "../buttons/IconButton"
import { faCaretLeft, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { feedbackContext } from "../MainPageContainer"
import { mutate } from "swr"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface Props{
    weightRecord: Weight
}

export default function WeightTableRow({weightRecord}:Props){

    const {setFeedback} = useContext(feedbackContext);

    //state to determine if the row is swiped open or not
    const [swipedOpen, setSwipedOpen] = useState(false);

    //define swipe handlers for the component
    const handlers = useSwipeable({
        onSwipedLeft: () => setSwipedOpen(true),
        onSwipedRight: () => setSwipedOpen(false),
        swipeDuration: 350,
        preventScrollOnSwipe: true,
        trackMouse: true
    });

    //delete this weight record when called
    async function deleteWeightRecord(){
        const response = await fetch(`api/weights/delete/${weightRecord.id}`, {
            method: "DELETE"
        });

        //if DELETE request failed, notify the user of failure
        if(!response.ok) return setFeedback({type: 'failure', message: 'Weight record could not be deleted.'}); 

        //refresh weight record data if delete is successful 
        mutate(`api/weights/${weightRecord.accountId}`);

        return setFeedback({type: 'success', message: 'Weight record deleted.'}); 
    };

    return (
        <div className="w-full md:w-1/2 h-12 relative select-none" {...handlers}>
            <div className="absolute -left-2 z-0">
                <FontAwesomeIcon icon={faCaretLeft} size="3x" className="text-violet-300"/>
            </div>
            <Paper className={`absolute transition-all ${swipedOpen ? '-left-14' : 'left-0'} flex justify-between items-center px-4 w-full h-full rounded z-10`}>
                <h2 className="text-2xl">{weightRecord.weight} <span className="text-sm">{weightRecord.massUnit}</span></h2>
                <p className="text-sm">{formatDateShortMonth(weightRecord.createdAt)}</p>
            </Paper>
            <div className="absolute right-0 z-0">
                <IconButton bgColor="bg-rose-500" bgColorTouch="bg-rose-400" iconColor="text-white" icon={faTrashCan} handleClick={deleteWeightRecord}/>
            </div>
        </div>
    )
}