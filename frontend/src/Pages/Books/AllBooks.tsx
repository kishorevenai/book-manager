import { Typography } from "@mui/material";
import { Grid } from "@mui/system";
import MainTables from "../../Components/Tables/MainTables";
import { useGetAllBooksQuery } from "./bookApiSlice";

const AllBooks = () => {
  // Fetching data using a query hook
  const {
    data: books,
    isSuccess,
    isLoading,
    isError,
  } = useGetAllBooksQuery({});

  let content = null;
  if (isLoading) {
    content = <Typography>Loading...</Typography>;
  } else if (isError) {
    content = <Typography>Error loading books</Typography>;
  } else if (isSuccess && books.length > 0) {
    content = (
      <MainTables deleteButton={false} editButton={true} rows={books} />
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
      <Grid size={12}>
        <Typography variant="subtitle1">
          Explore our exclusive collection of books
        </Typography>
      </Grid>
      <Grid size={12}>{content}</Grid>
    </Grid>
  );
};

export default AllBooks;
