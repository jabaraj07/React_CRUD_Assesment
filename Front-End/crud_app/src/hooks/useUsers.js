import { useCallback, useRef, useState } from "react";
import api from "../api/api";
import { useEffect } from "react";

export const useUsers = ({ showSnackbar }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const snackbarRef = useRef(showSnackbar);

  useEffect(() => {
    snackbarRef.current = showSnackbar;
  }, [showSnackbar]);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getUsers();
      setUsers(data);
    } catch (error) {
      snackbarRef.current?.("Failed to load users", "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []); // ✅ no changing dependencies

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); // runs ONCE on mount

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.deleteUser(id);
        setUsers(users.filter((user) => user._id !== id));
        showSnackbar("User deleted successfully", "success");
      } catch (error) {
        showSnackbar("Failed to delete user", "error");
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleInputChange = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));

    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }
  };

  return {
    users,
    setUsers,
    loading,
    fetchUsers,
    handleDelete,
    handleInputChange,
    formData,
    setFormData,
    errors,
    setErrors,
  };
};
