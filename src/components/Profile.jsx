import React from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <div className="h-screen flex justify-center">
      <div className="border my-16 px-4 rounded-2xl border-gray-800 text-white flex flex-col justify-center items-center gap-4">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="flex justify-center items-center gap-6">
            <div className="border h-32 w-32 rounded-full"></div>
            <div className="flex flex-col gap-1">
              <div className="text-lg">pranav.jayachandran</div>
              <div className="text-left">10 Friends</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-10 ">
          <div className="font-semibold text-left">Pranav Jayachandran</div>
          <div>
            A boring person, believe me I know. Link to my youtube channel.
          </div>
          <div>
            <a href="www.youtube.com" target="_blanck">
              youtube
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
