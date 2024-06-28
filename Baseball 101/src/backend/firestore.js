import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  where,
  query,
  limit,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getFormattedDate } from "../Functions/Functions";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyDIZcr0PplKs_A3wAD4JT74PozeeQJLqPo",
  authDomain: "baseball101.firebaseapp.com",
  projectId: "baseball101",
  storageBucket: "baseball101.appspot.com",
  messagingSenderId: "993933823042",
  appId: "1:993933823042:web:c9147ab4d9362e31cf31db",
  measurementId: "G-ZPRKJBDYTP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const curDate = getFormattedDate();

async function testFunction() {
  console.log("calling testFunction");
  const q = query(
    collection(db, "dates"),
    where("date", "==", curDate),
    limit(1)
  );
  const querySnapshot = await getDocs(q);
  var myDoc;
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    myDoc = doc.data();
  });
  console.log("mydoc is", myDoc);
  if (!myDoc) {
    try {
      const docRef = await addDoc(collection(db, "dates"), {
        date: curDate,
        dailyPlayPageViews: 0,
        freePlayPageViews: 0,
        guessPatterns: [],
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  } else {
  }
}

async function addGuessPattern(guessPattern) {
  const q = query(
    collection(db, "dates"),
    where("date", "==", curDate),
    limit(1)
  );
  const querySnapshot = await getDocs(q);
  var myDoc;
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    myDoc = doc;
  });
  if (!myDoc) {
    try {
      const docRef = await addDoc(collection(db, "dates"), {
        date: curDate,
        dailyPlayPageViews: 0,
        freePlayPageViews: 0,
        guessPatterns: [guessPattern],
        guesses: [],
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  } else {
    var guessPatternsArray = myDoc.data().guessPatterns;
    guessPatternsArray.push(guessPattern);
    console.log("new guess patterns", guessPatternsArray, myDoc.id);
    await updateDoc(doc(db, "dates", myDoc.id), {
      guessPatterns: guessPatternsArray,
    });
  }
}

async function addGuess(guess) {
  const q = query(
    collection(db, "dates"),
    where("date", "==", curDate),
    limit(1)
  );
  const querySnapshot = await getDocs(q);
  var myDoc;
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    myDoc = doc;
  });
  if (!myDoc) {
    try {
      const docRef = await addDoc(collection(db, "dates"), {
        date: curDate,
        dailyPlayPageViews: 0,
        freePlayPageViews: 0,
        guessPatterns: [],
        guesses: [guess],
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  } else {
    var guessesArray = myDoc.data().guesses;
    guessesArray.push(guess);
    console.log("new guess patterns", guessesArray, myDoc.id);
    await updateDoc(doc(db, "dates", myDoc.id), {
      guesses: guessesArray,
    });
  }
}

async function addDailyPlayPageView() {
  console.log("add dp page view");
  const q = query(
    collection(db, "dates"),
    where("date", "==", curDate),
    limit(1)
  );
  const querySnapshot = await getDocs(q);
  var myDoc;
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    myDoc = doc;
  });
  if (!myDoc) {
    try {
      const docRef = await addDoc(collection(db, "dates"), {
        date: curDate,
        dailyPlayPageViews: 1,
        freePlayPageViews: 0,
        statsPageViews: 0,
        guessPatterns: [],
        guesses: [],
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  } else {
    var curDailyPlayPageViews = myDoc.data().dailyPlayPageViews;
    curDailyPlayPageViews++;
    await updateDoc(doc(db, "dates", myDoc.id), {
      dailyPlayPageViews: curDailyPlayPageViews,
    });
  }
}

async function addFreePlayPageView() {
  console.log("add fp page view");
  const q = query(
    collection(db, "dates"),
    where("date", "==", curDate),
    limit(1)
  );
  const querySnapshot = await getDocs(q);
  var myDoc;
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    myDoc = doc;
  });
  if (!myDoc) {
    try {
      const docRef = await addDoc(collection(db, "dates"), {
        date: curDate,
        dailyPlayPageViews: 0,
        freePlayPageViews: 1,
        statsPageViews: 0,
        guessPatterns: [],
        guesses: [],
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  } else {
    var curFreePlayPageViews = myDoc.data().freePlayPageViews;
    curFreePlayPageViews++;
    await updateDoc(doc(db, "dates", myDoc.id), {
      freePlayPageViews: curFreePlayPageViews,
    });
  }
}

async function addStatsPageView() {
  console.log("add fp page view");
  const q = query(
    collection(db, "dates"),
    where("date", "==", curDate),
    limit(1)
  );
  const querySnapshot = await getDocs(q);
  var myDoc;
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    myDoc = doc;
  });
  if (!myDoc) {
    try {
      const docRef = await addDoc(collection(db, "dates"), {
        date: curDate,
        dailyPlayPageViews: 0,
        freePlayPageViews: 0,
        statsPageViews: 1,
        guessPatterns: [],
        guesses: [],
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  } else {
    var curStatsPageViews = myDoc.data().statsPageViews;
    curStatsPageViews++;
    await updateDoc(doc(db, "dates", myDoc.id), {
      statsPageViews: curStatsPageViews,
    });
  }
}

export {
  testFunction,
  addGuessPattern,
  addGuess,
  addDailyPlayPageView,
  addFreePlayPageView,
  addStatsPageView,
};
