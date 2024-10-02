/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  TextField,
  Modal,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const EditProfileModal = ({ open, onClose, user, onUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    location: "",
    occupation: "",
  });
  const { palette } = useTheme();

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        occupation: user.occupation,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onUpdate(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" component="h2">
            Edit Profile
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            margin="normal"
          />
          <Button
            type="submit"
            sx={{
              m: "2rem 0",
              p: "1rem",
              backgroundColor: palette.primary.main,
              color: palette.background.alt,
              "&:hover": { color: palette.primary.main },
            }}
          >
            Save
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditProfileModal;
