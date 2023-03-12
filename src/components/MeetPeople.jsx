import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Carousel from "react-grid-carousel";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firestore";

function Friends({ title, data }) {
  console.log(title, data);
  return (
    <div className="flex flex-col gap-4 pl-20">
      <div className="text-xl text-left">{title}</div>
      <div className="w-[900px] -ml-10">
        <Carousel cols={5} rows={1} loop>
          {data.map((item, index) => (
            <Carousel.Item>
              <div className="flex flex-col items-center  gap-2 border px-8 py-4 rounded-xl">
                <div className="h-20 w-20 rounded-full border flex justify-center items-center overflow-hidden">
                  <img src={item.image} className="h-20 w-20" />
                </div>
                <div>{item.username}</div>
                <div className="bg-blue-600 rounded-xl w-24 py-2 px-2 hover:text-blue-600 hover:bg-white transition cursor-pointer  ">
                  Add Friend
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
export default function MeetPeople() {
  const [data, setData] = useState([]);
  const getData = async () => {
    console.log("HERE");
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
          <Friends title="Mutual Friends" data={data} />
        ) : (
          <></>
        )}
        {data.length > 0 ? (
          <Friends title="Meet New People" data={data} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
