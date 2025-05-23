import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Avatar = () => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState({});
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    const maxSize = 2 * 1024 * 1024; // 2MB

    if (file.size > maxSize) {
      return toast.error("Image size should be less then 2MB")
    }
    
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setFile(file);
    }
  };

  const handleSubmit = async (e) => {
    setSubmitting(true)
    e.preventDefault();

    if (!file) {
      setSubmitting(false)
      return toast.error("Please select an image");
    }

    const formData = new FormData();
    formData.append("avatar", file);
    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/user/profile`,
        formData,
        {
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        setSubmitting(false)
        return toast.success("Avatar uploaded successfully");
      }
    } catch (error) {
      setSubmitting(false)
      return toast.error(error.message);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/v1/user/current-user`,
          {
            withCredentials: true,
          },
        );
        if (response.status === 200) {
          setUser(response?.data?.user);
        }
      } catch (error) {
        return toast.error(error?.response?.data?.message);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    if (user.avatar) {
      setImage(user.avatar);
    }
  }, [user]);

  return (
    <form onSubmit={handleSubmit}>
      <label className="w-28 h-28 rounded-full bg-slate-400 flex justify-center items-center cursor-pointer">
        {image ? (
          <img
            src={image}
            alt="avatar"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span className="text-white text-lg font-semibold">A</span>
        )}
        <input
          type="file"
          accept="image/*"
          name="avatar"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
      <button
        type="submit"
        disabled={submitting}
        className="mt-2 flex justify-center items-center gap-4 text-white text-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 outline-none font-medium rounded-lg text-sm px-4 font-bold py-3 text-center hover:bg-blue-700 disabled:bg-blue-500"
      >
        {submitting ? "Uploading..." : "Upload Avatar"}
      </button>
    </form>
  );
};

export default Avatar;
