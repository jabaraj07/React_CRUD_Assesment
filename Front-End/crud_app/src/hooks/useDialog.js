export const useDialog =({setEditingUser, setFormData, setOpenDialog, setErrors, userFormSchema})=>{
     const handleOpenDialog = (user = null) => {
        if (user) {
          setEditingUser(user);
          const formValues = {};
          userFormSchema.forEach((field) => {
            formValues[field.name] = user[field.name];
          });
          setFormData(formValues);
        } else {
          setEditingUser(null);
          setFormData({});
        }
        setOpenDialog(true);
        setErrors({});
      };
    
      const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingUser(null);
        setFormData({});
        setErrors({});
      };
      return {handleOpenDialog,handleCloseDialog}
}