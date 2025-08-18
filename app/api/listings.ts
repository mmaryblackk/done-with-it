import { ApiResponse } from "apisauce";
import client from "./client";

import { IListingEditFormValues } from "../screens/ListingEditScreen";
import { IErrorResponse, IListing } from "../types/interfaces";

const ENDPOINT = "/listings";

const getListings = (): Promise<ApiResponse<IListing[], IErrorResponse>> =>
  client.get(ENDPOINT);

const addListing = async (
  listing: IListingEditFormValues & { latitude?: number; longitude?: number }
) => {
  const data = new FormData();

  data.append("title", listing.title);
  data.append("price", listing.price.toString());
  data.append("categoryId", listing.categoryId.toString());

  if (listing.description) data.append("description", listing.description);

  if (listing.latitude) data.append("latitude", listing.latitude.toString());
  if (listing.longitude) data.append("longitude", listing.longitude.toString());

  listing.images.forEach((img, i) => {
    data.append("images", {
      uri: img.url,
      name: `image${i}.jpg`,
      type: "image/jpeg",
    } as any);
  });

  return client.post("/listings", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export default {
  getListings,
  addListing,
};
