import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Profile from "./Profile";

export default function Home() {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position.coords.latitude, position.coords.longitude);
    });
  }, []);
  return (
    <div className="App bg-black flex justify-center">
      <div className="w-[300px]">
        <Navbar />
      </div>
      <div className=" w-10/12">
        <Profile />
      </div>
    </div>
  );
}
