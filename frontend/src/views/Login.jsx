import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios.js";

export default function Login() {

  const { setCurrentUser, setUserToken } = useStateContext();
  const emailRef = useRef();
  const passwordRef = useRef();

  // const [error, setError] = useState({__html: ''});
  const [error, setError] = useState({ __html: "" });



  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    axiosClient
      .post("/login", payload)
      .then((response) => {

        if (response.data && response.data.user && response.data.token) {
          setCurrentUser(response.data.user);
          setUserToken(response.data.token);
        } else {
          //console.log(response.response.data.error);
          setError({ __html: response.response.data.error });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
      <p className="mt-10 text-center text-sm text-gray-500">
        Do not have an account yet? {' '} Please {' '}
        <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Sign Up
        </Link>
      </p>

      {error.__html && (<div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}>
      </div>)}

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={onSubmit} action="#" method="POST" className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                ref={emailRef}
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>

            </div>
            <div className="mt-2">
              <input
                ref={passwordRef}
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
