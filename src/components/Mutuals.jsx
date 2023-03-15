import React from "react";
import { motion } from "framer-motion";
import toid, { getData, removeFriend } from "../utils/convertemailtoid";

export default function Mutuals({ data, show, changeshow }) {
  const variants = {
    open: { opacity: 1 },
    closed: { opacity: 0, scale: 0 },
  };
  return (
    <motion.nav animate={show ? "open" : "closed"} variants={variants}>
      {show === 1 ? (
        <div className="h-32 overflow-auto -mt-6 text-left px-10 rounded-xl absolute bg-gray-900 py-4 w-[260px]">
          <div
            className="cursor-pointer text-lg hover:underline "
            onClick={() => {
              changeshow(!show);
            }}
          >
            Mutual Friends
          </div>
          <div className="font-light flex flex-col gap-2 mt-4 ">
            {data.map((item) => (
              <div className="flex justify-between">
                <div>{item.username}</div>
                <div
                  className="hover:bg-white hover:text-gray-600 transition cursor-pointer bg-gray-600 px-2 rounded-lg py-1 font-bold"
                  onClick={async () => {
                    await removeFriend(
                      await toid(item.email),
                      localStorage.getItem("Email")
                    );
                    await removeFriend(
                      await toid(localStorage.getItem("Email")),
                      item.email
                    );
                    window.location.reload();
                  }}
                >
                  Unfriend
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </motion.nav>
  );
}
