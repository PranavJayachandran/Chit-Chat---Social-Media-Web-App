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

const auth = getAuth(app);

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const provider = new GoogleAuthProvider();

  const hadleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(addEmail(user.email));
        localStorage.setItem("Email", user.email);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
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
  );
}
