import React, { useContext } from "react";
import { CartContext } from "../context/cartContext";
import { ItemsContext } from "../context/itemsContext";
import "../styles/shopItem.css";

// structure of items for sale
interface Item {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

//   display each item for sale
function ShopItem() {
  const shoppingItems = useContext(ItemsContext);
  const itemsForSale: Item[] = shoppingItems;
  const cartItems = useContext(CartContext);
  const { addToCart } = cartItems;

  // add item to add on button click
  function addItemToCart(itemToAdd: Item) {
    addToCart(itemToAdd);
  }

  return (
    <div className="items-container">
      {itemsForSale.map((itemForSale) => (
        // <div key={itemForSale.id} className="item-container">
        //   <div><p>{itemForSale.title}</p></div>
        //   <div>
        //     <img
        //       src={itemForSale.image}
        //       alt="item for sale"/>
        //   </div>
        //   <div>
        //     <p>{itemForSale.description}</p>
        //   </div>
        //   <div>
        //     <p>PRICE: {itemForSale.price}</p>
        //   </div>
        //   <div>
        //     <button name = "add" className="addButton" onClick={() => addItemToCart(itemForSale)}>ADD TO CART</button>
        //   </div>
        // </div>
        <div className="card" key={itemForSale.id}>
          <img src={itemForSale.image} alt={itemForSale.title} />
          <p className="title">{itemForSale.title}</p>
          <p className="price">${itemForSale.price}</p>
          <button onClick={() => addItemToCart(itemForSale)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default ShopItem;
