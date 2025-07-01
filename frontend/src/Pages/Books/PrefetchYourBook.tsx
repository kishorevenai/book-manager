import { useEffect } from "react";
import { store } from "../../app/store";
import { bookApiSlice } from "./bookApiSlice";
import { Outlet } from "react-router-dom";

const PrefetchYourBooks = () => {
  useEffect(() => {
    const book = store.dispatch(
      bookApiSlice.endpoints.getYourBooks.initiate(false)
    );

    return () => {
      book.unsubscribe();
    };
  }, []);
  return <Outlet />;
};

export default PrefetchYourBooks;
