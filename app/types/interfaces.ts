import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ComponentProps } from "react";

export interface IListing {
  id: number;
  title: string;
  description?: string;
  images: {
    url: string;
    thumbnailUrl?: string;
  }[];
  price: number;
  categoryId: number;
  userId: number;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface ICategory {
  id: number;
  name: string;
  icon: ComponentProps<typeof MaterialCommunityIcons>["name"];
  backgroundColor: string;
  color: string;
}

export interface IUser {
  email: string;
  iat: number;
  name: string;
  userId: number;
}

export interface IUserInfo {
  email: string;
  name: string;
  password: string;
}

export interface IErrorResponse {
  error: string;
}

export interface ILocation {
  latitude: number;
  longitude: number;
}
