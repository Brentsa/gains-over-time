import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'
import { ChangeEvent, SyntheticEvent, useState } from 'react'
import Link from 'next/link';

type Inputs = {username: string, password: string}

export default function LoginForm(){

    const [inputs, setInputs] = useState<Inputs>({username: '', password: ''});

    function handleInputChange(event: ChangeEvent<HTMLInputElement>): void {
        const name = event.target.name;
        const value = event.target.value;
        setInputs({...inputs, [name]: value});
    }

    function handleInputSubmit(event: SyntheticEvent): void {
        event.preventDefault();
        console.log(inputs);
    }
    
    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <div className="w-100 flex justify-center text-amber-500">
                        <FontAwesomeIcon icon={faDumbbell} size="6x"/>
                    </div>
                    
                    <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <Link href="/register">
                            <a className="font-medium text-amber-500 hover:text-amber-400">
                                register if you are a new user
                            </a>
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleInputSubmit}>
                    <input type="hidden" name="remember" defaultValue="true" />
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
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-amber-400 focus:border-amber-400 focus:z-10 sm:text-sm"
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
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-amber-400 focus:border-amber-400 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-amber-500 focus:ring-amber-400 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-amber-500 hover:text-amber-400">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-500 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}