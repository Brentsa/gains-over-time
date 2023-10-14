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

type MobilePackage = boolean;

//create global state for user information
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

//create global state for screen size
export const mobileContext = createContext<MobilePackage>(true)

export default function Home(props: Props){

  //check if the screen is mobile or desktop in realtime
  const isMobileScreen = useMediaQuery({query: `(max-width: 1024px)`});

  const [user, setUser] = useState(props.user)
  const [isMobile, setIsMobile] = useState(true);

  //Whenever the screen size changes set the mobile screen flag
  useEffect(() => {
    setIsMobile(isMobileScreen);
  }, [isMobileScreen])

  return (
    <userContext.Provider value={{user, setUser}}>
    <mobileContext.Provider value={isMobile}>
      <div>
        <Head>
          <title>Gains Over Time</title>
        </Head>
        <MainPageContainer/>
      </div>
      </mobileContext.Provider>
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