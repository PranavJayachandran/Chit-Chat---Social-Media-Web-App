import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Profile from "./Profile";

export default function Home() {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {});
  }, []);
  return (
    <div className="App flex justify-center">
      <div className="sm:w-[300px] w-[1px]">
        <Navbar />
      </div>
      <div className=" sm:w-10/12 w-full">
        <Profile />
      </div>
    </div>
  );
}
