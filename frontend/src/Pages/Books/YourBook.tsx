import { Grid } from "@mui/system";
import { Typography } from "@mui/material";
import MainTables from "../../Components/Tables/MainTables";

const YourBook = () => {
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
      <Grid size={12}>
        <MainTables deleteButton={true} editButton={true} />
      </Grid>
    </Grid>
  );
};

export default YourBook;
