import Head from 'next/head'
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from '../utils/iron-session-config';
import { Account } from '@prisma/client'
import Navbar from '../components/Navbar';
import Paper from '../components/utilites/Paper'
import VerticalTabs from '../components/utilites/VerticalTabs';
import TabContent from '../components/utilites/TabContent';
import CreateExerciseForm from '../components/forms/CreateExerciseForm';
import AddExerciseForm from '../components/forms/AddExerciseForm';
import ExerciseTable from '../components/tables/ExerciseTable';

export interface Props {
  user? : Omit<Account, 'password' | 'createdAt'>
}

export default function Home({user}: Props){

  console.log(user);

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
          <div className='grid grid-cols-3 gap-4'>

            <div className='col-span-full md:col-span-1'>
              <div className='flex flex-col space-y-4 sm:sticky sm:top-24'>
                <Paper>
                  <VerticalTabs>
                    <TabContent label='Exercise'>
                      <CreateExerciseForm user={user}/>
                    </TabContent>
                    <TabContent label='Workout'>
                      <div>Hello 2</div>
                    </TabContent>
                  </VerticalTabs>
                </Paper>
                <Paper className='z-10 w-full fixed bottom-0 border-t-4 border-rose-500 py-4 sm:py-2 sm:static sm:border-none'>
                  <AddExerciseForm user={user}/>
                </Paper>
              </div>
            </div>

            <div className='col-span-full md:col-span-2'>
              <Paper>
                <ExerciseTable user={user}/>
              </Paper>
            </div>

          </div>
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