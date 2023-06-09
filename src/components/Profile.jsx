import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import toid, { addData, getData } from "../utils/convertemailtoid";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useMediaQuery } from "react-responsive";
import Mutuals from "./Mutuals";

export default function Profile() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
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
  const [showMutualFriends, setShowMutualFriends] = useState(0);
  const [mutualFriends, setMutualFriends] = useState([]);
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
    data = await getData(id);
  };
  useEffect(() => {
    setLoaded(0);
    setIsFriend(0);
    friendChecker();
    getDataofUserBeingViewed();

    setLoaded(1);
  }, [id]);
  useEffect(() => {
    setLoaded(0);
    friendChecker();
    getDataofUserBeingViewed();
    setLoaded(1);
  }, []);

  useEffect(() => {
    if (userData.username !== "") findMutualFriends();
  }, [userData]);

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

    setUserData(await getData(id));
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

  const findMutualFriends = async () => {
    await getDataofLoggedinUser();
    userData.friend.forEach(async (item) => {
      let temp = await getData(await toid(item));
      if (
        data.friend.indexOf(item) !== -1 &&
        mutualFriends.indexOf(temp) === -1
      ) {
        let p = 0;
        for (const mutualFriend of mutualFriends) {
          if (mutualFriend.email === temp.email) p = 1;
        }
        if (p === 0) setMutualFriends((prev) => [...prev, temp]);
      }
    });
  };

  return (
    <div className="bg-[#e2eefe]">
      {userData.username !== "" ? (
        <div className="h-screen text-[#58609b] flex justify-center">
          <div className=" my-16  px-4 rounded-2xl flex flex-col justify-center items-center gap-4">
            <div className="flex flex-col justify-center items-center gap-4">
              <div className="flex justify-center items-center gap-6">
                <div className="sm:h-40 sm:w-40  h-24 w-24 flex flex-col justify-center items-center overflow-hidden rounded-full">
                  <img
                    src={userData.image}
                    className="sm:h-40 sm:w-40 h-28 w-28"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="sm:text-lg text-left">
                    {userData.username}
                  </div>
                  <Link to={`/friends/${id}`}>
                    <div className="text-2xl font-semibold text-left hover:text-gray-400 hover:underline">
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
                <div className="bg-[#3634a9] text-white px-4 py-2 rounded-xl hover:bg-white hover:text-[#3634a9] transition cursor-pointer border">
                  Edit Profile
                </div>
              </Link>
            ) : isFriend == 0 ? (
              <div
                className="bg-[#3634a9] px-4 text-white  py-2 rounded-xl hover:bg-white hover:text-blue-700 transition cursor-pointer"
                onClick={addFriend}
              >
                Add Friend
              </div>
            ) : (
              <></>
            )}
            {mutualFriends.length == 0 || id == localStorage.getItem("id") ? (
              <></>
            ) : mutualFriends.length > 2 ? (
              <div>
                <div
                  className="text-black cursor-pointer flex gap-2 text-md hover:underline"
                  onClick={() => {
                    setShowMutualFriends(1 - showMutualFriends);
                  }}
                >
                  <div>Friends with</div>
                  <div className="flex gap-1 text-md font-light">
                    {mutualFriends.map((item, index) =>
                      index < 2 ? (
                        <div>
                          {item.username}{" "}
                          {index < mutualFriends.length - 1 ? "," : ""}
                        </div>
                      ) : (
                        <></>
                      )
                    )}

                    <div>and {mutualFriends.length - 2} more</div>
                  </div>
                </div>
                <Mutuals
                  data={mutualFriends}
                  show={showMutualFriends}
                  changeshow={setShowMutualFriends}
                />
              </div>
            ) : (
              <div>
                <div
                  className="flex text-black text-md  items-center gap-2 hover:underline cursor-pointer"
                  onClick={() => {
                    setShowMutualFriends(1 - showMutualFriends);
                  }}
                >
                  <div>Friends with</div>
                  <div className="flex gap-1">
                    {mutualFriends.map((item, index) => (
                      <div>
                        {item.username}{" "}
                        {index < mutualFriends.length - 1 ? "and" : ""}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="">
                  <Mutuals
                    data={mutualFriends}
                    show={showMutualFriends}
                    changeshow={setShowMutualFriends}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <SkeletonTheme
          baseColor="grey"
          highlightColor="grey"
          borderRadius="0.5rem"
          duration={4}
        >
          <div className="h-screen flex justify-center">
            <div className=" my-16 px-4 rounded-2xl  flex flex-col justify-center items-center gap-4">
              <div className="flex flex-col justify-center items-center gap-4">
                <div className="flex justify-center items-center gap-6">
                  <div className="sm:h-40 sm:w-40 flex flex-col justify-center items-center overflow-hidden rounded-full">
                    <Skeleton circle height="200px" width="200px" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Skeleton width="100px" />
                    <Skeleton />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-4 ">
                {/* <div className="font-semibold text-left">Pranav Jayachandran</div> */}
                <Skeleton width="100px" />
                <Skeleton width="100px" />
              </div>

              <Skeleton width="100px" height="40px" />
            </div>
          </div>
        </SkeletonTheme>
      )}
    </div>
  );
}
