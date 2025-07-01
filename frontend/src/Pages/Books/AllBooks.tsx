import { useState } from "react";
import { Button, Typography, Snackbar, Alert } from "@mui/material";
import { Grid } from "@mui/system";
import MainTables from "../../Components/Tables/MainTables";
import { useGetAllBooksQuery, useAddBookToUserMutation } from "./bookApiSlice";
import { selectCurrentToken } from "../../Pages/Auth/authSlice";
import { useSelector } from "react-redux";
import { useAuth } from "../../hooks/useAuth";
import { useUpdateBookMutation } from "./bookApiSlice";

const AllBooks = () => {
  const {
    data: books,
    isSuccess,
    isLoading,
    isError,
  } = useGetAllBooksQuery({});

  const { email, role } = useAuth();

  const [addBookToUser] = useAddBookToUserMutation();

  const token = useSelector(selectCurrentToken);

  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);

  const [updateBook] = useUpdateBookMutation();

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  // 🔄 Handle inline row updates (editing title or author)
  const processRowUpdate = async (newRow: any, oldRow: any) => {
    if (newRow.title !== oldRow.title || newRow.author !== oldRow.author) {
      try {
        await updateBook({
          book_id: newRow.book_id,
          title: newRow.title,
          author: newRow.author,
        }).unwrap();

        setSnackbarMessage("Book updated successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Failed to update book:", error);
        setSnackbarMessage("Failed to update book. Please try again.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }

    return newRow;
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAddBooks = async () => {
    if (!token) {
      setSnackbarMessage("Please login to add books to your collection.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (selectedBooks.length === 0) {
      setSnackbarMessage("Please select at least one book to add.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      await addBookToUser({ ids: selectedBooks, email }).unwrap();
      setSnackbarMessage("Books added to your library successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Failed to add books:", error);
      setSnackbarMessage(
        `Failed to add books. Please try again. ${error.data.message}`
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
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
        editButton={role === 1}
        roleId={role}
        processRowUpdate={processRowUpdate}
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default AllBooks;
