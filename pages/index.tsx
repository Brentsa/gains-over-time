import Head from 'next/head'
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from '../utils/iron-session-config';
import { Account } from '@prisma/client'
import Navbar from '../components/Navbar';
import Paper from '../components/utilities/Paper'
import AddExerciseForm from '../components/forms/AddExerciseForm';
import ExerciseTable from '../components/tables/ExerciseTable';
import { useMediaQuery } from 'react-responsive';
import { createContext, useEffect, useState } from 'react';
import RenderVerticalTabs from '../components/RenderVerticalTabs';

type User = Omit<Account, 'password' | 'createdAt'>

interface Props {
  user? : User
}

export const userContext = createContext<User | undefined>({
  id: 0, 
  email: '', 
  firstName: '', 
  lastName: '', 
  username: ''
});

export default function Home({user}: Props){

  const isMobile = useMediaQuery({query: `(max-width: 1024px)`});

  const [showOnMobile, setShowOnMobile] = useState(true);
  const [showVertTabs, setShowVertTabs] = useState(false);

  useEffect(() => {
    setShowOnMobile(isMobile);
  }, [isMobile])

  return (
    <userContext.Provider value={user}>
      <div>
        <Head>
          <title>Gains Over Time</title>
          <meta name="description" content="Track your workout progess over time." />
          <link rel="icon" href="/favicon.ico"/>
        </Head>

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
        </main>
      </div>
    </userContext.Provider>
  );
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    if (!user) return { 
      redirect: {
        destination: '/login',
        permanent: false
      }
    };

    return { props: { user: req.session.user} };
  }, ironOptions
);