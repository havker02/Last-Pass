import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Credentials from "../components/Credentials"
import { toast } from "react-hot-toast";
import { IoMdLock } from "react-icons/io";
import { FaPlus } from "react-icons/fa";

const Vault = () => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL
  
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [credentials, setCredentials] = useState([])

  const handleDelete = async (id) => {
    try {
      axios.delete(`${baseUrl}/api/v1/vault/${id}`, {
        withCredentials: true
      })
      axios.delete(`${baseUrl}/api/v1/user/${id}`, {
        withCredentials: true
      })
      setCredentials(credentials.filter(prev => prev._id !== id))
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/v1/user/current-user`, {
          withCredentials: true
        })
        setIsLoading(false)
        setUser(response?.data?.user)
        setCredentials(response?.data?.user?.vault)
      } catch (error) {
        setIsLoading(false)
        navigate("/login")
      }
    }
    checkAuth()
  }, [])

  if (isLoading) return null;

  return (
    <div>
      <div className="flex justify-between mx-4 mt-4">
        <Link to="/">
          <h1 className="text-3xl font-bold text-slate-600">Vault</h1>
        </Link>
        <Link to="/account">
          <button className="rounded-full">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <span className="text-white text-2xl">
                {user?.userName[0].toUpperCase()}
              </span>
            )}
          </button>
        </Link>
      </div>
      
      <div className="mt-12 flex justify-between px-4">
      <h4 className="flex items-center gap-1">
        <IoMdLock size={20} />
        Passwords ({credentials.length})
      </h4>
        <Link to="/credentials/create" className="flex items-center gap-2 bg-[#D32D27] px-3 text-sm py-2 rounded-lg text-white">
          <FaPlus /> New
        </Link>
      </div>

      <div className="mt-4 px-4 bg-slate-200 shadow-md shadow-zinc-400 rounded-md mx-4 h-130 overflow-scroll">
        <Credentials
          credentials={credentials}
          onDelete={handleDelete}
          />
      </div>
      
    </div>
  );
};

export default Vault;
