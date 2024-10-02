/* eslint-disable react/prop-types */

import { Modal, Box, Typography, Button } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
};

const ConfirmationModal = ({ open, onClose, onConfirm }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2">
          Are you sure you want to delete this post?
        </Typography>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={onConfirm}>
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
