import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { TextField, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"; // ✅ Corrected import
import { gap } from "@mui/system";

export default function DataTable({
  deleteButton = false,
  editButton = false,
  CheckboxButton = false,
}) {
  const [search, setSearch] = useState<string>("");

  const handleDelete = (id: number) => {
    console.log(`Delete row with id: ${id}`);
  };

  const handleEdit = (id: number) => {
    console.log(`Edit row with id: ${id}`);
  };

  const baseColumns = [
    { field: "id", headerName: "Id", width: 70 },
    { field: "title", headerName: "Title", width: 400 },
    { field: "author", headerName: "Author", width: 300 },
    {
      field: "age",
      headerName: "ISBN",
      type: "number",
      width: 90,
    },
  ];

  // Combine both buttons into a single "Actions" column
  const actionColumn =
    deleteButton || editButton
      ? {
          field: "actions",
          headerName: "Actions",
          width: 140,
          gap: 5,
          sortable: false,
          renderCell: (params: any) => (
            <>
              {editButton && (
                <IconButton
                  onClick={() => handleEdit(params.row.id)}
                  size="small"
                >
                  <EditIcon sx={{ color: "black" }} />
                </IconButton>
              )}
              {deleteButton && (
                <IconButton
                  onClick={() => handleDelete(params.row.id)}
                  size="small"
                >
                  <DeleteIcon sx={{ color: "black" }} />
                </IconButton>
              )}
            </>
          ),
        }
      : null;

  const columns = actionColumn ? [...baseColumns, actionColumn] : baseColumns;

  const rows = [
    { id: 1, title: "Snow", author: "Jon", age: 35 },
    { id: 2, title: "Snow", author: "Jon", age: 35 },
    { id: 3, title: "Snow", author: "Jon", age: 35 },
    { id: 4, title: "Snow", author: "Jon", age: 35 },
    { id: 5, title: "Snow", author: "Jon", age: 35 },
    { id: 6, title: "Snow", author: "Jon", age: 35 },
    { id: 7, title: "Snow", author: "Jon", age: 35 },
    { id: 8, title: "Become Rich ASF", author: "Jon", age: 35 },
    { id: 9, title: "Snow", author: "Jon", age: 35 },
    { id: 10, title: "Snow", author: "Jon", age: 35 },
    { id: 11, title: "Snow", author: "Jon", age: 35 },
    { id: 12, title: "Snow", author: "Jon", age: 35 },
    { id: 13, title: "Snow", author: "Jon", age: 35 },
    { id: 14, title: "Snow", author: "Jon", age: 35 },
    { id: 15, title: "Snow", author: "Jon", age: 35 },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    row.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        label="Search by Title"
        variant="outlined"
        value={search}
        onChange={handleSearchChange}
        fullWidth
        sx={{ mb: 2 }}
      />

      <DataGrid
        rows={filteredRows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={CheckboxButton}
        sx={{ border: 0 }}
      />
    </Box>
  );
}
