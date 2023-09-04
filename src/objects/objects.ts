export interface Item {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Item {
  quantity: number;
}

export interface ItemPurchased {
  itemId:number,
  quantity:number,
}

