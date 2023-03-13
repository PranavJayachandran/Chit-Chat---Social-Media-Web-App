import app, { db, storage } from "../firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export default async function toid(email) {
    const socialRef = collection(db, "social");
    let id = 0;
    const q = query(socialRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        id = doc.id;
    });
    return id;
};

export async function getData(id) {
    const docRef = doc(db, "social", id);
    const docSnap = await getDoc(docRef);
    let data = {};
    if (docSnap.exists()) {
        data = {
            username: docSnap.data()["username"],
            bio: docSnap.data()["bio"],
            image: docSnap.data()["image"],
            lat: docSnap.data()["lat"],
            long: docSnap.data()["long"],
            link: docSnap.data()["link"],
            friend: docSnap.data()["friend"],
            req: docSnap.data()["req"],
            email: docSnap.data()["email"],
        };
    } else {
        // doc.data() will be undefined in this case

        data = { username: "no such user" }
    }
    return data;
}


export async function removeFriend(id, email) {

    let data = await getData(id);
    data.friend = data.friend.filter((item) => item != email);
    addData(id, data);
}

export async function addData(id, data) {
    await setDoc(doc(db, "social", id), {
        username: data.username,
        bio: data.bio,
        link: data.link,
        email: data.email,
        image: data.image,
        lat: data.lat,
        long: data.long,
        friend: data.friend,
        req: data.req,
    });
}

export async function getNotificationCount(id) {
    const docRef = doc(db, "social", id);
    const docSnap = await getDoc(docRef);
    let notification_count = 0, req = [];

    if (docSnap.exists()) {
        notification_count = docSnap.data().req.length;
        req = docSnap.data().req;
    } else {
        console.log("No such document!");
    }

    return { notification_count, req }
};

export async function getImageURL(file) {
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    let url = "";
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
        },
        (error) => {
            alert(error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                url = downloadURL;
            });
        }
    );
    return url;
}