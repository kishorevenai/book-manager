import { Grid } from "@mui/system";
import { Typography } from "@mui/material";
import MainTables from "../../Components/Tables/MainTables";
import { useGetYourBooksQuery } from "./bookApiSlice";

const YourBook = () => {
  const {
    data: books,
    isSuccess,
    isLoading,
    isError,
  } = useGetYourBooksQuery({});
  let content = null;

  if (isLoading) {
    content = <Typography>Loading...</Typography>;
  } else if (isError) {
    content = <Typography>Error loading your books</Typography>;
  } else if (isSuccess && books.length > 0) {
    content = <MainTables deleteButton={true} editButton={true} rows={books} />;
  } else {
    content = <Typography>No books found</Typography>;
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
        <Typography variant="h1">Your Books</Typography>
      </Grid>
      <Grid size={12}>
        <Typography variant="subtitle1">
          Explore our exclusive collection of books
        </Typography>
      </Grid>
      <Grid size={12}>{content}</Grid>
    </Grid>
  );
};

export default YourBook;
