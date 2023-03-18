import React, { useEffect, useState } from "react";
import { db } from "../firebase/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import toid, { getData, addData } from "../utils/convertemailtoid";

function Notification(props) {
  let id = 0;
  const [userName, setUserName] = useState("");
  const addFriend = async () => {
    //adding friend into the present user
    // let username = "",
    //   bio = "",
    //   link = "",
    //   image = "",
    //   lat = "",
    //   long = "",
    //   friend = [],
    //   req = [];

    // const docRef = doc(db, "social", localStorage.getItem("id"));
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
    // } else {
    //   console.log("No such document!");
    // }
    let data = await getData(localStorage.getItem("id"));

    data.friend.push(props.item);
    data.req = data.req.filter((item) => item != props.item);
    // await setDoc(doc(db, "social", localStorage.getItem("id")), {
    //   username: username,
    //   bio: bio,
    //   link: link,
    //   email: localStorage.getItem("Email"),
    //   image: image,
    //   lat: lat,
    //   long: long,
    //   friend: friend,
    //   req: req,
    // });
    await addData(localStorage.getItem("id"), data);

    //adding friend for the account the sent the request
    id = await toid(props.item);
    // const docRef2 = doc(db, "social", id);
    // const docSnap2 = await getDoc(docRef2);

    // if (docSnap2.exists()) {
    //   username = docSnap2.data().username;
    //   bio = docSnap2.data().bio;
    //   friend = docSnap2.data().friend;
    //   image = docSnap2.data().image;
    //   lat = docSnap2.data().lat;
    //   long = docSnap2.data().long;
    //   link = docSnap2.data().link;
    //   req = docSnap2.data().req;
    //   email = docSnap2.data().email;
    // } else {
    //   console.log("2No such document!");
    // }
    data = await getData(id);
    data.friend.push(localStorage.getItem("Email"));

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
    await addData(id, data);
    window.location.reload();
  };

  const ignoreFriend = async () => {
    // let username = "",
    //   bio = "",
    //   link = "",
    //   image = "",
    //   lat = "",
    //   long = "",
    //   friend = [],
    //   req = [];
    // const docRef = doc(db, "social", localStorage.getItem("id"));
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
    // } else {
    //   console.log("No such document!");
    // }
    let data = await getData(localStorage.getItem("id"));
    data.req = data.req.filter((item) => item != props.item);
    // await setDoc(doc(db, "social", localStorage.getItem("id")), {
    //   username: username,
    //   bio: bio,
    //   link: link,
    //   email: localStorage.getItem("Email"),
    //   image: image,
    //   lat: lat,
    //   long: long,
    //   friend: friend,
    //   req: req,
    // });
    await addData(localStorage.getItem("id"), data);
  };
  let email = "";

  // const search = async () => {
  //   const socialRef = collection(db, "social");
  //   const q = query(socialRef, where("email", "==", props.item));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     id = doc.id;
  //   });
  // };
  const getUserName = async () => {
    var temp = await getData(await toid(props.item));
    setUserName(temp.username);
  };

  useEffect(() => {
    getUserName();
  }, []);
  return (
    <div>
      <div className="font-light">{userName}</div>
      <div className="mt-1 flex gap-4">
        <div
          className="bg-blue-600 px-3 rounded-xl py-1 cursor-pointer hover:bg-white hover:text-blue-600 transition"
          onClick={addFriend}
        >
          Add
        </div>
        <div
          className="bg-gray-600 px-3 rounded-xl py-1 cursor-pointer hover:bg-white hover:text-gray-600 transition"
          onClick={ignoreFriend}
        >
          Ignore
        </div>
      </div>
    </div>
  );
}

export default function Notifications({ data }) {
  return (
    <div className="-ml-4 z-10 gap-2 px-6 w-full rounded-xl  py-6 bg-gray-900">
      <div className="text-lg mb-4 ">
        {data.length > 0 ? "You have friend requests" : "You have no requests"}
      </div>
      <div className="flex flex-col gap-4">
        {data.map((item) => (
          <Notification item={item} />
        ))}
      </div>
    </div>
  );
}
