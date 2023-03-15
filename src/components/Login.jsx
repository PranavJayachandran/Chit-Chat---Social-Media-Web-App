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

const auth = getAuth(app);

export default function Login() {
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
  return (
    <div>
      <div className="h-screen bg-black flex justify-center items-center text-white">
        <div className="py-4 gap-60 rounded-xl text-white flex justify-center items-center">
          <div className="w-4/12">
            <img src={bg} className="blackwhite h-96 w-96" />
          </div>
          <div className="w/8/12  flex flex-col gap-10">
            <div className="text-3xl font-semibold">Chat Chit</div>
            <div className="text-xl ">
              Your friends miss you! Login to join them{" "}
            </div>
            <div className="flex justify-center">
              <div
                className="flex gap-4 bg-gray-100 text-black px-4 py-2 rounded-xl hover:bg-black hover:text-gray-100 transition cursor-pointer border"
                onClick={hadleGoogleSignIn}
              >
                <img src={google} className="h-6 w-6" />
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
            <div className="flex text-lg justify-center items-center px-4 bg-red-600 py-4 rounded-xl">
              <div>
                <BsFillCaretLeftFill className="text-red-600 h-10 w-10 -ml-10" />
              </div>
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
