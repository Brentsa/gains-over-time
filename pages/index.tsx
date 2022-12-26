import Head from 'next/head'
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from '../utils/iron-session-config';
import { Account } from '@prisma/client'
import Navbar from '../components/Navbar';
import Paper from '../components/utilities/Paper'
import VerticalTabs from '../components/utilities/VerticalTabs';
import TabContent from '../components/utilities/TabContent';
import CreateExerciseTForm from '../components/forms/CreateExerciseTForm';
import AddExerciseForm from '../components/forms/AddExerciseForm';
import ExerciseTable from '../components/tables/ExerciseTable';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState } from 'react';
import { faCirclePlus, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import UpdateExerciseTForm from '../components/forms/UpdateExerciseTForm';

export interface Props {
  user? : Omit<Account, 'password' | 'createdAt'>
}

export default function Home({user}: Props){

  console.log(user);

  const [showOnMobile, setShowOnMobile] = useState(true);

  const isMobile = useMediaQuery({query: `(max-width: 1024px)`});

  useEffect(() => {
    setShowOnMobile(isMobile);
  }, [isMobile])

  function renderVerticalTabs(){
    return (
      <VerticalTabs>
        <TabContent label='Exercise' icon={faCirclePlus}>
          <CreateExerciseTForm user={user}/>
        </TabContent>
        <TabContent label='Exercise' icon={faPenToSquare}>
          <UpdateExerciseTForm user={user}/>
        </TabContent>
        <TabContent label='Workout' icon={faCirclePlus}>
          <div>Hello 2</div>
        </TabContent>
      </VerticalTabs>
    );
  }

  return (
    <div>
      <Head>
        <title>Gains Over Time</title>
        <meta name="description" content="Track your workout progess over time." />
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main>
        <Navbar user={user}/>
        <section className='container pt-4'>
          {showOnMobile ?
            <div className='flex flex-col'>
              <div className='basis-1/3'>
                <div className='flex flex-col flex-wrap space-y-4'>
                    <Paper>
                      {renderVerticalTabs()}
                    </Paper>
                    <Paper className='z-10 sticky top-0'>
                      <AddExerciseForm user={user}/>
                    </Paper>
                    <Paper className='w-full'>
                      <ExerciseTable user={user}/>
                    </Paper>
                  </div>
              </div>
            </div>
            :
            <div className='grid grid-cols-3 gap-4'>
              <div className='col-span-1'>
                <div className='sticky top-24 space-y-4'>
                  <Paper>
                    {renderVerticalTabs()}
                  </Paper>
                  <Paper>
                    <AddExerciseForm user={user}/>
                  </Paper>
                </div>
              </div>

              <div className='col-span-2'>
                <Paper>
                  <ExerciseTable user={user}/>
                </Paper>
              </div>
            </div>
          }
        </section>
      </main>
    </div>
  )
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