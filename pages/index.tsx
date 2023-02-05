import Head from 'next/head'
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from '../utils/iron-session-config';
import { Account } from '@prisma/client'
import { useMediaQuery } from 'react-responsive';
import { createContext, useEffect, useState } from 'react';
import MainPageContent from '../components/MainPageContent';

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

  useEffect(() => {
    setShowOnMobile(isMobile);
  }, [isMobile])

  return (
    <userContext.Provider value={user}>
      <div>
        <Head>
          <title>Gains Over Time</title>
        </Head>
        <MainPageContent showOnMobile={showOnMobile}/>
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