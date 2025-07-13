// client/src/components/PoolDetailsModal.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/**
 * PoolDetailsModal displays mining pool details in a modal dialog.
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.open - Whether the modal is open.
 * @param {Function} props.onClose - Function to close the modal.
 * @param {Object|null} props.pool - The selected pool (basic info).
 * @param {Object|null} props.details - The detailed pool info.
 * @returns {JS.Element}
 */
const PoolDetailsModal = ({ open, onClose, pool, details }) => {
  const detailFields = [
    { label: "Location", key: "location" },
    { label: "Last 24h Revenue (BTC)", key: "last24hRevenueBTC" },
    { label: "Uptime %", key: "uptimePercent" },
    { label: "Fee %", key: "feePercent" },
  ];
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Pool Details: {pool?.name}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {details ? (
          <Box>
            {detailFields.map(({ label, key }) => (
              <DialogContentText key={key}>
                <strong>{label}:</strong> {details[key] ?? "N/A"}
              </DialogContentText>
            ))}
          </Box>
        ) : (
          <Box display="flex" justifyContent="center" my={3}>
            <Typography color="error">
              Failed to load detailed information for this pool.
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PoolDetailsModal;
