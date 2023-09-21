const { createContext, useState, useEffect } = require("react");

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, [ls]);

  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId]);
  }
  function clearProduct() {
    localStorage.removeItem("cart");
  }

  function removeProduct(productId) {
    setCartProducts((prev) => {
      if (prev.length === 1) {
        localStorage.removeItem("cart");
        return [];
      }
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos);
      }

      return prev;
    });
  }

  return (
    <CartContext.Provider
      value={{ cartProducts, setCartProducts, addProduct, removeProduct, clearProduct }}
    >
      {children}
    </CartContext.Provider>
  );
}
