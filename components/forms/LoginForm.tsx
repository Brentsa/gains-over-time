import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'
import { ChangeEvent, SyntheticEvent, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';

type Inputs = {username: string, password: string}

export default function LoginForm(){

    //define router with the intent to route the user
    const router = useRouter();

    //instantiate state to hold the user login credentials and any login errors
    const [inputs, setInputs] = useState<Inputs>({username: '', password: ''});
    const [loginError, setLoginError] = useState<string>(''); 

    //called whenever the user changes the values in the credential inputs
    function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
        //if there is a login error and input changes remove the error 
        if(loginError) setLoginError('');

        //instantiate a copy of the inputs name and value
        const name = event.target.name;
        const value = event.target.value;

        //update the corresponding value of the input and leave the other credentials
        setInputs({...inputs, [name]: value});
    }

    //called when the login form has been submitted
    async function handleInputSubmit(event: SyntheticEvent): Promise<void>{
        event.preventDefault();
       
        //submit a api POST request to login the user
        const loginRequest = await fetch('/api/account/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(inputs)
        })

        //if the login fails, set an error and stay on the page
        if(!loginRequest.ok) return setLoginError('Incorrect credentials used');

        //redirect the user to the home page
        router.push('/');
    }
    
    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <div className="w-100 flex justify-center text-rose-500">
                        <FontAwesomeIcon icon={faDumbbell} size="6x"/>
                    </div>
                    
                    <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <Link href="/register" className="font-medium text-violet-400 hover:text-violet-500">
                            register if you are a new user
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-10" onSubmit={handleInputSubmit}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address-username" className="sr-only">
                                    Email address or Username
                                </label>
                                <input
                                    id="email-address-username"
                                    name="username"
                                    value={inputs.username}
                                    onChange={handleInputChange}
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-400 focus:border-violet-400 focus:z-20 z-10 sm:text-sm"
                                    placeholder="Username / Email Address"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={inputs.password}
                                    onChange={handleInputChange}
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-400 focus:border-violet-400 focus:z-20 z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>
                        <div className='relative'>
                            <div className={`flex justify-center absolute transition duration-300 ${!loginError && '-translate-y-full'} inset-x-0 top-0`}>
                                <p className="text-red-600 border border-t-0 border-gray-300 bg-red-100 text-center text-sm p-1 w-80 rounded-b shadow-sm">
                                    {loginError}
                                </p>
                            </div>    
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-rose-500 focus:ring-rose-400 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-violet-400 hover:text-violet-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-500 hover:bg-rose-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-400"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}