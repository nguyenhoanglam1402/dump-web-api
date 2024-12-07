export interface IProductData {
  name: string;
  feature: string[];
  description: string;
  price: number;
  pictureURL: string;
  amountInStore: number;
  categoryId: string;  // Assuming `categoryId` is a UUID
}

export interface ICategoryData {
  name: string;
  pictureURL: string;
}

export interface IUserData {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

export interface IOrderItem {
  productId: string;
  userId: string;
  quantity: number;
  price: number;
}

export interface IOrder {
  userId: string;
  totalPrice: number;
  status: string;
}