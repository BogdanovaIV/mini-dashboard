import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import MiningPoolTable from "./MiningPoolTable";
import * as api from "../api/miningPoolsApi";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "../theme/theme";

// Mock data
const mockPools = [
  {
    id: "pool-1",
    name: "Test Pool A",
    hashrateTHs: 500,
    activeWorkers: 800,
    rejectRate: 0.01,
    status: "online",
  },
  {
    id: "pool-2",
    name: "Test Pool B",
    hashrateTHs: 300,
    activeWorkers: 600,
    rejectRate: 0.02,
    status: "offline",
  },
];

jest.mock("../api/miningPoolsApi");

const renderWithTheme = (ui) => {
  return render(
    <ThemeProvider theme={getTheme("light")}>
      <CssBaseline />
      {ui}
    </ThemeProvider>
  );
};

describe("MiningPoolTable", () => {
  beforeEach(() => {
    api.getMiningPools.mockResolvedValue(mockPools);
    api.getMiningPoolDetails.mockResolvedValue({
      location: "Test Location",
      last24hRevenueBTC: 0.03,
      uptimePercent: 99.5,
      feePercent: 1.2,
    });
  });

  it("renders table headers correctly", async () => {
    renderWithTheme(<MiningPoolTable />);
    expect(await screen.findByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Hashrate (TH/s)")).toBeInTheDocument();
    expect(screen.getByText("Active Workers")).toBeInTheDocument();
    expect(screen.getByText("Reject Rate")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Details" })
    ).toBeInTheDocument();
  });

  it("renders pool rows and filters by name", async () => {
    renderWithTheme(<MiningPoolTable />);
    expect(await screen.findByText("Test Pool A")).toBeInTheDocument();

    // Apply filter
    fireEvent.change(screen.getByLabelText(/Search by Name/i), {
      target: { value: "B" },
    });

    await waitFor(() => {
      expect(screen.queryByText("Test Pool A")).not.toBeInTheDocument();
      expect(screen.getByText("Test Pool B")).toBeInTheDocument();
    });
  });

  it("opens modal with details when clicking Details", async () => {
    renderWithTheme(<MiningPoolTable />);
    const buttons = await screen.findAllByRole("button", { name: "Details" });
    fireEvent.click(buttons[0]);

    await waitFor(() => {
      expect(screen.getByText(/Pool Details:/)).toBeInTheDocument();
      expect(screen.getByText(/Test Location/)).toBeInTheDocument();
      expect(screen.getByText(/0.03/)).toBeInTheDocument();
      expect(screen.getByText(/99.5/)).toBeInTheDocument();
    });
  });
});
