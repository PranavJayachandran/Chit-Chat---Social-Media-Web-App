import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousel from "react-grid-carousel";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";

function Friend({ data, friendOf }) {
  const email = localStorage.getItem("Email");
  // const [userName, setUserName] = useState("");
  // const [bio, setBio] = useState();
  // const [link, setLink] = useState();
  // const [image, setImage] = useState();
  // const [lat, setLat] = useState();
  // const [long, setLong] = useState();
  // const [friend, setFriend] = useState([]);
  let username = "",
    bio = "",
    link = "",
    image = "",
    lat = "",
    long = "",
    friend = [];
  const [alreadyfriend, setAlreadyFriend] = useState(0);
  const getData = async () => {
    const docRef = doc(db, "social", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      username = docSnap.data().username;
      bio = docSnap.data().bio;
      friend = docSnap.data().friend;
      image = docSnap.data().image;
      lat = docSnap.data().lat;
      long = docSnap.data().long;
      link = docSnap.data().link;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  const addData = async () => {
    await setDoc(doc(db, "social", email), {
      username: username,
      bio: bio,
      link: link,
      email: email,
      image: image,
      lat: lat,
      long: long,
      friend: friend,
    });
  };
  const addFriend = async () => {
    await getData();
    friend.push(data.email);
    addData();
  };

  return (
    <div className="flex flex-col items-center  gap-2 border px-8 py-4 rounded-xl">
      <div className="h-20 w-20 rounded-full border flex justify-center items-center overflow-hidden">
        <img src={data.image} className="h-20 w-20" />
      </div>
      <div>{data.username}</div>
      <div
        className="bg-blue-600 rounded-xl w-24 py-2 px-2 hover:text-blue-600 hover:bg-white transition cursor-pointer"
        onClick={addFriend}
      >
        Add Friend
      </div>
    </div>
  );
}

function Friends({ title, data, friendOf }) {
  const email = localStorage.getItem("Email");
  const [userName, setUserName] = useState();
  const [bio, setBio] = useState();
  const [link, setLink] = useState();
  const [image, setImage] = useState();
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [friend, setFriend] = useState([]);

  const [nonfriends, setNonFriends] = useState([]);

  // const getData = async () => {
  //   const docRef = doc(db, "social", email);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     setUserName(docSnap.data().username);
  //     setBio(docSnap.data().bio);
  //     setFriend(docSnap.data().friend);
  //     setImage(docSnap.data().image);
  //     setLat(docSnap.data().lat);
  //     setLong(docSnap.data().long);
  //     setLink(docSnap.data().link);
  //   } else {
  //     // doc.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // };
  // const addFriend = async () => {
  //   getData();
  // };

  useEffect(() => {
    data.forEach((element) => {
      let p = 0;
      friendOf.forEach((item) => {
        if (element.email == item) p = 1;
      });
      if (p == 0) {
        setNonFriends((prev) => [...prev, element]);
      }
    });
  }, [data]);

  return (
    <div className="flex flex-col gap-4 pl-20">
      <div className="text-xl text-left">{title}</div>
      <div className="w-[900px] -ml-10">
        <Carousel cols={5} rows={1} loop>
          {nonfriends.map((item, index) => (
            <Carousel.Item>
              <Friend data={item} friendOf={friendOf} />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
export default function MeetPeople() {
  const [data, setData] = useState([]);
  const email = localStorage.getItem("Email");
  const [friendOf, setFriendOf] = useState([]);
  const getData = async () => {
    const docRef = doc(db, "social", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setFriendOf(docSnap.data().friend);
    } else {
      console.log("No such document!");
    }
    const querySnapshot = await getDocs(collection(db, "social"));
    querySnapshot.forEach((doc) => {
      setData((prev) => [...prev, doc.data()]);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-black flex justify-center ">
      <div className="w-[300px] ">
        <Navbar />
      </div>
      <div className="pb-20 overflow-y-scroll h-screen  w-10/12 pt-32 flex flex-col gap-10">
        {data.length > 0 ? (
          <Friends title="Mutual Friends" data={data} friendOf={friendOf} />
        ) : (
          <></>
        )}
        {data.length > 0 ? (
          <Friends title="Meet New People" data={data} friendOf={friendOf} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
