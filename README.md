# React Firebase Activity

In this activity, you'll learn how to add firebase to your project. We will do a simple read later list for books.

We will use firebase authentication for registration and login, and firebase firestore as a database to hold our lists.

To complete this activity, start by implementing the register route, then the login route. Finally, you can start implementing adding and reading books from databse in the home page route.

## Using firebase

To start using firebase, you have to first create a firebase project on [Firebase Console](https://console.firebase.google.com/).

The project should have a web app configuration, a configuration object will be shared with you. You can use the config to create the `firebaseApp`.

In react, it is advised to use [react-firebase-hooks](https://github.com/CSFrequency/react-firebase-hooks) library to handle firebase. It has been setup to handle state changes and observations. Start by installing firebase and this library:

```shell
yarn add firebase react-firebase-hooks
```

Then, add a new folder inside `src` call it `firebase` and an `index.js` file inside it.

THe content of the `index.js` file should be the config shared with by Firebase Console. Finally you need to export the firebase app so you can use it elsewhere.

### Signing in

react-firebase-hooks offer variety of hooks for each firebase service. To sign in you can use the [`useSignInWithEmailAndPassword`](https://github.com/CSFrequency/react-firebase-hooks/tree/master/auth#usesigninwithemailandpassword) hook.

### Signing up

You can use the [`useCreateUserWithEmailAndPassword`](https://github.com/CSFrequency/react-firebase-hooks/tree/master/auth#usecreateuserwithemailandpassword) hook to register an account.

### Listening to auth state changes

Use the [`useAuthState`](https://github.com/CSFrequency/react-firebase-hooks/tree/master/auth#useauthstate) hook to handle reading the user from firebase sdk

## Firestore

To read from firestore, you can use the react-firebase-hooks library hooks for reading data. To add or change data, we have to default to using original firebase library.

### Reading a collection

[`useCollection`](https://github.com/CSFrequency/react-firebase-hooks/tree/master/firestore#usecollection)

To read a collection, you hae to first create a collection reference (path)

```jsx
import { collection, getFirestore } from "firebase/firestore";
import firebaseApp from "../firebase";

const db = getFirestore(firebaseApp);

const collectionRef = collection(db, "books");
```

Then you can use the `useCollection` or `useCollectionData` hooks to read the collections

```jsx
const [books, loading, error] = useCollection(collectionRef);
```

### Reading a document

[`useDocument`](https://github.com/CSFrequency/react-firebase-hooks/tree/master/firestore#usedocument)

Same way, this time we need to establish the reference but using `doc` instead of `collection`

```jsx
import { doc, getFirestore } from "firebase/firestore";
import firebaseApp from "../firebase";

const db = getFirestore(firebaseApp);
const bookId = "SOME_UID";

const docRef = doc(db, "books", bookId);
```

Then you can use the `useDocument` or `useDocumentData` hooks to read the document

```jsx
const [book, loading, error] = useDocument(docRef);
```

### Adding a new document

When adding data, we have to use firebase sdk function `addDoc` to handle adding a new document to collection

```js
import { collection, getFirestore, addDoc } from "firebase/firestore";
import firebaseApp from "../firebase";

const db = getFirestore(firebaseApp);

const collectionRef = collection(db, "books");

const book = { title: "Good to Great" };

addDoc(collectionRef, book)
  .then((snapshot) => console.log("Added book. ID:", snapshot.id))
  .catch((err) => console.log(err));
```

### Updating a document

We can use `setDoc` from firebase sdk to change a document completely or modify parts of it

```js
import { collection, getFirestore, setDoc } from "firebase/firestore";
import firebaseApp from "../firebase";

const db = getFirestore(firebaseApp);

const bookId = "SOME_ID";

const docRef = collection(db, "books", bookId);

setDoc(docRef, { title: "New Title" })
  .then((snapshot) => console.log("Updated book. ID:", snapshot.id))
  .catch((err) => console.log(err));
```

to partially update document, pass an object `{merge: true}` to the `setDoc` method:

```js
setDoc(docRef, { title: "Updated Title" }, { merge: true });
```
