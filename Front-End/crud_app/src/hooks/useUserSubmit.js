export const useUserSubmit = (
  editingUser,
  formData,
  setUsers,
  showSnackbar,
  api,
  setSubmitting,
  handleCloseDialog,
  validateForm,
) => {
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      if (editingUser) {
        // Update existing user
        const updatedUser = await api.updateUser(editingUser._id, formData);
        setUsers((prev) =>
          prev.map((user) =>
            user._id === editingUser._id ? updatedUser : user,
          ),
        );
        showSnackbar("User updated successfully", "success");
      } else {
        // Create new user
        const newUser = await api.createUser(formData);
        setUsers((prev) => [...prev, newUser]);
        showSnackbar("User created successfully", "success");
      }
      handleCloseDialog();
    } catch (error) {
      let message = `Failed to ${editingUser ? "update" : "create"} user`;

      if (error.response) {
        const { status, data } = error.response;

        if (status === 409) {
          // backend duplicate error
          message = data?.message || "Duplicate email or phone number";
        } else if (status === 400) {
          message = data?.message || "Invalid input data";
        }
      }

      showSnackbar(message, "error");
      console.error("Error submitting form:", error);
    } finally {
      setSubmitting(false);
    }
  };
  return handleSubmit;
};
