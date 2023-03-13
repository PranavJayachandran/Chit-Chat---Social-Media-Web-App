import React, { useEffect, useState } from "react";
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
import { doc, setDoc, getDoc } from "firebase/firestore";
import Notifications from "./Notifications";
import { getNotificationCount } from "../utils/convertemailtoid";

const variants = {
  open: { opacity: 1, x: "-45%" },
  closed: { opacity: 0, x: "-40%", scale: 0 },
};

const variantsformnotificatoin = {
  open: { opacity: 1 },
  closed: { opacity: 0, scale: 0 },
};

const auth = getAuth(app);
export default function Navbar() {
  const [searchquery, setSearchQuery] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpennoti, setIsOpennoti] = useState(false);
  const [noti, setNoti] = useState(0);
  const [req, setReq] = useState([]);
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

  const getNotificationUpdate = async () => {
    // const docRef = doc(db, "social", localStorage.getItem("id"));
    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //   setNoti(docSnap.data().req.length);
    //   setReq(docSnap.data().req);
    // } else {
    //   console.log("No such document!");
    // }
    let data = await getNotificationCount(localStorage.getItem("id"));
    setNoti(data.notification_count);
    setReq(data.req);
  };

  useEffect(() => {
    setInterval(getNotificationUpdate, 1000);
  }, []);

  return (
    <div className="h-screen  border-r overflow-x-hidden overflow-y-scroll text-white pl-10 items-start  py-10 ">
      <div className="mt-10 text-2xl text-left  ">Name</div>
      <div className="mt-20 text-left flex flex-col gap-5">
        <Link to={`/${localStorage.getItem("id")}`}>
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
          <div
            className="flex items-center cursor-pointer gap-2"
            onClick={() => {
              setIsOpennoti(!isOpennoti);
            }}
          >
            <div>Notifications</div>{" "}
            {noti > 0 ? (
              <div className="flex items-center justify-center bg-pink-500 p-3 h-4 w-4 rounded-full">
                {noti}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <motion.nav
          animate={isOpennoti ? "open" : "closed"}
          variants={variantsformnotificatoin}
        >
          <div className="">
            {isOpennoti ? <Notifications data={req} /> : <></>}
          </div>
        </motion.nav>
        <Link to="/meetpeople">
          <div className="-mt-4 flex gap-4 items-center">
            <div>
              <FaUserFriends className="h-7 w-7" />
            </div>
            <div>Meet People</div>
          </div>
        </Link>
      </div>
      <div
        onClick={signout}
        className="mt-20  flex gap-4 items-end hover:bg-[#121212] px-4 py-2 transition cursor-pointer"
      >
        <BiLogOut className="h-6 w-6 text-red-500" />
        <div className="text-xl text-red-500">Logout</div>
      </div>
    </div>
  );
}
