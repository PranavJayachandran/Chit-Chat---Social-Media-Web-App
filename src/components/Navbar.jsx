import React, { useEffect, useState } from "react";
import {
  AiOutlineMenu,
  AiFillHome,
  AiOutlineSearch,
  AiFillCaretLeft,
} from "react-icons/ai";
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
import toid, { getNotificationCount } from "../utils/convertemailtoid";
import { useMediaQuery } from "react-responsive";

const variants = {
  open: { opacity: 1, x: "-45%" },
  closed: { opacity: 0, x: "-40%", scale: 0 },
};

const variantsformnotificatoin = {
  open: { opacity: 1 },
  closed: { opacity: 0, scale: 0 },
};
const variantsforNav = {
  open: { opacity: 1 },
  closed: { opacity: 0, x: "-200%" },
};
const variantsfornouseratsearch = {
  open: { opacity: 1, x: "0%" },
  closed: { opacity: 0, x: "100%" },
};

const auth = getAuth(app);

export default function Navbar() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const [inPhoneIsOpen, setInPhoneIsOpen] = useState(0);
  const [searchquery, setSearchQuery] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpennoti, setIsOpennoti] = useState(false);
  const [noti, setNoti] = useState(0);
  const [req, setReq] = useState([]);
  const [nouser, setNoUser] = useState(0);
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
    const q = query(socialRef, where("username", "==", searchquery));
    const querySnapshot = await getDocs(q);
    let found = 0;
    querySnapshot.forEach((doc) => {
      navigate(`/${doc.id}`);
      found = 1;
    });
    if (found === 0) setNoUser(1);
    setTimeout(function () {
      setNoUser(0);
    }, 4000);
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
    let data = await getNotificationCount(
      await toid(localStorage.getItem("Email"))
    );
    setNoti(data.notification_count);
    setReq(data.req);
  };

  useEffect(() => {
    setInterval(getNotificationUpdate, 1000);
    if (isDesktopOrLaptop) setInPhoneIsOpen(1);
  }, []);

  return isTabletOrMobile ? (
    <div className={`mt-6 bg-[#3A54AA] -ml-14 z-10 sm:mt-[0px]`}>
      {isTabletOrMobile ? (
        <div className="absolute top-5 left-5 text-black">
          <AiOutlineMenu
            onClick={() => {
              setInPhoneIsOpen(!inPhoneIsOpen);
            }}
          />
        </div>
      ) : (
        <></>
      )}
      <motion.nav
        animate={inPhoneIsOpen ? "open" : "closed"}
        variants={variantsforNav}
      >
        {inPhoneIsOpen ? (
          <div
            className={`${
              isTabletOrMobile ? "absolute left-10 -top-6" : ""
            } h-screen bg-[#3A54AA] z-100 mr-10 sm:mr-[0px] border-r overflow-x-hidden overflow-y-scroll text-white pl-10 items-start  py-10 `}
          >
            <div className="absolute top-5 left-8 text-white">
              <AiOutlineMenu
                onClick={() => {
                  setInPhoneIsOpen(!inPhoneIsOpen);
                }}
              />
            </div>
            <div className="mt-10 text-2xl text-left  ">CHIT CHAT</div>
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
                  }}
                >
                  <AiOutlineSearch className={`h-7 w-7 `} />
                  <div>Search</div>
                </div>
                <motion.nav
                  animate={isOpen ? "open" : "closed"}
                  variants={variants}
                >
                  <div
                    className={`flex items-center gap-2 opacity-0  ${
                      isOpen ? "opacity-100" : ""
                    }`}
                  >
                    <AiFillCaretLeft
                      className="cursor-pointer"
                      onClick={() => {
                        setIsOpen((isOpen) => !isOpen);
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
        ) : (
          <></>
        )}
      </motion.nav>
    </div>
  ) : (
    <div className={`mt-6  sm:mt-[0px]`}>
      {isTabletOrMobile ? (
        <div className="">
          <AiOutlineMenu
            onClick={() => {
              setInPhoneIsOpen(!inPhoneIsOpen);
            }}
          />
        </div>
      ) : (
        <></>
      )}

      <div
        className={`bg-white h-screen mr-10 sm:mr-[0px] overflow-x-hidden overflow-y-scroll text-white pl-10 items-start  py-10 `}
      >
        <div className="mt-10 -ml-4 text-5xl  font-bold text-left flex text-[#3430a0] ">
          <div>CHIT CHAT</div>
        </div>
        <div className=" mt-20 text-left flex flex-col gap-5">
          <Link to={`/${localStorage.getItem("id")}`}>
            <div className="text-[#b7b9bd] hover:text-[#3430a0] transition  flex gap-4 items-center">
              <div>
                <AiFillHome className="h-7 w-7" />
              </div>
              <div>Home</div>
            </div>
          </Link>
          <div className="text-[#b7b9bd] hover:text-[#3430a0] transition  flex gap-4 items-center">
            <div
              className={`flex gap-4 cursor-pointer ${
                !isOpen ? "opacity-100" : "opacity-0"
              }`}
              onClick={() => {
                setIsOpen((isOpen) => !isOpen);
              }}
            >
              <AiOutlineSearch className={`h-7 w-7 `} />
              <div>Search</div>
            </div>
            <motion.nav
              animate={isOpen ? "open" : "closed"}
              variants={variants}
            >
              <div
                className={`flex items-center gap-2 opacity-0  ${
                  isOpen ? "opacity-100" : ""
                }`}
              >
                <AiFillCaretLeft
                  className="cursor-pointer"
                  onClick={() => {
                    setIsOpen((isOpen) => !isOpen);
                  }}
                />

                <div className="rounded-xl text-black flex items-center">
                  <input
                    className="rounded-l-xl py-1 bg-gray-100 px-2"
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                    }}
                    value={searchquery}
                  />
                  <AiOutlineSearch
                    className="h-8 w-5 rounded-r-xl bg-gray-100 cursor-pointer hover:text-blue-500"
                    onClick={search}
                  />
                </div>
              </div>
            </motion.nav>

            <div
              className={`top-10 right-10 absolute ${
                !nouser ? "opacity-100" : ""
              }`}
            >
              <motion.nav
                animate={nouser ? "open" : "closed"}
                variants={variantsfornouseratsearch}
              >
                {nouser ? (
                  <div className="flex text-lg justify-center items-center px-4 bg-red-600 py-4 rounded-xl">
                    <div>
                      <div>No such user</div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </motion.nav>
            </div>
          </div>
          <div className="text-[#b7b9bd] hover:text-[#3430a0] transition flex gap-4 items-center">
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
            <div className="text-[#b7b9bd] hover:text-[#3430a0] transition  -mt-4 flex gap-4 items-center">
              <div>
                <FaUserFriends className="h-7 w-7" />
              </div>
              <div>Meet People</div>
            </div>
          </Link>
        </div>
        <div
          onClick={signout}
          className="mt-20 mr-12 text-red-500 rounded-xl hover:text-white hover:bg-red-500 flex gap-4 items-end px-4 py-2 transition cursor-pointer"
        >
          <BiLogOut className="h-6 w-6 " />
          <div className="text-xl ">Logout</div>
        </div>
      </div>
    </div>
  );
}
