import { useQuery, gql } from "@apollo/client";
import { Box, Tabs, Tab } from "@mui/material";
//import { graphql } from "graphql";
import Link from "next/link";
import { useRouter } from "next/router";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { observer } from "mobx-react";

const UserNameQuery = gql(/* GraphQL */ `
  query Viewer {
    viewer {
      id
      name
      status
    }
  }
`);

export default observer(function Header() {
  let location = useRouter();
  const data = useQuery(UserNameQuery);

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
});
