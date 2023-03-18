import React, { useState } from "react";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../firebase/firestore";
import google from "../assets/google.jpeg";
import bg from "../assets/bg.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addEmail } from "../redux/features/counter/counterSlice";
import toid from "../utils/convertemailtoid";
import { motion } from "framer-motion";
import { BsFillCaretLeftFill } from "react-icons/bs";

const auth = getAuth(app);

export default function Signup() {
  const variants = {
    open: { opacity: 1 },
    closed: { opacity: 0, x: 100 },
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alreadyuser, setAlreadyUser] = useState(0);
  const [firstLoad, setFirstLoad] = useState(0);
  const [user, setUser] = useState("");
  const provider = new GoogleAuthProvider();

  const hadleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const id = await toid(user);
        localStorage.setItem("Email", user.email);
        navigate("/adddetails");
      })
      .catch((error) => {
        console.log(error);
        setAlreadyUser(1);
        setFirstLoad(1);
        setTimeout(function () {
          setAlreadyUser(0);
        }, 4000);
      });
  };
  return (
    <div>
      <div className="h-screen bg-black flex w-full text-white">
        <div className=" text-white w-full flex bg-white">
          <div className="w-6/12 bg-[#3A54AA] flex justify-center items-center">
            <img src={bg} className="blackwhite h-96 w-96" />
          </div>
          <div className="w-6/12 text-black gap-10 flex flex-col justify-center items-center ">
            <div className="">
              <div className="text-3xl font-semibold">Chat Chit</div>
              <div className="text-lg font-light ">
                Keep in touch with your friends and meet new ones
              </div>
            </div>

            <div className="flex justify-center">
              <div
                className="flex gap-4 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-white hover:text-blue-500 hover:border-blue-500 transition cursor-pointer border"
                onClick={hadleGoogleSignIn}
              >
                <img src={google} className="h-6 w-6 rounded-xl" />
                <div>Sign Up using Google</div>
              </div>
            </div>
            <div className="hover:underline">
              <Link to="/login">
                <div className="flex gap-2 -mt-8 items-center justify-center hover:underline">
                  <div>Already have an account?</div>
                  <div>Log in</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`absolute top-10 right-10  ${
          !firstLoad ? "opacity-100" : ""
        }`}
      >
        <motion.nav
          animate={alreadyuser ? "open" : "closed"}
          variants={variants}
        >
          {firstLoad ? (
            <div className="flex text-lg justify-center items-center px-4 bg-green-600 py-4 rounded-xl">
              <div>
                <div>The email aready has an account</div>
                <div>Log in!!</div>
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
