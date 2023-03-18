import toid, { getData } from "./convertemailtoid.js";
import { collection, getDocs } from "firebase/firestore";
import app, { db, storage } from "../firebase/firestore";



export async function sortTheAccounts(id) {
    // let userData = await getData(id);
    // let data = [];
    // nonFriends.forEach((nonFriend) => {
    //     let lat = nonFriend.lat - userData.lat, long = nonFriend.long - userData.long, friends = nonFriend.friend.length;
    //     let val = friends * 0.4 - ((Math.abs(lat) * Math.abs(long) / (Math.abs(lat) + Math.abs(long) + 1))) * 0.6;
    //     let temp = { value: val, data: nonFriend };
    //     data.push(temp);
    // });
    // data = data.sort();
    // console.log(data);

    // data.sort(function (a, b) {
    //     return b.value - a.value;
    // });

    // let sortedArray = [];
    // data.forEach((item) => {
    //     sortedArray.push(item.data);
    // })


    // return sortedArray;

    let userData = await getData(id);
    let friends = await getFriends(userData)

    let req = [];

    let Alldata = await getAllData();
    console.log(Alldata)
    for (const data of Alldata) {
        if (friends.indexOf(data) === -1)
            friends.push(data)
    }

    for (const item of friends) {
        let p = 0;
        for (const element of userData.friend) {
            if (item.email === element)
                p = 1;
        }
        if (item.email === userData.email)
            p = 1;

        if (!p)
            req.push(item);
    }
    console.log("FR", friends, req)
    return req;
}


async function getFriends(userData) {
    let temp = [];
    for (const item of userData.friend) {
        let friendData = await getData(await toid(item));
        for (const element of friendData.friend) {
            temp.push(await getData(await toid(element)));
        }
    }
    console.log(await getAllData())

    return temp
}

async function getAllData() {
    let Alldata = [];
    const querySnapshot = await getDocs(collection(db, "social"));
    querySnapshot.forEach((doc) => {
        Alldata.push(doc.data());
    });

    return Alldata
}