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
      <div className="h-screen bg-black flex justify-center items-center text-white">
        <div className="py-4 gap-60 rounded-xl text-white flex justify-center items-center">
          <div className="w-4/12">
            <img src={bg} className="blackwhite h-96 w-96" />
          </div>
          <div className="w/8/12  flex flex-col justify-center items-center  gap-10">
            <div className="text-3xl font-semibold">Chat Chit</div>
            <div className="text-xl ">
              Keep in touch with your friends and meet new ones
            </div>
            <div className="flex justify-center">
              <div
                className="flex gap-4 bg-gray-100 text-black px-4 py-2 rounded-xl hover:bg-black hover:text-gray-100 transition cursor-pointer border"
                onClick={hadleGoogleSignIn}
              >
                <img src={google} className="h-6 w-6" />
                <div>Sign Up using Google</div>
              </div>
            </div>
            <Link to="/login">
              <div className="flex gap-2 -mt-8 items-center justify-center hover:underline">
                <div>Already have an account?</div>
                <div>Log in</div>
              </div>
            </Link>
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
                <BsFillCaretLeftFill className="text-green-600 h-10 w-10 -ml-10" />
              </div>
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
