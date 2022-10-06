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
        <div className='container pt-6 space-y-6'>
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
          <Paper>
            <AddExerciseForm/>
          </Paper>
        </div>
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