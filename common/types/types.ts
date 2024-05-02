export type userID = string;

export interface Location {
  latitude: number;
  longitude: number;
}

export interface LocationInfo{
  location: Location;
  timestamp: number;
  accuracy: number | undefined;
}