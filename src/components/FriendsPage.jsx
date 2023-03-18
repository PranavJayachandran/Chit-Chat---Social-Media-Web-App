import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import toid, { getData, removeFriend } from "../utils/convertemailtoid";
import { Link, useParams } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Friend({ item }) {
  const { id } = useParams();
  const [userId, setUserId] = useState(0);
  const [data, setData] = useState({
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
  const getFriendData = async () => {
    setUserId(await toid(item));
    setData(await getData(await toid(item)));
  };
  const unFriend = async () => {
    await removeFriend(id, item);
    await removeFriend(await toid(item), localStorage.getItem("Email"));
    window.location.reload();
  };
  useEffect(() => {
    getFriendData();
  }, [item]);

  return (
    <div className="flex ">
      <div className="flex w-[320px] sm:w-[400px] justify-between px-4 rounded-xl py-4 border border-gray-600 items-center justify-start">
        {data.image !== "" ? (
          <Link to={`/${userId}`}>
            <div className="flex gap-4 items-center">
              <img src={data.image} className="rounded-full h-20 w-20" />
              <div>{data.username}</div>
            </div>
          </Link>
        ) : (
          <SkeletonTheme
            baseColor="grey"
            highlightColor="grey"
            borderRadius="0.5rem"
            duration={4}
          >
            <div className="flex gap-4 items-center">
              <Skeleton circle width="80px" height="80px" />
              <Skeleton width="80px" />
            </div>
          </SkeletonTheme>
        )}
        <div className="flex">
          {id === localStorage.getItem("id") ? (
            <div
              className="bg-[#3634a9] text-white px-2 rounded-xl py-2 hover:bg-white hover:text-[#3634a9] transition cursor-pointer font-semibold"
              onClick={unFriend}
            >
              Unfriend
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
export default function FriendsPage() {
  const { id } = useParams();
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(1);
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
  ];
  const getFriends = async () => {
    let data = {};
    data = await getData(id);
    setFriends(data.friend);
    setLoading(0);
  };
  useEffect(() => {
    getFriends();
  }, []);
  return (
    <div className="bg-[#e2eefe] text-[#58609b] flex sm:justify-center sm:items-center">
      <div className="sm:w-[300px]">
        <Navbar />
      </div>
      {loading === 0 ? (
        <div className="h-screen justify-center flex flex-col gap-10 w-full sm:w-10/12">
          {friends.length > 0 ? (
            <div className="text-xl sm:text-3xl font-semibold">
              Here are all the Friends
            </div>
          ) : id === localStorage.getItem("id") ? (
            <div className="text-2xl flex flex-col gap-2">
              <div>Lets make new friends</div>
              <div className="flex justify-center">
                <Link to="/meetpeople">
                  <div className="bg-blue-600 text-lg p-2 text-white rounded-xl hover:bg-white hover:text-blue-600 cursor-pointer transition">
                    Meet People
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-xl flex flex-col gap-2">
              <div>User has no friends</div>
            </div>
          )}
          <div className="flex items-center flex-col gap-4 ">
            {friends.map((item, index) => (
              <Friend item={item} />
            ))}
          </div>
        </div>
      ) : (
        <div className="h-screen  justify-center items-center flex flex-col gap-10 w-10/12">
          <div className="text-3xl font-semibold">Here are all the Friends</div>
          <div className="flex items-center flex-col gap-4 ">
            {tempdata.map((item, index) => (
              <Friend item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
