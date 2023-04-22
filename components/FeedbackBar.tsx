import { useContext, useEffect } from "react"
import { feedbackContext } from "./MainPageContainer"

export default function FeedbackBar(){

    const {feedback, setFeedback} = useContext(feedbackContext);

    useEffect(() => {
        if(feedback.type && feedback.message) setTimeout(() => setFeedback({message: '', type: ''}), 3000);
    }, [feedback, setFeedback])

    return (
        <div className={`w-screen text-white ${feedback.type === 'failure' ? 'bg-red-600' : 'bg-black'} p-4 fixed bottom-0 z-50 transition-all ${!feedback.type && 'translate-y-full'}`}>
            <p>{feedback.message}</p>
        </div>
    )
}