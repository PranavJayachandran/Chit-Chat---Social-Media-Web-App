import React, { useState } from "react";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app, { db } from "../firebase/firestore";
import google from "../assets/google.jpeg";
import bg from "../assets/bg.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addEmail } from "../redux/features/counter/counterSlice";
import { collection, query, where, getDocs } from "firebase/firestore";
import toid, { getData } from "../utils/convertemailtoid";
import { BsFillCaretLeftFill } from "react-icons/bs";
import { motion } from "framer-motion";
import person1 from "../assets/person1.jpeg";
import person2 from "../assets/person2.jpeg";
import { BsSendFill } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";

const auth = getAuth(app);

export default function Login() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const variants = {
    open: { opacity: 1 },
    closed: { opacity: 0, x: 100 },
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [nouser, setNoUser] = useState(0);
  const [firstLoad, setFirstLoad] = useState(0);
  const [user, setUser] = useState("");
  const provider = new GoogleAuthProvider();

  const hadleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        // const socialRef = collection(db, "social");
        // const q = query(socialRef, where("email", "==", user.email));
        // const querySnapshot = await getDocs(q);
        // querySnapshot.forEach((doc) => {

        // localStorage.setItem("id", doc.id);
        // localStorage.setItem("Email", doc.data().email);
        // navigate(`/${doc.id}`);
        // });
        let id = await toid(user.email);
        let userData = await getData(id);
        localStorage.setItem("id", id);
        localStorage.setItem("Email", userData.email);
        navigate(`/${id}`);
      })
      .catch((error) => {
        // navigate(`/signup`);
        setNoUser(1);
        setFirstLoad(1);
        setTimeout(function () {
          setNoUser(0);
        }, 4000);
      });
  };
  return isDesktopOrLaptop ? (
    <div className="h-screen text-black">
      <div className="h-full w-full flex justify-center">
        <div className="w-full flex justify-center">
          <div className="py-4 w-6/12 bg-[#3A54AA] flex flex-col gap-10 items-center justify-center">
            {/* <img src={bg} className="blackwhite h-96 w-96" /> */}
            <div className="bg-white text-white  px-4 py-10  flex flex-col justify-center gap-7 h-96 w-96 rounded-xl">
              <div className=" bg-blue-500 items-center py-2 px-4 -mx-4 flex -mt-10 rounded-t-xl">
                <div className=" pr-1  rounded-r-full">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img src={person1} className="h-10 w-10" />
                  </div>
                </div>
                <div className=" rounded-l-full w-40 py-2 text-white font-semibold text-xl">
                  Tom Sheapard
                </div>
              </div>
              <div className="flex items-center justify-end">
                <div className="bg-blue-500 rounded-l-full w-40 py-2">Hai</div>
                <div className="bg-blue-500 pr-1  rounded-r-full">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img src={person1} className="h-10 w-10" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-start">
                <div className="bg-violet-600 pr-1  rounded-l-full">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img src={person2} className="h-10 w-10" />
                  </div>
                </div>
                <div className="bg-violet-600 rounded-r-full w-40 py-2">
                  Hai
                </div>
              </div>
              <div className="flex items-center justify-end">
                <div className="bg-blue-500 rounded-l-full w-40 py-2">Hai</div>
                <div className="bg-blue-500 pr-1  rounded-r-full">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img src={person1} className="h-10 w-10" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-start">
                <div className="bg-violet-600 pr-1  rounded-l-full">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img src={person2} className="h-10 w-10" />
                  </div>
                </div>
                <div className="bg-violet-600 rounded-r-full w-40 py-2">
                  Hai
                </div>
              </div>
              <div className="flex text-black items-center justify-center">
                <div className="px-4 rounded-l-xl bg-gray-200 flex items-center h-10 w-full">
                  Send a Message
                </div>
                <div className="bg-gray-200 rounded-r-xl  px-4 h-10 flex justify-center items-center">
                  <BsSendFill />
                </div>
              </div>
            </div>
            <div className="text-2xl text-white font-light">
              Meet new Friends and keep connected
            </div>
          </div>
          <div className="py-4 w-6/12 justify-center items-center bg-white flex flex-col gap-10">
            <div className="flex flex-col">
              <div className="text-3xl font-semibold ">Chat Chit </div>
              <div className="text-lg font-light">
                Your friends miss you! Login to join them{" "}
              </div>
            </div>

            <div className="flex justify-center">
              <div
                className="flex gap-4 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-white hover:text-blue-500 hover:border-blue-500 transition cursor-pointer border"
                onClick={hadleGoogleSignIn}
              >
                <img src={google} className="h-6 w-6 rounded-xl" />
                <div>Log in using Google</div>
              </div>
            </div>
            <div className="-mt-8 hover:underline">
              <Link to="/signup">Don't have an account? Sign up</Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`absolute top-10 right-10  ${
          !firstLoad ? "opacity-100" : ""
        }`}
      >
        <motion.nav animate={nouser ? "open" : "closed"} variants={variants}>
          {firstLoad ? (
            <div className="flex text-lg justify-center items-center text-white px-12 bg-red-600 py-4 rounded-xl">
              <div>
                <div>No such account</div>
                <div>Sign Up now!!</div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </motion.nav>
      </div>
    </div>
  ) : (
    <div className="h-screen text-black">
      <div className="h-full  flex justify-center">
        <div className=" flex justify-center">
          <div className="py-4  justify-center items-center flex flex-col gap-10">
            <div className="flex flex-col">
              <div className="text-3xl font-semibold ">Chat Chit </div>
              <div className="text-lg font-light">
                Your friends miss you! Login to join them{" "}
              </div>
            </div>

            <div className="flex justify-center">
              <div
                className="flex gap-4 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-white hover:text-blue-500 hover:border-blue-500 transition cursor-pointer border"
                onClick={hadleGoogleSignIn}
              >
                <img src={google} className="h-6 w-6 rounded-xl" />
                <div>Log in using Google</div>
              </div>
            </div>
            <div className="-mt-8 hover:underline">
              <Link to="/signup">Don't have an account? Sign up</Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`absolute top-10 right-10  ${
          !firstLoad ? "opacity-100" : ""
        }`}
      >
        <motion.nav animate={nouser ? "open" : "closed"} variants={variants}>
          {firstLoad ? (
            <div className="flex text-lg justify-center items-center text-white px-12 bg-red-600 py-4 rounded-xl">
              <div>
                <div>No such account</div>
                <div>Sign Up now!!</div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </motion.nav>
      </div>
    </div>
  );
}
