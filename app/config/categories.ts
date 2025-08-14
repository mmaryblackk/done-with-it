import { ComponentProps } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export interface ICategory {
  id: number;
  label: string;
  icon: ComponentProps<typeof MaterialCommunityIcons>["name"];
  backgroundColor: string;
}
export const categories: ICategory[] = [
  { id: 1, label: "Furniture", icon: "floor-lamp", backgroundColor: "#fc5c65" },
  { id: 2, label: "Cars", icon: "car", backgroundColor: "#fd9644" },
  { id: 3, label: "Cameras", icon: "camera", backgroundColor: "#fed330" },
  { id: 4, label: "Games", icon: "cards", backgroundColor: "#26de81" },
  { id: 5, label: "Clothing", icon: "shoe-heel", backgroundColor: "#2bcbba" },
  { id: 6, label: "Sports", icon: "basketball", backgroundColor: "#45aaf2" },
  {
    id: 7,
    label: "Movies & Music",
    icon: "headphones",
    backgroundColor: "#4b7bec",
  },
  {
    id: 8,
    label: "Books",
    icon: "book-open-blank-variant",
    backgroundColor: "#a04ef9",
  },
  {
    id: 9,
    label: "Other",
    icon: "help-box",
    backgroundColor: "#7b8698",
  },
];
