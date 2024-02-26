import { useQuery, gql } from "@apollo/client";
import { Box, Tabs, Tab } from "@mui/material";
//import { graphql } from "graphql";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Cart() {
  let location = useRouter();

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={location.pathname}
          aria-label="basic tabs example"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Home" value="/" href="/"></Tab>
          <Tab label="Items" value="/items" href="/items" />
          <Tab label="About" value="/about" href="/about" />
        </Tabs>
      </Box>
    </div>
  );
}
