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

export interface Property {
  address: Address;
  configuration: PropertyConfiguration;
  price: string;
  notes: string;
  //rawscore: RawScore;
  references: PropertyReference[];
  tags: string[];
}

export interface PropertyConfiguration {
  bedrooms: number;
  bathrooms: number;
  parking: number;
  hasExtraRooms: boolean;
  nbn: string;
}

export interface PropertyReference {
  id: number;
  type?: string;
  value: string;
}

export interface RawScore {
  bathrooms: number;
  bedrooms: number;
  kitchen: number;
  livingarea: number;
  localarea: number;
  nbn: number;
  outdoorarea: number;
  publictransport: number;
  quality: number;
  safety: number;
}

export interface Tag {
  id: number;
  tag: string;
}

export enum Nbn {
  FTTP = 'FTTP',
  FTTN = 'FTTN',
  FTTC = 'FTTC',
  FTTB = 'FTTB',
  HFC = 'HFC',
  Unknown = 'Unknown',
}
