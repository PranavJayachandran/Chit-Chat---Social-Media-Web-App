import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firestore";

export default function Profile() {
  const { id } = useParams();
  const docRef = doc(db, "social", id);
  const [loaded, setLoaded] = useState(0);
  const [userData, setUserData] = useState({
    username: "",
    bio: "",
    image: "",
    lat: "",
    long: "",
    link: "",
  });
  const getData = async () => {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setLoaded(1);
      const data = {
        username: docSnap.data()["username"],
        bio: docSnap.data()["bio"],
        image: docSnap.data()["image"],
        lat: docSnap.data()["lat"],
        long: docSnap.data()["long"],
        link: docSnap.data()["link"],
      };
      console.log(docSnap.data());
      setUserData(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  useEffect(() => {
    getData();
  }, [id]);

  useEffect(() => {
    if (loaded === 1) console.log(userData);
  }, [userData]);
  return (
    <div className="h-screen flex justify-center">
      <div className="border my-16 w-80 px-4 rounded-2xl border-gray-800 text-white flex flex-col justify-center items-center gap-4">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="flex justify-center items-center gap-6">
            <div className="border h-32 w-32 flex flex-col justify-center items-center overflow-hidden rounded-full">
              <img src={userData.image} className=" h-36 w-36" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-lg">{userData.username}</div>
              <div className="text-left">10 Friends</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-10 ">
          <div className="font-semibold text-left">Pranav Jayachandran</div>
          <div>{userData.bio}</div>
          <div>
            <a href={userData.link} target="_blanck">
              {userData.link}
            </a>
          </div>
        </div>
        <Link to="/editprofile">
          <div className="bg-gray-100 text-black px-4 py-2 rounded-xl hover:bg-black hover:text-gray-100 transition cursor-pointer border">
            Edit Profile
          </div>
        </Link>
      </div>
    </div>
  );
}
