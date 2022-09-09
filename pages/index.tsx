import Head from 'next/head'
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from '../utils/iron-session-config';
import { Account } from '@prisma/client'
import Navbar from '../components/Navbar';
import Paper from '../components/utilites/paper'
import VerticalTabs from '../components/utilites/VerticalTabs';
import TabContent from '../components/utilites/TabContent';

interface Props {
  user? : Omit<Account, 'password' | 'createdAt'>
}

export default function Home({user}: Props){

  console.log(user);

  const names = ['Exercise', 'Workout', 'Misc.', 'Super', 'etc.'];

  return (
    <div>
      <Head>
        <title>Gains Over Time</title>
        <meta name="description" content="Track your workout progess over time." />
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main>
        <Navbar/>
        <div className='container pt-4'>
          <Paper>
            <VerticalTabs>
              <TabContent label='Exercise'>
                <div>Hello 1</div>
              </TabContent>
              <TabContent label='Workout'>
                <div>Hello 2</div>
              </TabContent>
            </VerticalTabs>
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