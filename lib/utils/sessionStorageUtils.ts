import { Item } from "lib/resolvers-types";

const CART = "cart";

export const addItem = (item: Item) => {
  const savedItems = sessionStorage.getItem(CART);
  const listOfItems = JSON.parse(savedItems);
};
