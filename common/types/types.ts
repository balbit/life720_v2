export type userID = string;

export interface Location {
  latitude: number;
  longitude: number;
}

export interface LocationInfo {
  location: Location;
  timestamp: number;
  accuracy?: number | undefined;
}

export interface UserInfo {
  id: userID;
  name: string;
}

export interface FullUserInfo {
  user: UserInfo;
  friends: UserInfo[];
  location: LocationInfo;
}
