import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../api/authApi";
import toast from "react-hot-toast";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    setLoading(true);

    const response = await loginUser(formData);
    if (response.success === false) {
      toast.error(response.message);
      setLoading(false);
      return;
    }

    toast.success(response.message);
    if (response?.token) {
      localStorage.setItem("token", response.token)
    }
    navigate("/");
    setLoading(false);
  };
  return (
    <div className="h-screen flex justify-center items-center px-4">
      <div className="bg-white px-6 py-4 rounded-xl w-full lg:max-w-2xl">
        <h1 className="font-bold text-3xl text-center">Task Management</h1>

        <div className="flex flex-col gap-2 mt-4">
          <h2 className="text-xl font-bold">Welcome Back</h2>

          <form className="flex flex-col gap-2" onSubmit={handleLogin}>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-gray-500 text-sm font-semibold"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="john.doe@example.com"
                className="rounded bg-slate-200 px-4 py-2 outline-none"
                value={formData.email}
                onChange={handleChange}
                required
              />{" "}
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="password"
                className="text-gray-500 text-sm font-semibold"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="rounded bg-slate-200 px-4 py-2 outline-none"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-2">
              <button
                type="submit"
                className="w-full text-center py-2 bg-blue-700 rounded text-white font-semibold cursor-pointer"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Login"}
              </button>
            </div>
          </form>

          <p>
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-blue-600 underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
