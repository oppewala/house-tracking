export interface Address {
  placeId: string;
  street: string;
  suburb: string;
  postcode: string;
  state: string;
  point: Point;
}

export interface Point {
  lat: number;
  lng: number;
}
