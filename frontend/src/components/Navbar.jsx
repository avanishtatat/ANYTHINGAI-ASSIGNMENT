import { useContext } from "react"
import { UserContext } from "../context/userContext"

const Navbar = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <nav className="flex justify-between shadow-md items-center px-4 py-2 bg-white">
      <h1 className="font-bold text-2xl">Task Management</h1>

      <div className="flex gap-4 items-center">
        <div>
          <p>Welcome, {user.user.name}</p>
          <p className="capitalize text-sm text-gray-500 text-right">{user.role}</p>
        </div>
        <button onClick={logout} className="bg-black px-4 rounded text-white cursor-pointer text-sm font-semibold py-2">Logout</button>
      </div>
    </nav>
  )
}

export default Navbar