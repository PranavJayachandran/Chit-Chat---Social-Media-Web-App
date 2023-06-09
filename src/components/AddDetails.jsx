import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { doc, setDoc, getDoc, addDoc, collection } from "firebase/firestore";
import { db, storage } from "../firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import toid, { getImageURL } from "../utils/convertemailtoid";

export default function Editprofile() {
  // const email = useSelector(selectEmail);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [progresspercent, setProgresspercent] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }, []);

  const addData = async () => {
    await addDoc(collection(db, "social"), {
      username: userName,
      bio: bio,
      link: link,
      email: localStorage.getItem("Email"),
      image: image,
      lat: lat,
      long: long,
      friend: [],
      req: [],
    });
    localStorage.setItem("id", await toid(localStorage.getItem("Email")));
    navigate(`/${await toid(localStorage.getItem("Email"))}`);
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
        });
      }
    );
    setImage(await getImageURL(file));
    e.preventDefault();
  };

  return (
    <div className="flex">
      <div className="sm:w-[300px]">
        <Navbar />
      </div>
      <div className="w-10/12 pl-10 sm:pl-[0px] h-screen text-[#58609b] flex gap-10 flex-col justify-center items-center">
        <div className="text-3xl font-semibold ">Add details</div>
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="border  h-32 w-32 flex flex-col  justify-center items-center overflow-hidden rounded-full">
            <img src={image} className=" h-36 w-36" />
          </div>
          <div className=" -mt-7 rounded-xl flex  justify-center items-center h-5 w-5 bg-blue-600">
            <label className="cursor-pointer text-white">
              + <input type="file" id="file" onChange={handleChange} />
            </label>
          </div>
          <div className="flex gap-4 items-center justify-center">
            <div className="font-semibold text-lg">Username :</div>
            <div className="border rounded-lg">
              <input
                className="sm:w-96 bg-white border rounded-lg p-2"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                value={userName}
              />
            </div>
          </div>
          <div className="flex gap-4 ml-[53px] items-center">
            <div className="font-semibold text-lg">Bio :</div>
            <div className="border rounded-lg">
              <input
                className="sm:w-96 bg-white border rounded-lg p-2"
                onChange={(e) => {
                  setBio(e.target.value);
                }}
                value={bio}
              />
            </div>
          </div>
          <div className="flex gap-4 ml-[46px] items-center">
            <div className="font-semibold text-lg">Link :</div>
            <div className="border rounded-lg">
              <input
                className="sm:w-96 bg-white border rounded-lg p-2"
                onChange={(e) => {
                  setLink(e.target.value);
                }}
                value={link}
              />
            </div>
          </div>
          <div className="flex justify-center" onClick={addData}>
            <div className="bg-[#3634a9] px-4 text-white  py-2 rounded-xl hover:bg-white hover:text-blue-700 transition cursor-pointer">
              Submit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
