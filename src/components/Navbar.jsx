import React, { useState } from "react";
import { AiFillHome, AiOutlineSearch, AiFillCaretLeft } from "react-icons/ai";
import { MdNotifications } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { removeEmail } from "../redux/features/counter/counterSlice";
import { getAuth, signOut } from "firebase/auth";
import app, { db } from "../firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { collection, query, where, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";

const variants = {
  open: { opacity: 1, x: "-45%" },
  closed: { opacity: 0, x: "-40%", scale: 0 },
};

const auth = getAuth(app);
export default function Navbar() {
  const [searchquery, setSearchQuery] = useState();
  const [isOpen, setIsOpen] = useState(false);
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
  const search = async () => {
    const socialRef = collection(db, "social");
    console.log(searchquery);
    const q = query(socialRef, where("username", "==", searchquery));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      navigate(`/${doc.id}`);
    });
  };
  return (
    <div className="border-r h-screen  text-white pl-10 items-start flex flex-col justify-between py-10">
      <div className="text-2xl text-left ">Name</div>
      <div className="text-left flex flex-col gap-5">
        <Link to={`/${localStorage.getItem("Email")}`}>
          <div className="flex gap-4 items-center">
            <div>
              <AiFillHome className="h-7 w-7" />
            </div>
            <div>Home</div>
          </div>
        </Link>
        <div className="flex gap-4 items-center">
          <div
            className={`flex gap-4 cursor-pointer ${
              !isOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => {
              setIsOpen((isOpen) => !isOpen);
              console.log(isOpen);
            }}
          >
            <AiOutlineSearch className={`h-7 w-7 `} />
            <div>Search</div>
          </div>
          <motion.nav animate={isOpen ? "open" : "closed"} variants={variants}>
            <div
              className={`flex items-center gap-2 opacity-0  ${
                isOpen ? "opacity-100" : ""
              }`}
            >
              <AiFillCaretLeft
                className="cursor-pointer"
                onClick={() => {
                  setIsOpen((isOpen) => !isOpen);
                  console.log(isOpen);
                }}
              />

              <div className="rounded-xl text-black bg-white flex items-center">
                <input
                  className="rounded-l-xl py-1 px-2"
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                  value={searchquery}
                />
                <AiOutlineSearch
                  className="h-5 w-5 cursor-pointer hover:text-blue-500"
                  onClick={search}
                />
              </div>
            </div>
          </motion.nav>
        </div>
        <div className="flex gap-4 items-center">
          <div>
            <MdNotifications className="h-7 w-7" />
          </div>
          <div>Notifications</div>
        </div>
        <Link to="/meetpeople">
          <div className="flex gap-4 items-center">
            <div>
              <FaUserFriends className="h-7 w-7" />
            </div>
            <div>Meet People</div>
          </div>
        </Link>
      </div>
      <div
        onClick={signout}
        className=" flex gap-4 items-end hover:bg-[#121212] px-4 py-2 transition cursor-pointer"
      >
        <BiLogOut className="h-6 w-6 text-red-500" />
        <div className="text-xl text-red-500">Logout</div>
      </div>
    </div>
  );
}
