import "./App.css";

import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Alert,
  CircularProgress,
  Box,
  Typography,
  Snackbar,
} from "@mui/material";
import { useState } from "react";
import { userFormSchema, validateField } from "./schema/formSchema";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import api from "./api/api";
import { useUserSubmit } from "./hooks/useUserSubmit";
import { useDialog } from "./hooks/useDialog";
import { useUsers } from "./hooks/useUsers";

function App() {
  const [editingUser, setEditingUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const {
    users,
    setUsers,
    loading,
    handleDelete,
    handleInputChange,
    formData,
    setFormData,
    errors,
    setErrors,
  } = useUsers({ showSnackbar });

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    userFormSchema.forEach((field) => {
      const value = formData[field.name] || "";
      const error = validateField(field, value);
      if (error) {
        newErrors[field.name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const { handleOpenDialog, handleCloseDialog } = useDialog({
    setEditingUser,
    setFormData,
    setOpenDialog,
    setErrors,
    userFormSchema,
  });

  const handleSubmit = useUserSubmit(
    editingUser,
    formData,
    setUsers,
    showSnackbar,
    api,
    setSubmitting,
    handleCloseDialog,
    validateForm,
    showSnackbar,
  );

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (loading) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress />
        </Box>
      );
  }
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        flexDirection={{ xs: "column", sm: "row" }} // vertical on small, horizontal on larger
        gap={1} // spacing when stacked
      >
        <Typography variant="h4" fontWeight={600}>
          User Management
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{
            textTransform: "none",
            px: 3,
            py: 1,
            borderRadius: 2,
            width: { xs: "100%", sm: "auto" }, // full width on small screens
          }}
        >
          Add User
        </Button>
      </Box>

      {users.length === 0 ? (
        <Alert severity="info">
          No users found. Click "Add User" to create one.
        </Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {userFormSchema.map((field) => (
                  <TableCell key={field.name}>
                    <strong>{field.label}</strong>
                  </TableCell>
                ))}
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => {
                return (
                  <TableRow key={user._id} hover>
                    {userFormSchema.map((field, index) => (
                      <TableCell key={`${user._id}-${field.name}-${index}`}>
                        {user[field.name] || "-"}
                      </TableCell>
                    ))}
                    <TableCell align="left">
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1 /* spacing between buttons */,
                        }}
                      >
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenDialog(user)}
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(user._id)}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            {userFormSchema.map((field) => (
              <TextField
                key={field.name}
                label={field.label}
                type={field.type}
                value={formData[field.name] || ""}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                error={!!errors[field.name]}
                helperText={errors[field.name] || ""}
                required={field.required}
                fullWidth
                placeholder={field.placeholder}
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={submitting}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={submitting}
          >
            {submitting ? (
              <CircularProgress size={24} />
            ) : editingUser ? (
              "Update"
            ) : (
              "Create"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
