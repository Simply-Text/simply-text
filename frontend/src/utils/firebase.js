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
      if (content.includes(query)) {
        docList.push("Date: " + doc.get("Date") + "\nAuthor: " + doc.get("Author") + "\nContent: " + doc.get("Content"));
      }

    });
    return docList;
  } catch (e) {
    console.error(e);
  }
}

const searchWithFilters = async (query, filters) => {
  var docList = new Array();
  const col = collection(db, "Pages");
  const snapshot = await getDocs(col);
  

    snapshot.forEach((doc) => {
      try {
      var docData = doc.get("wordData");
      var docText = doc.get("userText");
      var docDate = doc.get("Date");
      var docAuthor = doc.get("Author");
      var rects = [];

      var doesInclude = false;
      var dateCheck = false;

      var inData = false;

      var preview = "... ";
      //scan through wordData
      
      for (var i = 0; i < docData.length; i++) {
        for (var j = 0; j < docData[i].words.length; j++) {
          console.log(docData)
          console.log(docData.length + " | " + docData[i].words.length);
          console.log(query + " | " + docData[i].words[j].text );
          if (docData[i].words[j].text.includes(query)) {
            doesInclude = true;
            inData = true;
            rects.push( docData[i].words[j].rectangle);

            //add preview
            preview += (j-1 >= 0 ? docData[i].words[j-1].text : "") + " " +  docData[i].words[j].text + " " + (j+1 >= 0 ? docData[i].words[j+1].text : "") + " ... "
          }
        }
      }

      if (!doesInclude) {
        doesInclude = docText.includes(query);

        preview += docText.substring(docText.search(query), query.length + 10 ) + " ... "
      }
      console.log(doesInclude);

      //check date
      if(filters.date == "" || docDate == filters.date){
        dateCheck = true;
      }else if(filters.date.startsWith("after:")){
        var curDate = Date.parse(filters.date.substring(6))
        var pageDate = Date.parse(docDate);
        if(curDate < pageDate){
          dateCheck = true;
        }
      }


      if (doesInclude && dateCheck && (filters.author == "" ? true : docAuthor == filters.author)) {
        docList.push({ search: query, date: docDate, author: docAuthor, text: docText, image: doc.get("image"), data: docData, inDocData: inData,prev:preview,rects:rects });
      }
    } catch (e) {
      //console.log(e)
    }

    });

    return docList;
  
}

const addPage = async (author, vResult, tResult, userText, image, wordData) => {
  const col = collection(db, "Pages");
  const d = new Date()
  const date = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();

  await addDoc(col, {
    Date: date,
    Author: author,
    Content: vResult,
    tResult: tResult,
    userText: userText,
    wordData: wordData,
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
