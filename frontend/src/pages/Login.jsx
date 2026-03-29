import { Link } from "react-router-dom";
import useFetch from "../customHooks/useFetch"

const Login = () => {

  return (
    <div className="h-screen flex justify-center items-center px-4">
      <div className="bg-white px-6 py-4 rounded-xl w-full lg:max-w-2xl">
        <h1 className="font-bold text-3xl text-center">Task Management</h1>

        <div className="flex flex-col gap-2 mt-4">
          <h2 className="text-xl font-bold">Welcome Back</h2>

          <form className="flex flex-col gap-2">

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-gray-500 text-sm font-semibold">Email Address</label>
              <input type="text" name="email" id="email" placeholder="john.doe@example.com" className="rounded bg-slate-200 px-4 py-2 outline-none" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-gray-500 text-sm font-semibold">Password</label>
              <input type="password" name="password" id="password" className="rounded bg-slate-200 px-4 py-2 outline-none" />
            </div>

            <div className="mt-2">
              <button type="submit" className="w-full text-center py-2 bg-blue-700 rounded text-white font-semibold cursor-pointer">Login</button>
            </div>
          </form>

          <p>Don't have accoung? <Link to={"/signup"} className="text-blue-600 underline">Register here</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login