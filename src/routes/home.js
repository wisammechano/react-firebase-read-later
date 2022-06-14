import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home(props) {
  // @TODO: Use the auth state hook below
  const [user, loading, error] = [];

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
  const [books, loading, error] = [];

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
