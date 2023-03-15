import toid, { getData } from "./convertemailtoid.js";
import { collection, getDocs } from "firebase/firestore";
import app, { db, storage } from "../firebase/firestore";



export async function sortTheAccounts(id, nonFriends) {
    let userData = await getData(id);
    let data = [];
    nonFriends.forEach((nonFriend) => {
        let lat = nonFriend.lat - userData.lat, long = nonFriend.long - userData.long, friends = nonFriend.friend.length;
        let val = friends * 0.4 - ((Math.abs(lat) * Math.abs(long) / (Math.abs(lat) + Math.abs(long) + 1))) * 0.6;
        let temp = { value: val, data: nonFriend };
        data.push(temp);
    });
    data = data.sort();
    console.log(data);

    data.sort(function (a, b) {
        return b.value - a.value;
    });

    let sortedArray = [];
    data.forEach((item) => {
        sortedArray.push(item.data);
    })


    return sortedArray;
}

