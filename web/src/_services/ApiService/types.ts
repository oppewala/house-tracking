export type Property = {
  ID?: string;
  Address: Address;
  Location: Location;
  Price: string;
  Layout: PropertyConfiguration;
  //RawScore?: PropertyScore;
  References: PropertyReference[];
  Tags: string[];
};

export type Address = {
  Street: string;
  Suburb: string;
  Postcode: string;
  State: string;
};

export type Location = {
  Latitude: number;
  Longitude: number;
  PlaceID: string;
};

export type PropertyScore = {
  Quality: number;
  Safety: number;
  OutdoorArea: number;
  Bedrooms: number;
  Kitchen: number;
  PublicTransport: number;
  LivingArea: number;
  Bathrooms: number;
  LocalArea: number;
};

export type PropertyConfiguration = {
  Bedrooms: number;
  Bathrooms: number;
  Parking: number;
  ExtraRooms: boolean;
  Nbn: Nbn;
};

export type PropertyReference = {
  Type: string;
  Value: string;
};

export type ExistingProperty = Property & {
  ID: string;
};

export enum Nbn {
  FTTP = 'FTTP',
  FTTN = 'FTTN',
  FTTC = 'FTTC',
  FTTB = 'FTTB',
  HFC = 'HFC',
  Unknown = 'Unknown',
}
