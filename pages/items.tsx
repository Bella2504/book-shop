import Link from "next/link";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useAxios } from "lib/hooks/useAxios";
import { gql, useQuery } from "@apollo/client";
import { Box, CircularProgress, Grid, Pagination } from "@mui/material";

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
  const [page, setPage] = useState(0);
  const { data, loading } = useQuery(ItemsQuery, {
    variables: {
      limit: 40,
      start: page,
    },
  });

  const gridData = useMemo(
    () =>
      !loading
        ? data?.items?.items?.map(({ thumbnailUrl, id, title }) => (
            <Box key={id} className="flex flex-col max-w-28 p-4">
              <img src={thumbnailUrl} alt={title} className="page-image"></img>
              <span className="picture-title text-sm">{title}</span>
            </Box>
          ))
        : undefined,
    [loading]
  );

  if (loading) {
    return <CircularProgress color="secondary" />;
  }

  return (
    <div className="flex flex-col justify-between align-center">
      <Grid
        className="grid max-w-full ml-0 pb-10 justify-items-center"
        justifyContent="start"
        container
        rowSpacing={1}
        gridTemplateColumns="repeat(auto-fill, minmax(100px, 1fr))"
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
