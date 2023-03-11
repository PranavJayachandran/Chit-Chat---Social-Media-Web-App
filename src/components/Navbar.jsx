import React from "react";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { MdNotifications } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { removeEmail } from "../redux/features/counter/counterSlice";
import { getAuth, signOut } from "firebase/auth";
import app from "../firebase/firestore";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

const auth = getAuth(app);
export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signout = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeEmail());
        localStorage.clear();
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="border-r h-screen text-white pl-10 items-start flex flex-col justify-between py-10">
        <div className="text-2xl text-left ">Name</div>
        <div className="text-left flex flex-col gap-5">
          <div className="flex gap-4 items-center">
            <div>
              <AiFillHome className="h-7 w-7" />
            </div>
            <div>Home</div>
          </div>
          <div className="flex gap-4 items-center">
            <div>
              <AiOutlineSearch className="h-7 w-7" />
            </div>
            <div>Search</div>
          </div>
          <div className="flex gap-4 items-center">
            <div>
              <MdNotifications className="h-7 w-7" />
            </div>
            <div>Notifications</div>
          </div>
          <div className="flex gap-4 items-center">
            <div>
              <FaUserFriends className="h-7 w-7" />
            </div>
            <div>Meet People</div>
          </div>
        </div>
        <div
          onClick={signout}
          className=" flex gap-4 items-end hover:bg-[#121212] px-4 py-2 transition cursor-pointer"
        >
          <BiLogOut className="h-6 w-6 text-red-500" />
          <div className="text-xl text-red-500">Logout</div>
        </div>
      </div>
    </div>
  );
}
