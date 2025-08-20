import client from "./client";
import { ApiResponse } from "apisauce";

interface IMessagePayload {
  message: string;
  listingId: number;
}

const send = (
  message: string,
  listingId: number
): Promise<ApiResponse<unknown, unknown>> => {
  return client.post<unknown, IMessagePayload>("/messages", {
    message,
    listingId,
  });
};

export default {
  send,
};
