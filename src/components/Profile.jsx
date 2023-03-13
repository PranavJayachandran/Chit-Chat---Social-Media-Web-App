import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import toid, { addData, getData } from "../utils/convertemailtoid";

export default function Profile() {
  const { id } = useParams();
  const docRef = doc(db, "social", id);
  const [loaded, setLoaded] = useState(0);
  const [isFriend, setIsFriend] = useState(0);
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
  const getDataofLoggedinUser = async () => {
    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //   setLoaded(1);
    //   const data = {
    //     username: docSnap.data()["username"],
    //     bio: docSnap.data()["bio"],
    //     image: docSnap.data()["image"],
    //     lat: docSnap.data()["lat"],
    //     long: docSnap.data()["long"],
    //     link: docSnap.data()["link"],
    //     friend: docSnap.data()["friend"],
    //     req: docSnap.data()["req"],
    //     email: docSnap.data()["email"],
    //   };
    //   setUserData(docSnap.data());
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log("No such document!");
    // }
    setUserData(await getData(id));
  };
  useEffect(() => {
    setIsFriend(0);
    friendChecker();
    getDataofLoggedinUser();
  }, [id]);
  useEffect(() => {
    friendChecker();
    getDataofLoggedinUser();
  }, []);

  let data = [];

  const getDataofUserBeingViewed = async () => {
    // const docRef = doc(db, "social", id);
    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //   username = docSnap.data().username;
    //   bio = docSnap.data().bio;
    //   friend = docSnap.data().friend;
    //   image = docSnap.data().image;
    //   lat = docSnap.data().lat;
    //   long = docSnap.data().long;
    //   link = docSnap.data().link;
    //   req = docSnap.data().req;
    //   email = docSnap.data().email;
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log("No such document!");
    // }
    data = await getData(id);
  };
  const addDataintoUserBeingViewed = async () => {
    // setDoc(doc(db, "social", id), {
    //   username: username,
    //   bio: bio,
    //   link: link,
    //   email: email,
    //   image: image,
    //   lat: lat,
    //   long: long,
    //   friend: friend,
    //   req: req,
    // });
    addData(id, data);
  };
  const addFriend = async () => {
    await getDataofUserBeingViewed();
    if (data.req.indexOf(localStorage.getItem("Email")) === -1)
      data.req.push(localStorage.getItem("Email"));
    await addDataintoUserBeingViewed();
  };

  const friendChecker = async () => {
    const idfromlocalstorage = localStorage.getItem("id");
    var friends = await getData().friend;
    // const docRef = doc(db, "social", idfromlocalstorage);
    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
    //   friends = docSnap.data().friend;
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log("No such document!");
    // }

    friends.forEach(async (friend) => {
      const friend_to_id = toid(friend);
      if (friend_to_id === id) setIsFriend(1);
    });
  };

  return (
    <div className="h-screen flex justify-center">
      <div className="border my-16 w-80 px-4 rounded-2xl border-gray-800 text-white flex flex-col justify-center items-center gap-4">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="flex justify-center items-center gap-6">
            <div className="border h-32 w-32 flex flex-col justify-center items-center overflow-hidden rounded-full">
              <img src={userData.image} className=" h-36 w-36" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-lg text-left">{userData.username}</div>
              <Link to={`/friends/${id}`}>
                <div className="text-left">
                  {userData.friend.length} Friends
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-4 ">
          {/* <div className="font-semibold text-left">Pranav Jayachandran</div> */}
          <div>{userData.bio}</div>
          <div>
            <a href={userData.link} target="_blanck">
              {userData.link}
            </a>
          </div>
        </div>
        {userData.email === localStorage.getItem("Email") ? (
          <Link to="/editprofile">
            <div className="bg-gray-100 text-black px-4 py-2 rounded-xl hover:bg-black hover:text-gray-100 transition cursor-pointer border">
              Edit Profile
            </div>
          </Link>
        ) : isFriend == 0 ? (
          <div
            className="bg-blue-700 px-4 py-1 rounded-xl hover:bg-white hover:text-blue-700 transition cursor-pointer"
            onClick={addFriend}
          >
            Add Friend
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
