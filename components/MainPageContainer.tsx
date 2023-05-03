import { createContext, Dispatch, SetStateAction, useState } from "react";
import FeedbackBar from "./FeedbackBar";
import Navbar from "./Navbar";
import ExercisePage from "./ExercisePage";
import AccountPage from "./AccountPage";
import TemplatesPage from "./TemplatesPage";

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

export type Pages = 'home' | 'account' | 'templates';

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

export default function MainPageContainer({showOnMobile}: Props){

    const [feedback, setFeedback] = useState<Feedback>({message: '', type: ''});
    const [search, setSearch] = useState<string>('');
    const [page, setPage] = useState<Pages>('home');

    return (
        <searchContext.Provider value={{search, setSearch}}>
        <feedbackContext.Provider value={{feedback, setFeedback}}>
            <main>
                <Navbar isMobile={showOnMobile} currentPage={page} setPage={setPage}/>
                <section className='container pb-8 pt-0 sm:pt-4'>
                    {page === 'home' && <ExercisePage isMobile={showOnMobile}/>}
                    {page === 'account' && <AccountPage/>}
                    {page === 'templates' && showOnMobile && <TemplatesPage/>}
                </section>
                <FeedbackBar/>
            </main>
        </feedbackContext.Provider>
        </searchContext.Provider>
    )
}