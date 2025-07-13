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
  TextField,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getMiningPools, getMiningPoolDetails } from "../api/miningPoolsApi";
import PoolDetailsModal from "./PoolDetailsModal";

const STATUS_COLORS = {
  online: "success",
  degraded: "warning",
  offline: "error",
};

/**
 * MiningPoolTable component displays a sortable and filterable table
 * of mining pools with basic statistics and a "Details" button to view
 * additional information in a modal.
 *
 * Features:
 * - Fetches mining pool data from the API.
 * - Supports sorting by column headers (e.g., hashrate, workers).
 * - Allows filtering by pool name via text input.
 * - Opens a modal with detailed pool info on "Details" button click.
 * - Handles loading and error states gracefully.
 *
 * @component
 * @returns {JS.Element} A responsive table of mining pool stats with interactive UI features.
 *
 * @example
 * <MiningPoolTable />
 */
const MiningPoolTable = () => {
  const [pools, setPools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedPool, setSelectedPool] = useState(null);
  const [details, setDetails] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [filterText, setFilterText] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const theme = useTheme();

  const headerStyles = {
    backgroundColor: theme.custom.tableHeaderBackground,
    color: theme.custom.tableHeaderText,
    fontWeight: 600,
  };

  const columns = [
    { label: "Name", key: "name", sortable: true },
    { label: "Hashrate (TH/s)", key: "hashrateTHs", sortable: true },
    { label: "Active Workers", key: "activeWorkers", sortable: true },
    {
      label: "Reject Rate",
      key: "rejectRate",
      sortable: true,
      render: (value) => `${(value * 100).toFixed(2)}%`,
    },
    {
      label: "Status",
      key: "status",
      sortable: false,
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
      sortable: false,
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

  const filteredAndSortedPools = [...pools]
    .filter((pool) =>
      pool.name.toLowerCase().includes(filterText.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortConfig.key) return 0;

      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

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
    <>
      <Box display="flex" justifyContent="flex-end" my={2}>
        <TextField
          fullWidth
          label="Search by Name"
          variant="outlined"
          size="small"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </Box>
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
                  {col.sortable ? (
                    <Tooltip title="Click to sort">
                      <span>
                        <TableSortLabel
                          active={sortConfig.key === col.key}
                          direction={sortConfig.direction}
                          onClick={() => {
                            const isAsc =
                              sortConfig.key === col.key &&
                              sortConfig.direction === "asc";
                            setSortConfig({
                              key: col.key,
                              direction: isAsc ? "desc" : "asc",
                            });
                          }}
                        >
                          {col.label}
                        </TableSortLabel>
                      </span>
                    </Tooltip>
                  ) : (
                    col.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedPools.map((pool) => (
              <TableRow key={pool.id}>
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    {col.render
                      ? col.render(pool[col.key], pool)
                      : pool[col.key]}
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
    </>
  );
};

export default MiningPoolTable;
