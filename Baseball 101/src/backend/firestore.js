import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
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

async function addGuessPattern(guessPattern) {
  // Adds a guess pattern to the database after a user has completed the daily game
  // Queries to get document with the current date
  const q = query(
    collection(db, "dates"),
    where("date", "==", curDate),
    limit(1)
  );
  const querySnapshot = await getDocs(q);
  var myDoc;
  querySnapshot.forEach((doc) => {
    myDoc = doc;
  });
  if (!myDoc) {
    try {
      // Adds new document for that date since it hasn't yet been created
      const docRef = await addDoc(collection(db, "dates"), {
        date: curDate,
        dailyPlayPageViews: 0,
        freePlayPageViews: 0,
        guessPatterns: [guessPattern],
        guesses: [],
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  } else {
    // Adds the guess pattern to the document
    var guessPatternsArray = myDoc.data().guessPatterns;
    guessPatternsArray.push(guessPattern);
    await updateDoc(doc(db, "dates", myDoc.id), {
      guessPatterns: guessPatternsArray,
    });
  }
}

async function addGuess(guess) {
  // Adds a user's guess for who the player is to the database
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
      // Adds new document for that date since it hasn't yet been created
      const docRef = await addDoc(collection(db, "dates"), {
        date: curDate,
        dailyPlayPageViews: 0,
        freePlayPageViews: 0,
        guessPatterns: [],
        guesses: [guess],
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  } else {
    // Adds the guess to the document
    var guessesArray = myDoc.data().guesses;
    guessesArray.push(guess);
    await updateDoc(doc(db, "dates", myDoc.id), {
      guesses: guessesArray,
    });
  }
}

async function addDailyPlayPageView() {
  // Adds to the Daily Play page view counter in the database
  const q = query(
    collection(db, "dates"),
    where("date", "==", curDate),
    limit(1)
  );
  const querySnapshot = await getDocs(q);
  var myDoc;
  querySnapshot.forEach((doc) => {
    myDoc = doc;
  });
  if (!myDoc) {
    try {
      const docRef = await addDoc(collection(db, "dates"), {
        // Adds new document for that date since it hasn't yet been created
        date: curDate,
        dailyPlayPageViews: 1,
        freePlayPageViews: 0,
        statsPageViews: 0,
        guessPatterns: [],
        guesses: [],
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  } else {
    // Increments the Daily Play page views field of the document
    var curDailyPlayPageViews = myDoc.data().dailyPlayPageViews;
    curDailyPlayPageViews++;
    await updateDoc(doc(db, "dates", myDoc.id), {
      dailyPlayPageViews: curDailyPlayPageViews,
    });
  }
}

async function addFreePlayPageView() {
  // Adds to the Free Play page view counter in the database
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
      // Adds new document for that date since it hasn't yet been created
      const docRef = await addDoc(collection(db, "dates"), {
        date: curDate,
        dailyPlayPageViews: 0,
        freePlayPageViews: 1,
        statsPageViews: 0,
        guessPatterns: [],
        guesses: [],
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  } else {
    // Increments the Free Play page views field of the document
    var curFreePlayPageViews = myDoc.data().freePlayPageViews;
    curFreePlayPageViews++;
    await updateDoc(doc(db, "dates", myDoc.id), {
      freePlayPageViews: curFreePlayPageViews,
    });
  }
}

async function addStatsPageView() {
  // Adds to the Stats page view counter in the database
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
      // Adds new document for that date since it hasn't yet been created
      const docRef = await addDoc(collection(db, "dates"), {
        date: curDate,
        dailyPlayPageViews: 0,
        freePlayPageViews: 0,
        statsPageViews: 1,
        guessPatterns: [],
        guesses: [],
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  } else {
    // Increments the Stats page views field of the document
    var curStatsPageViews = myDoc.data().statsPageViews;
    curStatsPageViews++;
    await updateDoc(doc(db, "dates", myDoc.id), {
      statsPageViews: curStatsPageViews,
    });
  }
}

export {
  addGuessPattern,
  addGuess,
  addDailyPlayPageView,
  addFreePlayPageView,
  addStatsPageView,
};
