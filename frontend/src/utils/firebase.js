import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFunctions } from "firebase/functions";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  DocumentSnapshot,
  getDoc,
  getDocFromServer,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXnEwJIPKn1zqo7YvabIEj7dzXsjvsKM0",
  authDomain: "simply-text-ai.firebaseapp.com",
  projectId: "simply-text-ai",
  storageBucket: "simply-text-ai.appspot.com",
  messagingSenderId: "1019093422214",
  appId: "1:1019093422214:web:30f3c3b563e09a88830107",
  measurementId: "G-R9D0JZ1VEE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const functions = getFunctions(app, 'northamerica-northeast1');
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (e) {
    console.error(e);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    console.error(e);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (e) {
    console.error(e);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (e) {
    console.error(e);
  }
};

const logout = () => {
  signOut(auth);
};

const simpleSearch = async (query) => {
  try {
    console.log(query);
    const col = collection(db, "Pages");
    const snapshot = await getDocs(col);

    const docList = new Array();
    snapshot.forEach((doc) => {
      let content = doc.get("Content");
      if(content.includes(query)){
        docList.push("Date: " + doc.get("Date") + "\nAuthor: " + doc.get("Author") + "\nContent: " + doc.get("Content"));
      }
      
    });
    return docList;
  } catch (e) {
    console.error(e);
  }
}

const searchWithFilters = async (query, filters) => {
  try{
  const col = collection(db, "Pages");
  const snapshot = await getDocs(col);

  const docList = new Array();
  snapshot.forEach((doc) => {
    var docContent = doc.get("Content");
    var docDate = doc.get("Date");
    var docAuthor = doc.get("Author");

    var doesInclude = false;

    //scan through content
    for(var i = 0; i < docContent.length; i++){
      
    }



    if(doesInclude && ((filters.date == null)  ? true : docDate == filters.date) && (filters.author == null ? true : docAuthor == filters.author)){
        docList.push({search:query, date:docDate, author: docAuthor, content: docContent});
    }

  });

  return docList
} catch (e){
  console.error(e);
}
}

const addPage = async (author, vResult, tResult, userText, image) => {
  const col = collection(db, "Pages");
  const d = new Date()
  const date = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();

  await addDoc(col,{
    Date: date,
    Author: author,
    Content: vResult,
    tResult: tResult,
    userText: userText,
    image: image
  });
}

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  simpleSearch,
  searchWithFilters,
  addPage
};
