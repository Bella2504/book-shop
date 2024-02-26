import { Item } from "lib/resolvers-types";
import { IItem } from "lib/types";
import { action, computed, makeObservable, observable } from "mobx";
import { createContext } from "react";

class RootStore {
  cart = [];

  constructor() {
    makeObservable(this, {
      cart: observable,
      addToCart: action,
      removeItem: action,
      howManyTimesThisItemInCart: computed,
    });
  }

  addToCart(item: IItem) {
    console.log("item", item);
    this.cart = [...this.cart, item];
    console.log(this.cart);
  }

  removeItem(item: IItem) {
    this.cart = this.cart.filter((i) => i.id !== item.id);
  }

  get howManyTimesThisItemInCart(): (id: number) => number {
    return (id: number) => this.cart.filter((i) => i.id === id).length;
  }
}

export const rootStore = new RootStore();
export const RootContext = createContext(rootStore);
