import { Box, Button, Modal, TextField } from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid white",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export const PaylistModal = ({
  name,
  description,
  setName,
  setDescription,
  editId,
  handleSubmit,
  open,
  handleClose,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <div>
        <Box
          sx={{ ...style, width: "20rem", paddingBlock: "20px" }}
          display="flex"
          gap="1rem"
          mb={2}
        >
          <Box display="grid" gap="1rem">
            <TextField
              sx={{ width: "20rem" }}
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button variant="contained" onClick={handleSubmit}>
              {editId ? "Update" : "Create"}
            </Button>
          </Box>
        </Box>
      </div>
    </Modal>
  );
};
