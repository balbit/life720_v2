import { userID, LocationInfo } from './types';

export interface CreateUserRequest {
  name: string;
}

export interface AddFriendRequest {
  userID: userID;
  friend: userID;
}

export interface SendLocationRequest {
  userID: userID;
  locationInfo: LocationInfo;
}

export interface GetFriendLocationsRequest {
  userID: userID;
}

export interface GetFriendLocationsResponse {
  locations: LocationInfo[];
}

export interface GetLocationRequest {
  userID: userID;
}

export interface GetLocationResponse {
  locationInfo: LocationInfo;
}

export interface ErrorResponse {
    message: string;
}