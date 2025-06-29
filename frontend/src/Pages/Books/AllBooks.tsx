import { Input, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import MainTables from "../../Components/Tables/MainTables";

const AllBooks = () => {
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
      <Grid size={12}>
        <MainTables deleteButton={false} CheckboxButton={true} />
      </Grid>
    </Grid>
  );
};

export default AllBooks;
