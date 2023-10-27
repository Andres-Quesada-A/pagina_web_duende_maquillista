import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ShoppingCartContext = createContext({});

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}
export function ShoppingCartProvider({ children }) {
  const [cartItems, setCartItems] = useLocalStorage("shopping-cart", []);

  const cartQuantity = cartItems.reduce(
    (amount, item) => item.amount + amount,
    0
  );

  function calculateShippingFee(weight, price) {
    const baseFee = 2000;
    const weightThreshold = 10;
    const priceThreshold = 200;

    let shippingFee = baseFee;

    shippingFee += Math.max(weight - weightThreshold, 0) * 0.5;
    shippingFee += Math.max(price - priceThreshold, 0) * 0.1;

    return shippingFee;
  }

  function getItemQuantity(id) {
    return cartItems.find((item) => item.id == id)?.amount || 0;
  }
  function AddProductCar(product) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === product.id) == null) {
        return [...currItems, { ...product, amount: product.amount }];
      } else {
        return currItems.map((item) => {
          if (item.id === product.id) {
            return { ...item, amount: product.amount };
          } else {
            return item;
          }
        });
      }
    });
  }
  function increaseProductCart(id) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, amount: item.amount + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeFromCart(id) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id != id);
    });
  }
  function removeCart() {
    setCartItems([]);
  }
  function getCartItems() {
    const items = cartItems.map((item) => {
      return { id: item.id, amount: item.amount };
    });
    return items;
  }

  function getFee() {
    const totalPrices = cartItems.reduce(
      (total, product) => total + product.amount * product.price,
      0
    );
    const totalWeights = cartItems.reduce(
      (total, product) => total + product.amount * product.weight,
      0
    );
    const fee = calculateShippingFee(totalWeights, totalPrices)
    return fee
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        removeFromCart,
        cartItems,
        AddProductCar,
        cartQuantity,
        increaseProductCart,
        removeCart,
        getCartItems,
        getFee
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
