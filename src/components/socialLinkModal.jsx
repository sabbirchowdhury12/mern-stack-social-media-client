/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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

const SocialLinkModal = ({ open, onClose, socialLinks, onUpdate }) => {
  const [links, setLinks] = useState(socialLinks);
  const { palette } = useTheme();

  useEffect(() => {
    setLinks(socialLinks);
  }, [socialLinks]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLinks((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdate(links);
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
            Update Social Links
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Facebook"
            name="facebook"
            value={links?.facebook || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Twitter"
            name="twitter"
            value={links?.twitter || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="LinkedIn"
            name="linkedin"
            value={links?.linkedin || ""}
            onChange={handleChange}
            fullWidth
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
            Update
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default SocialLinkModal;
