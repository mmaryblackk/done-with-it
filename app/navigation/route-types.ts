import { IListing } from "../types/interfaces";

export type FeedStackParamList = {
  Listings: undefined;
  ListingDetails: { item: IListing };
};

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
};

export type AppTabParamList = {
  Feed: undefined;
  ListingEdit: undefined;
  Account: undefined;
};

export type AccountStackParamList = {
  Profile: undefined;
  Messages: undefined;
};
