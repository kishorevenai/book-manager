import { useEffect } from "react";
import { store } from "../../app/store";
import { bookApiSlice } from "./bookApiSlice";
import { Outlet } from "react-router-dom";

const PrefetchBooks = () => {
  useEffect(() => {
    const book = store.dispatch(
      bookApiSlice.endpoints.getAllBooks.initiate(false)
    );

    return () => {
      book.unsubscribe();
    };
  }, []);
  return <Outlet />;
};

export default PrefetchBooks;
