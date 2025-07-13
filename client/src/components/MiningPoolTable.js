import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  Typography,
  Chip,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getMiningPools, getMiningPoolDetails } from "../api/miningPoolsApi";
import PoolDetailsModal from "./PoolDetailsModal";

const STATUS_COLORS = {
  online: "success",
  degraded: "warning",
  offline: "error",
};

const MiningPoolTable = () => {
  const [pools, setPools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedPool, setSelectedPool] = useState(null);
  const [details, setDetails] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const theme = useTheme();

  const headerStyles = {
    backgroundColor: theme.custom.tableHeaderBackground,
    color: theme.custom.tableHeaderText,
    fontWeight: 600,
  };

  const columns = [
    { label: "Name", key: "name" },
    { label: "Hashrate (TH/s)", key: "hashrateTHs" },
    { label: "Active Workers", key: "activeWorkers" },
    {
      label: "Reject Rate",
      key: "rejectRate",
      render: (value) => `${(value * 100).toFixed(2)}%`,
    },
    {
      label: "Status",
      key: "status",
      render: (value) => (
        <Chip
          label={value}
          color={STATUS_COLORS[value] || "default"}
          variant="outlined"
          size="small"
        />
      ),
    },
    {
      label: "Details",
      key: "details",
      render: (_, row) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleOpenDetails(row)}
        >
          Details
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const fetchPools = async () => {
      try {
        const data = await getMiningPools();
        setPools(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchPools();
  }, []);

  const handleOpenDetails = async (pool) => {
    setSelectedPool(pool);
    try {
      const detailData = await getMiningPoolDetails(pool.id);
      setDetails(detailData);
      setModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch pool details:", error);
    }
  };

  const handleCloseDetails = () => {
    setModalOpen(false);
    setDetails(null);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error">Failed to load data: {error}</Typography>
      </Box>
    );
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        marginTop: 2,
        marginBottom: 2,
        width: "100%",
        overflowX: "auto",
        maxHeight: `calc(100vh - 120px)`,
      }}
    >
      <Table
        stickyHeader
        sx={{
          width: "100%",
          tableLayout: "fixed",
        }}
      >
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.key} sx={headerStyles}>
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {pools.map((pool) => (
            <TableRow key={pool.id}>
              {columns.map((col) => (
                <TableCell key={col.key}>
                  {col.render ? col.render(pool[col.key], pool) : pool[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PoolDetailsModal
        open={modalOpen}
        onClose={handleCloseDetails}
        pool={selectedPool}
        details={details}
      />
    </TableContainer>
  );
};

export default MiningPoolTable;
