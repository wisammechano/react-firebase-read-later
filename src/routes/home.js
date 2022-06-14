import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import firebaseApp from "../firebase";

import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import {
  getFirestore,
  collection,
  query as fsQuery,
  where,
  addDoc,
} from "firebase/firestore";

import { useCollection } from "react-firebase-hooks/firestore";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export default function Home(props) {
  // @TODO: Use the auth state hook below
  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate("/login", { replace: true });
    }
  });

  if (loading) {
    return <p>Please wait</p>;
  }

  if (error) {
    return <p>An error occured while signing in: {error.message}</p>;
  }

  return (
    <main>
      <h2>Read Later</h2>
      {user && <AddForm user={user} />}
      {user && <BooksList user={user} />}
    </main>
  );
}

const AddForm = ({ user }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    e.currentTarget.reset();
    const title = data.get("book-title");
    const author = data.get("book-author");

    const book = {
      title,
      author,
      created_by: user.uid,
      created_at: new Date(),
    };

    // @TODO: Add book to database

    const readLaterRef = collection(firestore, "ReadLater");

    addDoc(readLaterRef, book)
      .then((snapshot) => {
        console.log("Created new entry. Id:", snapshot.id);
      })
      .catch((err) => {
        alert("Error adding book.");
        console.error(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Book Title" name="book-title" />
      <input type="text" placeholder="Book Author" name="book-author" />
      <button type="submit">Add Book</button>
    </form>
  );
};

const BooksList = ({ user }) => {
  // @TODO: Query the books added by this `user.uid` using the collection hook
  const query = fsQuery(
    collection(firestore, "ReadLater"),
    where("created_by", "==", user.uid)
  );

  const [books, loading, error] = useCollection(query);

  if (loading) {
    return <p>Loading Books...</p>;
  }

  if (error) {
    return <p>An error occured: {error?.message}</p>;
  }

  if (!books.size) {
    return <p>No books found. Start by adding a book</p>;
  }

  return (
    <ul>
      {books.docs.map((doc) => (
        <li
          key={doc.id}
          id={doc.id}
          style={{
            margin: 5,
            padding: 10,
          }}
        >
          <span>
            Title: {doc.data().title}. By {doc.data().author}
          </span>
        </li>
      ))}
    </ul>
  );
};
