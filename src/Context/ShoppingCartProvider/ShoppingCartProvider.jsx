import React, { useEffect, useMemo } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useGetProducts } from "./../../@Firebase/Hooks/Products/useGetProducts/useGetProducts";
const ShoppingCartContext = createContext();
class ShoppingCartItem {
  constructor({ productId, sizesRequested, providedText = "لا نص مرفق" }) {
    const sizes = sizesRequested.map((sizeRequested) => {
      return {
        quantity: 1,
        ...sizeRequested,
      };
    });
    this.sizesRequested = sizes;
    this.id = productId;
    this.providedText = providedText;
    this.price =
      this.sizesRequested.length > 0
        ? this.sizesRequested.reduce((acc, current) => {
            return acc + Number(current.price) * Number(current.quantity);
          }, 0)
        : 0;
  }
}
export const ShoppingCartProvider = ({ children }) => {
  const [shoppingCart, setShoppingCart] = useState(() => {
    const data = localStorage.getItem("shopping-cart");
    return data ? JSON.parse(data) : [];
  });
  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(shoppingCart));
  }, [JSON.stringify(shoppingCart)]);
  const GetItemInShoppingCart = ({ productId }) => {
    return shoppingCart.find((item) => {
      return item.id === productId;
    });
  };
  const onAddProductToShoppingCart = ({
    productId,
    sizesRequested,
    providedText,
  }) => {
    if (!GetItemInShoppingCart({ productId })) {
      const newProduct = new ShoppingCartItem({
        productId,
        sizesRequested,
        providedText,
      });
      setShoppingCart((prev) => {
        return [...prev, newProduct];
      });
    }
  };
  const onUpdateProductInShoppingCart = ({
    productId,
    sizeId,
    updateProcessOnQuantity,
    newSize, // Optionally pass a newSize object to add a new size
  }) => {
    setShoppingCart((prevCart) =>
      prevCart.map((product) => {
        if (product.id === productId) {
          const sizesRequested = product.sizesRequested
            .map((sizeRequested) => {
              if (sizeRequested.id === sizeId) {
                if (updateProcessOnQuantity === "delete") {
                  return undefined; // Mark for deletion
                } else if (updateProcessOnQuantity === "increament") {
                  return {
                    ...sizeRequested,
                    quantity: sizeRequested.quantity + 1,
                  };
                } else if (updateProcessOnQuantity === "decreament") {
                  if (sizeRequested.quantity === 1) {
                    return undefined; // Mark for deletion
                  }
                  return {
                    ...sizeRequested,
                    quantity: sizeRequested.quantity - 1,
                  };
                }
              }
              return sizeRequested;
            })
            .filter((size) => size !== undefined); // Filter out deleted sizes

          // If newSize is provided and sizeId doesn't exist, add the newSize
          if (!sizesRequested.some((size) => size.id === sizeId) && newSize) {
            sizesRequested.push({
              ...newSize,
              quantity: 1,
            });
          }

          const updatedProduct = new ShoppingCartItem({
            productId,
            sizesRequested,
          });
          return updatedProduct;
        }
        return product;
      })
    );
  };
  const onUpdateProductProvidedText = ({ productId, providedText }) => {
    setShoppingCart(
      shoppingCart.map((product) => {
        if (product.id === productId) {
          return { ...product, providedText };
        }
        return product;
      })
    );
  };
  const onDeleteItemFromShoppingCart = ({ productId }) => {
    setShoppingCart(
      shoppingCart.filter((product) => {
        return product.id !== productId;
      })
    );
  };
  const onDeleteAllShoppingCartItems = () => {
    setShoppingCart([]);
    localStorage.removeItem("shopping-cart");
  };
  const totalPrice =
    shoppingCart.length > 0
      ? shoppingCart.reduce((acc, curr_product) => {
          return acc + curr_product.price;
        }, 0)
      : 0;
  return (
    <ShoppingCartContext.Provider
      value={{
        shoppingCart,
        onAddProductToShoppingCart,
        onUpdateProductInShoppingCart,
        onDeleteItemFromShoppingCart,
        totalPrice,
        GetItemInShoppingCart,
        onUpdateProductProvidedText,
        onDeleteAllShoppingCartItems,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};
export const useShoppingCartItems = ({ size }) => {
  const { shoppingCart, GetItemInShoppingCart } = useShoppingCart();
  const { data, loading, error } = useGetProducts({
    whereQueries: [
      {
        field: "__name__",
        operator: "in",
        value:
          shoppingCart.length > 0 &&
          shoppingCart.map((product) => {
            return product.id;
          }),
      },
    ],
    orderByQueries: [{ field: "createdAt", direction: "desc" }],
    size,
  });
  const memoData = useMemo(() => {
    return data?.map((item) => {
      const shoppingCartProductData = GetItemInShoppingCart({
        productId: item.id,
      });

      return {
        ...item,
        ...shoppingCartProductData,
        orderPrice: shoppingCartProductData?.price,
      };
    });
  }, [JSON.stringify(data), JSON.stringify(shoppingCart)]);
  return {
    data: memoData,
    loading,
    error,
  };
};
