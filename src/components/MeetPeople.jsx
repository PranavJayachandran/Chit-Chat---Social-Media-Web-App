import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Carousel from "react-grid-carousel";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import toid, { getData, addData } from "../utils/convertemailtoid";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Friend({ data, friendOf }) {
  const xemail = localStorage.getItem("Email");
  // const [userName, setUserName] = useState("");
  // const [bio, setBio] = useState();
  // const [link, setLink] = useState();
  // const [image, setImage] = useState();
  // const [lat, setLat] = useState();
  // const [long, setLong] = useState();
  // const [friend, setFriend] = useState([]);
  let userData = {};
  const [alreadyfriend, setAlreadyFriend] = useState(0);
  const [id, setId] = useState(0);
  const getData2 = async () => {
    // const socialRef = collection(db, "social");
    // const q = query(socialRef, where("email", "==", data.email));
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   setId(doc.id);
    // });
    setId(await toid(data.email));
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
    userData = await getData(id);
  };
  const addData2 = async () => {
    // await setDoc(doc(db, "social", id), {
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

    await addData(id, userData);
  };
  const addFriend = async () => {
    await getData2();
    console.log(userData);
    if (userData.req.indexOf(xemail) === -1) userData.req.push(xemail);
    await addData2();
  };

  useEffect(() => {
    getData2();
  }, []);
  return (
    <div>
      {data ? (
        <div className="flex flex-col items-center justify-center  gap-2 border px-8 py-4 rounded-xl">
          {id !== 0 ? (
            <div className="gap-2 flex flex-col justify-center items-center">
              <Link to={`/${id}`}>
                <div className="h-20 w-20 rounded-full flex justify-center items-center overflow-hidden">
                  <img src={data.image} className="h-20 w-20" />
                </div>
                <div>{data.username}</div>
              </Link>
              <div
                className="bg-blue-600 rounded-xl w-24 py-2 px-2 hover:text-blue-600 hover:bg-white transition cursor-pointer"
                onClick={addFriend}
              >
                Add Friend
              </div>
            </div>
          ) : (
            <SkeletonTheme
              baseColor="grey"
              highlightColor="grey"
              borderRadius="0.5rem"
              duration={4}
            >
              <div className="gap-2 flex flex-col justify-center items-center">
                <div className="h-20 w-20 rounded-full flex justify-center items-center overflow-hidden">
                  <Skeleton circle width="100px" height="100px" />
                </div>
                <div>
                  <Skeleton width="100px" />
                </div>
                <Skeleton width="100px" />
              </div>
            </SkeletonTheme>
          )}
        </div>
      ) : (
        <div>asdjsadj</div>
      )}
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

  const tempdata = [
    {
      username: "",
      bio: "",
      image: "",
      lat: "",
      long: "",
      link: "",
      email: "",
      friend: [],
      req: [],
    },
    {
      username: "",
      bio: "",
      image: "",
      lat: "",
      long: "",
      link: "",
      email: "",
      friend: [],
      req: [],
    },
    {
      username: "",
      bio: "",
      image: "",
      lat: "",
      long: "",
      link: "",
      email: "",
      friend: [],
      req: [],
    },
    {
      username: "",
      bio: "",
      image: "",
      lat: "",
      long: "",
      link: "",
      email: "",
      friend: [],
      req: [],
    },
    {
      username: "",
      bio: "",
      image: "",
      lat: "",
      long: "",
      link: "",
      email: "",
      friend: [],
      req: [],
    },
    {
      username: "",
      bio: "",
      image: "",
      lat: "",
      long: "",
      link: "",
      email: "",
      friend: [],
      req: [],
    },
  ];

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
    console.log(data, friendOf);
    data.forEach((element) => {
      let p = 0;
      friendOf.forEach((item) => {
        if (element.email == item) p = 1;
      });
      if (p == 0 && element.email !== localStorage.getItem("Email")) {
        setNonFriends((prev) => [...prev, element]);
      }
    });
  }, [data]);

  return (
    <div className="flex flex-col gap-4 pl-20">
      <div className="text-xl text-left">{title}</div>
      <div className="sm:w-[900px] -ml-10">
        {data.length === 0 ? (
          <Carousel cols={5} rows={1} loop>
            {tempdata.map((item, index) => (
              <Carousel.Item>
                <Friend data={item} friendOf={friendOf} />
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <>
            <Carousel cols={5} rows={1} loop>
              {nonfriends.map((item, index) => (
                <Carousel.Item>
                  <Friend data={item} friendOf={friendOf} />
                </Carousel.Item>
              ))}
            </Carousel>
          </>
        )}
      </div>
    </div>
  );
}
export default function MeetPeople() {
  const [data, setData] = useState([]);
  const id = localStorage.getItem("id");
  const [friendOf, setFriendOf] = useState([]);
  const getData = async () => {
    const docRef = doc(db, "social", id);
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
      <div className="sm:w-[300px] ">
        <Navbar />
      </div>
      <div className="pb-20 overflow-y-scroll h-screen  w-full sm:w-10/12 pt-32 flex flex-col gap-10">
        <Friends title="Mutual Friends" data={data} friendOf={friendOf} />

        <Friends title="Meet New People" data={data} friendOf={friendOf} />
      </div>
    </div>
  );
}
