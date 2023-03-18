import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toid, { getData, removeFriend } from "../utils/convertemailtoid";
import { Link } from "react-router-dom";

function MutualFriend({ data }) {
  return (
    <div className="flex bg-[#e2eefe] gap-4 items-center px-2  py-4  rounded-xl justify-between">
      <div className="h-10 w-10 rounded-full overflow-hidden">
        <img className="h-10 w-10" src={data.image} />
      </div>
      <div>
        {data.username.substr(0, 12)}
        {data.username.length > 12 ? "..." : ""}
      </div>
      <div
        className="bg-[#3634a9] px-2 py-2  text-white items-center flex  rounded-xl hover:bg-white hover:text-blue-700 transition cursor-pointer"
        onClick={async () => {
          await removeFriend(
            await toid(data.email),
            localStorage.getItem("Email")
          );
          await removeFriend(
            await toid(localStorage.getItem("Email")),
            data.email
          );
          window.location.reload();
        }}
      >
        Unfriend
      </div>
    </div>
  );
}

export default function Mutuals({ data, show, changeshow }) {
  const variants = {
    open: { opacity: 1 },
    closed: { opacity: 0, scale: 0 },
  };
  return show === 1 ? (
    <div className="h-full overflow-auto  text-left px-10 top-0 right-0 absolute bg-white py-4 w-[340px]">
      <div
        className="cursor-pointer text-xl font-semibold hover:underline "
        onClick={() => {
          changeshow(!show);
        }}
      >
        Mutual Friends
      </div>
      <div className=" flex flex-col gap-1 mt-4 ">
        {data.map((item) => (
          <MutualFriend data={item} />
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
}
