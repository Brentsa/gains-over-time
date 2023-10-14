import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import FeedbackBar from "./FeedbackBar";
import Navbar from "./Navbar";
import ExercisePage from "./ExercisePage";
import AccountPage from "./AccountPage";
import TemplatesPage from "./TemplatesPage";
import WeightTrackingPage from "./WeightTrackingPage";
import { mobileContext } from "../pages";

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

export type Pages = 'home' | 'weight' | 'account' | 'templates';

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

export default function MainPageContainer(){

    const isMobile = useContext(mobileContext);

    const [feedback, setFeedback] = useState<Feedback>({message: '', type: ''});
    const [search, setSearch] = useState<string>('');
    const [page, setPage] = useState<Pages>('home');

    return (
        <searchContext.Provider value={{search, setSearch}}>
        <feedbackContext.Provider value={{feedback, setFeedback}}>
            <main>
                <Navbar isMobile={isMobile} currentPage={page} setPage={setPage}/>
                <section className='container pb-12 pt-0 sm:pt-4'>
                    {page === 'home' && <ExercisePage/>}
                    {page === 'weight' && <WeightTrackingPage/>}
                    {page === 'account' && <AccountPage/>}
                    {page === 'templates' && isMobile && <TemplatesPage/>}
                </section>
                <FeedbackBar/>
            </main>
        </feedbackContext.Provider>
        </searchContext.Provider>
    )
}