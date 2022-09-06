import { useRouter } from "next/router";

export default function LogoutButton(){

    const router = useRouter();

    async function handleClick(){
        const logoutRequest = await fetch('/api/account/logout', {
            method: 'POST'
        })

        if(!logoutRequest.ok) return console.log('Unable to logout.');

        router.push('/login');
    }

    return (
        <button onClick={handleClick} className='rounded bg-amber-500 text-white p-1 hover:bg-amber-400 px-4'>
            Logout
        </button>
    );
}