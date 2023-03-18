import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, storage } from "../firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { selectEmail } from "../redux/features/counter/counterSlice";
import { useNavigate } from "react-router-dom";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { getData, addData } from "../utils/convertemailtoid";

export default function Editprofile() {
  // const email = useSelector(selectEmail);
  const email = localStorage.getItem("Email");
  const id = localStorage.getItem("id");
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    bio: "",
    image: "",
    lat: "",
    long: "",
    link: "",
    email: "",
    friend: [],
    req: [],
  });
  const req = [];

  const [progresspercent, setProgresspercent] = useState(0);

  const postData = async () => {
    await addData(localStorage.getItem("id"), {
      username: userData.username,
      bio: userData.bio,
      link: userData.link,
      email: userData.email,
      image: userData.image,
      lat: userData.lat,
      long: userData.long,
      friend: userData.friend,
      req: userData.req,
    });
    navigate(`/${localStorage.getItem("id")}`);
  };

  // const getData = async () => {
  //   const docRef = doc(db, "social", id);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //     setUserName(docSnap.data().username);
  //     setBio(docSnap.data().bio);
  //     setFriend(docSnap.data().friend);
  //     setImage(docSnap.data().image);
  //     setLat(docSnap.data().lat);
  //     setLong(docSnap.data().long);
  //     setLink(docSnap.data().link);
  //     req = docSnap.data().req;
  //   } else {
  //     // doc.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // };
  const handleChange = (e) => {
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
          setUserData((prev) => ({ ...prev, image: downloadURL }));
        });
      }
    );
    e.preventDefault();
  };

  const fetchData = async () => {
    setUserData(await getData(localStorage.getItem("id")));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex">
      <div className="sm:w-3/12  w-[1px] ml-4 sm:ml-[0px]">
        <Navbar />
      </div>
      <div className="h-screen bg-[#e2eefe] text-[#58609b] sm:w-10/12 w-full flex gap-10 flex-col justify-center items-center">
        <div className="text-xl sm:text-3xl">Edit Profile</div>
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="border h-24 w-24 sm:h-32 sm:w-32 flex flex-col justify-center items-center overflow-hidden rounded-full">
            <img src={userData.image} className="h-24 w-24 sm:h-36 sm:w-36" />
          </div>
          <div className="text-white bg-[#3634a9] -mt-7 rounded-xl flex justify-center items-center h-5 w-5 ">
            <label className="cursor-pointer">
              + <input type="file" id="file" onChange={handleChange} />
            </label>
          </div>
          <div className="flex gap-4 items-center justify-center">
            <div className="font-semibold  sm:text-lg">Username :</div>
            <input
              className="sm:w-96 bg-gray-100 border rounded-lg p-2"
              onChange={(e) => {
                setUserData((prev) => ({ ...prev, username: e.target.value }));
              }}
              value={userData.username}
            />
          </div>
          <div className="flex gap-4 ml-[53px] items-center">
            <div className="font-semibold sm:text-lg">Bio :</div>
            <input
              className="sm:w-96 bg-gray-100 border rounded-lg p-2"
              onChange={(e) => {
                setUserData((prev) => ({ ...prev, bio: e.target.value }));
              }}
              value={userData.bio}
            />
          </div>
          <div className="flex gap-4 ml-[46px] items-center">
            <div className="font-semibold sm:text-lg">Link :</div>
            <input
              className="sm:w-96 bg-gray-100 border rounded-lg p-2"
              onChange={(e) => {
                setUserData((prev) => ({ ...prev, link: e.target.value }));
              }}
              value={userData.link}
            />
          </div>
          <div className="flex justify-center" onClick={postData}>
            <div className="bg-[#3634a9] text-white px-4 py-2 rounded-xl hover:bg-white hover:text-[#3634a9] transition cursor-pointer border">
              Change
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
