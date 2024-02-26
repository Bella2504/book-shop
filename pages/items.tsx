import Link from "next/link";
import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import { useAxios } from "lib/hooks/useAxios";
import { gql, useQuery } from "@apollo/client";
import { Box, CircularProgress, Grid, Pagination } from "@mui/material";
import Item from "lib/components/item";

const ItemsQuery = gql(/* GraphQL */ `
  query Item($limit: Int!, $start: Int!) {
    items(limit: $limit, start: $start) {
      items {
        id
        title
        thumbnailUrl
        url
      }
      pagesCount
    }
  }
`);

export default function Items() {
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery(ItemsQuery, {
    variables: {
      limit: 40,
      start: page,
    },
  });
  console.log(data);
  const gridData = useMemo(
    () =>
      !loading
        ? data?.items?.items?.map((item) => <Item {...item} />)
        : undefined,
    [loading, data]
  );

  if (loading) {
    return (
      <div className="flex w-full justify-center">
        <CircularProgress color="secondary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between align-center">
      <Grid
        className="grid max-w-full ml-0 pb-10 justify-items-center"
        justifyContent="start"
        container
        gridTemplateColumns="repeat(auto-fill, minmax(130px, 1fr))"
      >
        {gridData}
      </Grid>
      <Pagination
        count={data?.items?.pagesCount}
        page={page}
        color="primary"
        onChange={(_e, p) => setPage(p)}
      />
    </div>
  );
}
