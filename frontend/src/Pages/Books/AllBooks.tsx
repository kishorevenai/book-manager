import { useState } from "react";
import { Button, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import MainTables from "../../Components/Tables/MainTables";
import { useGetAllBooksQuery, useAddBookToUserMutation } from "./bookApiSlice";
import { selectCurrentToken } from "../../Pages/Auth/authSlice";
import { useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth";

const AllBooks = () => {
  const {
    data: books,
    isSuccess,
    isLoading,
    isError,
  } = useGetAllBooksQuery({});

  const { email } = useAuth();

  console.log(email);

  const token = useSelector(selectCurrentToken);

  const [addBookToUser] = useAddBookToUserMutation();

  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);

  const handleAddBooks = async () => {
    if (!token) {
      alert("Please login to add books to your collection.");
      return;
    }
    try {
      await addBookToUser({ ids: selectedBooks, email }).unwrap();
    } catch (error) {
      console.error("Failed to add books:", error);
    }
  };

  let content = null;
  if (isLoading) {
    content = <Typography>Loading...</Typography>;
  } else if (isError) {
    content = <Typography>Error loading books</Typography>;
  } else if (isSuccess && books.length > 0) {
    content = (
      <MainTables
        setSelectedRowIds={setSelectedBooks}
        CheckboxButton={true}
        deleteButton={false}
        rows={books}
      />
    );
  }

  return (
    <Grid
      sx={{
        width: "80%",
        margin: "auto",
      }}
      container
      spacing={2}
    >
      <Grid size={12}>
        <Typography variant="h1">All Books</Typography>
      </Grid>
      <Grid size={6}>
        <Typography variant="subtitle1">
          Explore our exclusive collection of books
        </Typography>
      </Grid>
      <Grid
        display={"flex"}
        alignContent={"center"}
        justifyContent={"end"}
        size={6}
      >
        <Button onClick={handleAddBooks}>Add To Your Library</Button>
      </Grid>
      <Grid size={12}>{content}</Grid>
    </Grid>
  );
};

export default AllBooks;
