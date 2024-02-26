import { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import { Box, Tabs, Tab, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/removeCircle";
import Link from "next/link";
import { useRouter } from "next/router";
import { RootContext } from "lib/store/root";
import React from "react";
import { IItem } from "lib/types";
import { observer } from "mobx-react";

const useClasses = makeStyles((theme) => ({
  iconContainer: {
    "&:hover $icon": {
      opacity: 0.8,
    },
  },
}));

export default observer(function Item(item: IItem) {
  const { id, thumbnailUrl, title } = item;
  const store = useContext(RootContext);
  const numberOfItem = store.howManyTimesThisItemInCart(id);
  const isInCart = numberOfItem > 0;
  const onAdd = () => store.addToCart(item);
  const onRemove = () => store.removeItem(item);
  const classes = useClasses();

  return (
    <Box key={id} className="flex flex-col items-center p-4">
      <img src={thumbnailUrl} alt={title} className="max-w-28 max-h-28"></img>
      <span className="picture-title text-sm">{title}</span>
      <Box className="flex flex-row items-center">
        <IconButton
          onClick={onRemove}
          classes={{
            root: classes.iconContainer,
          }}
        >
          <RemoveCircleIcon color="secondary" />
        </IconButton>
        <span className="block text-sm w-4 text-center">{numberOfItem}</span>
        <IconButton
          onClick={onAdd}
          color="primary"
          classes={{
            root: classes.iconContainer,
          }}
        >
          <AddCircleIcon color="secondary" />
        </IconButton>
      </Box>
    </Box>
  );
});
