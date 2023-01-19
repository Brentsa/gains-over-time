import { useContext, useEffect } from "react"
import { feedbackContext } from "./MainPageContent"

export default function FeedbackBar(){

    const {feedback, setFeedback} = useContext(feedbackContext);

    useEffect(() => {
        if(feedback) setTimeout(() => setFeedback(''), 3000);
    }, [feedback, setFeedback])

    return (
        <div className={`w-screen text-white bg-black p-4 fixed bottom-0 z-20 transition-all ${!feedback && 'translate-y-full'}`}>
            <p>{feedback}</p>
        </div>
    )
}