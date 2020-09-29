import { Address } from './Address';
import { RawScore } from './RawScore';
import { PropertyReference } from './PropertyReference';
import { PropertyConfiguration } from './PropertyConfiguration';

export interface Property {
  address: Address;
  configuration: PropertyConfiguration;
  price: string;
  notes: string;
  //rawscore: RawScore;
  references: PropertyReference[];
  tags: string[];
}
