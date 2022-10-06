import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'
import { ChangeEvent, SyntheticEvent, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';

type Inputs = {firstName: string, lastName: string, username: string, email: string, password: string}

export default function RegisterForm(){

    //define router with the intent to route the user
    const router = useRouter();

    //instantiate state to hold the user login credentials and any login errors
    const [inputs, setInputs] = useState<Inputs>({firstName: '', lastName: '', username: '', email: '', password: ''});
    const [registerError, setRegisterError] = useState<string>('');

    //called whenever the user changes the values in the credential inputs
    function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
        //if there is a registration error and input changes remove the error 
        if(registerError) setRegisterError('');

        //copy name and value from the input change event
        const name = event.target.name;
        const value = event.target.value;

        //update the specified property in the input state by name and value
        setInputs({...inputs, [name]: value});
    }

    //called when the login form has been submitted
    async function handleInputSubmit(event: SyntheticEvent): Promise<void>{
        event.preventDefault();
        console.log(inputs);
       
        //call fetch api POST route to create a new account
        const registerResponse = await fetch('/api/account/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(inputs)
        })

        //check if the request was not successfull, set an error if not
        if(!registerResponse.ok) return setRegisterError('Account registration unsuccsessful')

        //if the request was successful, redirect the user to the homepage
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
                        Register a new account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <Link href="/login">
                            <a className="font-medium text-violet-400 hover:text-violet-500">
                                sign in if you are an existing user
                            </a>
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-10" onSubmit={handleInputSubmit}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="firstName" className="sr-only">
                                    First Name
                                </label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    value={inputs.firstName}
                                    onChange={handleInputChange}
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-400 focus:border-violet-400 focus:z-20 z-10 sm:text-sm"
                                    placeholder="First name"
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="sr-only">
                                    Last Name
                                </label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    value={inputs.lastName}
                                    onChange={handleInputChange}
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-violet-400 focus:border-violet-400 focus:z-20 z-10 sm:text-sm"
                                    placeholder="Last Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="username" className="sr-only">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    value={inputs.username}
                                    onChange={handleInputChange}
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-violet-400 focus:border-violet-400 focus:z-20 z-10 sm:text-sm"
                                    placeholder="Username"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">
                                    Username
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    value={inputs.email}
                                    onChange={handleInputChange}
                                    type="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-violet-400 focus:border-violet-400 focus:z-20 z-10 sm:text-sm"
                                    placeholder="Email"
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
                            <div className={`flex justify-center absolute transition duration-300 ${!registerError && '-translate-y-full'} inset-x-0 top-0`}>
                                <p className="text-red-600 border border-t-0 border-gray-300 bg-red-100 text-center text-sm p-1 w-80 rounded-b shadow-sm">
                                    {registerError}
                                </p>
                            </div>    
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-500 hover:bg-rose-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-400"
                        >
                            Register Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}