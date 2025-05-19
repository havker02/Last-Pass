import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { GiReturnArrow } from "react-icons/gi";

const CreateCredentials = () => {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const [user, setUser] = useState({})

  const [formData, setFormData] = useState({
    url: "",
    user: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit= async (e)=>{
    e.preventDefault()
    setFormData({
      url: "",
      user: "",
      password: ""
    })
    try {
      const response = await axios.post(`${baseUrl}/api/v1/vault/create`, formData, {
        withCredentials: true
      })
      if (response?.data?.success) {
        navigate("/")
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  
  return (
    <>
      <Link to="/" className="mx-4 flex items-center text-lg gap-2 cursor-pointer w-1/4">
  <GiReturnArrow /> Home
</Link>
    <div className="mx-4">
        <form onSubmit={(e)=>handleSubmit(e)} className="mt-14 flex flex-col p-4 bg-slate-200 rounded-md">
          <h1 className="mt-2 text-2xl text-center text-zinc-800 mb-6">Create Credentials</h1>
          <div className="mb-5">
          <label
            htmlFor="url"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your website url
          </label>
          <input
            type="text"
            id="url"
            name="url"
            placeholder="Enter website url"
            value={formData.url}
            onChange={(e)=>handleChange(e)}
            className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-slate-400"
            required
          />
        </div>


          <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your username
          </label>
          <input
            type="text"
            id="username"
            name="user"
            placeholder="Enter Username"
            value={formData.user}
            onChange={(e)=>handleChange(e)}
            className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-slate-400"
            required
          />
        </div>


          <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="text"
            id="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={(e)=>handleChange(e)}
            className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-slate-400"
            required
          />
        </div>

          <button
          type="submit"
          className="mt-2 mb-6 mx-16 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-bold focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save Credentials
        </button>
          
        </form>
    </div>
    </>
  );
};

export default CreateCredentials;
