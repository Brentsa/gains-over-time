import Head from 'next/head'
import { withIronSessionSsr } from "iron-session/next";
import { ironOptions } from '../utils/iron-session-config';
import { Account } from '@prisma/client'
import { useMediaQuery } from 'react-responsive';
import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';
import MainPageContainer from '../components/MainPageContainer';

type User = Omit<Account, 'password' | 'createdAt'>

interface Props {
  user: User
}

interface UserPackage {
  user: User,
  setUser: Dispatch<SetStateAction<User>>
}

export const userContext = createContext<UserPackage>({
  user:{
    id: 0, 
    email: '', 
    firstName: '', 
    lastName: '', 
    username: ''
  },
  setUser: () => {}
});

export default function Home(props: Props){

  const isMobile = useMediaQuery({query: `(max-width: 1024px)`});

  const [user, setUser] = useState(props.user)
  const [showOnMobile, setShowOnMobile] = useState(true);

  useEffect(() => {
    setShowOnMobile(isMobile);
  }, [isMobile])

  return (
    <userContext.Provider value={{user, setUser}}>
      <div>
        <Head>
          <title>Gains Over Time</title>
        </Head>
        <MainPageContainer showOnMobile={showOnMobile}/>
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