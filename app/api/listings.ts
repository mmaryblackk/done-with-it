import { ApiResponse } from "apisauce";
import client from "./client";

import { IErrorResponse, IListing } from "../types/interfaces";

const ENDPOINT = "/listings";

const getListings = (): Promise<ApiResponse<IListing[], IErrorResponse>> =>
  client.get(ENDPOINT);

const addListing = async (listing: IListing) => {
  const data = new FormData();

  data.append("title", listing.title);
  data.append("price", listing.price.toString());
  data.append("categoryId", listing.categoryId.toString());

  if (listing.description) data.append("description", listing.description);

  if (listing.location) {
    data.append("latitude", listing.location.latitude.toString());
    data.append("longitude", listing.location.longitude.toString());
  }

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
