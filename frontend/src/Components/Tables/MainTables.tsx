import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { TextField, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDeleteSpecificBookMutation } from "../../Pages/Books/bookApiSlice";
import AlertDialog from "../AlertDialogue/AlertDialogue";

export default function DataTable({
  deleteButton = false,
  editButton = false,
  CheckboxButton = false,
  rows: propRows,
  setSelectedRowIds = null,
  roleId = 2, // 👈 Default to member
  processRowUpdate,
}: {
  deleteButton: Boolean;
  editButton?: Boolean;
  CheckboxButton?: Boolean;
  rows: any[];
  columns?: any[];
  setSelectedRowIds?: any;
  roleId?: number; // 👈 Pass roleId here
  processRowUpdate: (newRow: any, oldRow: any) => void;
}) {
  const [search, setSearch] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [deleteSpecificBook, { isLoading }] = useDeleteSpecificBookMutation();

  const handleClickDelete = (id: number) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;
    try {
      await deleteSpecificBook({ ids: selectedId }).unwrap();
      setOpenDialog(false);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleEdit = (id: number) => {
    console.log(`Edit row with id: ${id}`);
  };

  // Handle row updates (if editable)
  // processRowUpdate is passed as a prop

  const baseColumns = [
    {
      field: "book_id",
      headerName: "Book ID",
      width: 100,
    },
    {
      field: "title",
      headerName: "Title",
      width: 400,
      editable: roleId === 1, // 👈 Editable only for admin
    },
    {
      field: "author",
      headerName: "Author",
      width: 300,
      editable: roleId === 1, // 👈 Editable only for admin
    },
    {
      field: "published_date",
      headerName: "Published Date",
      type: "string",
      width: 200,
    },
  ];

  const actionColumn =
    deleteButton || editButton
      ? {
          field: "actions",
          headerName: "Actions",
          width: 140,
          sortable: false,
          renderCell: (params: any) => (
            <>
              {editButton && (
                <IconButton
                  onClick={() => handleEdit(params.row.book_id)}
                  size="small"
                >
                  <EditIcon sx={{ color: "black" }} />
                </IconButton>
              )}
              {deleteButton && (
                <IconButton
                  onClick={() => handleClickDelete(params.row.book_id)}
                  size="small"
                >
                  <DeleteIcon sx={{ color: "black" }} />
                </IconButton>
              )}
            </>
          ),
        }
      : null;

  const Xcolumns = actionColumn ? [...baseColumns, actionColumn] : baseColumns;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredRows = propRows.filter((row) =>
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
        columns={Xcolumns}
        getRowId={(row) => row.book_id}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={CheckboxButton}
        processRowUpdate={processRowUpdate}
        sx={{ border: 0 }}
        disableRowSelectionOnClick
        onRowSelectionModelChange={(newSelection) => {
          let newArr = [];
          for (let nums of (newSelection as any).ids ?? []) {
            newArr.push(nums);
          }

          if (setSelectedRowIds) {
            setSelectedRowIds(newArr);
          }

          console.log("Selected book IDs:", newArr);
        }}
        experimentalFeatures={{ newEditingApi: true }}
        onProcessRowUpdateError={(error) => {
          console.error("Row update failed:", error);
        }}
      />

      <AlertDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        handleConfirm={handleConfirmDelete}
        isLoading={isLoading}
      />
    </Box>
  );
}
