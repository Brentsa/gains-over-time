import Head from 'next/head'
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from '../utils/iron-session-config';
import { Account } from '@prisma/client'
import Navbar from '../components/Navbar';
import Paper from '../components/utilites/paper'
import VerticalTabs from '../components/utilites/VerticalTabs';

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
            <VerticalTabs tabNames={names}>
              <div>hello world 1</div>
              <div>hello world 2</div>
              <div>hello world 3</div>
              <div>hello world 4</div>
              <div>hello world 5</div>
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