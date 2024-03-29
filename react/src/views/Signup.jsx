import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import {Link} from 'react-router-dom'
import axiosClient from '../axios'
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
  const { setUserToken, setCurrentUser} = useStateContext()
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCon, setPasswordCon] = useState('');
  const [error, setError] = useState({__html: ''});

  const submitHandler = (ev) => {
    ev.preventDefault(); 
    setError({__html: ""})

    axiosClient.post('/signup', {
      name: fullName,
      email,
      password, 
      password_confirmation: passwordCon
    })
    .then(({data}) => {
      setCurrentUser(data.user);
      setUserToken(data.token);
    })
    .catch(( error ) => {
      if(error.response) {
        const errors = Object.values(error.response.data.errors).reduce((accum, next) => [ ...accum, ...next], [])
        console.log(errors)
        setError({__html: errors.join('<br>')})
      }
    })
  }

  return (
    <>
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign up now!
        </h2>
      </div>
      <Link to="/login" className="flex justify-center font-medium text-indigo-600 hover:text-indigo-500">
       Login with your account
      </Link>

    {error.__html && (<div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}></div>)}

      <form onSubmit={submitHandler} className="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="-space-y-px rounded-md shadow-sm">
        <div>
            <label htmlFor="full-name" className="sr-only">
              Full Name
            </label>
            <input
              id="full-name"
              name="name"
              type="text"
              value={fullName}
              onChange={ev => setFullName(ev.target.value)}
              required
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              value={email}
              onChange={ev => setEmail(ev.target.value)}
              autoComplete="email"
              required
              className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Email address"
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
              value={password}
              onChange={ev => setPassword(ev.target.value)}
              autoComplete="current-password"
              required
              className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Password"
            />
          </div>
          <div>
            <label htmlFor="password-confirmation" className="sr-only">
              Password Confirmation
            </label>
            <input
              id="password-confirmation"
              name="password_confirmation"
              type="password"
              value={passwordCon}
              onChange={ev => setPasswordCon(ev.target.value)}
              required
              className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Password Confirmation" 
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            Sign up
          </button>
        </div>
      </form>
    </>
  );
}
