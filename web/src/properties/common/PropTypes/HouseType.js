// @flow
import type { PropertyReference } from './PropertyReferenceType';
import type { RawScore } from './RawScoreType';
import type { Address } from './AddressType';

export type House = {
  address: Address,
  bathrooms: number,
  bedrooms: number,
  parking: number,
  price: string,
  rawScore: RawScore,
  references: PropertyReference[],
  tags: string[],
};
