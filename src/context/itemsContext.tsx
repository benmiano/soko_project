import React, {
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

// provider for shopping items
interface childrenProps {
  children: ReactNode;
}

export const ItemsContext = createContext([]);
export const ItemsProvider = ({ children }: childrenProps) => {
  const [shoppingItems, setShoppingItems] = useState([]);
  const hasFetchedData = useRef(false);

  // get shopping items query
  const requestBody = {
    query: `query{
              products {
                id
                title
                description
                image
                category
                price
              } 
              }`,
  };

  //   fetch shopping items
  useEffect(() => {
    async function getShopItems() {
      try {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/graphql`, {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((responseJson) => {
            setShoppingItems(responseJson.data.products);
            console.log("shopping items fetched successfully");
          });
      } catch (error) {
        console.log(error);
      }
    }
    if (hasFetchedData.current === false) {
      getShopItems();
      hasFetchedData.current = true;
    }
  }, []);

  // provider for items context
  return (
    <ItemsContext.Provider value={shoppingItems}>
      {children}
    </ItemsContext.Provider>
  );
};
