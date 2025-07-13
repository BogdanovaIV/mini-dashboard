import { Container } from "@mui/material";
import React from "react";
import MiningPoolTable from "../components/MiningPoolTable";

function Home() {
  return (
    <Container sx={{ mt: 4 }}>
      <MiningPoolTable />
    </Container>
  );
}

export default Home;
