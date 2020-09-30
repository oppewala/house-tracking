import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Property, Address, PropertyReference, PropertyConfiguration } from '../types';

export type NewPropertySliceState = {
  isAddressSet: boolean;
  property: Property;
};

const initialState: NewPropertySliceState = {
  isAddressSet: false,
  property: {
    address: {
      placeId: '',
      street: '',
      suburb: '',
      postcode: '',
      state: '',
      point: {
        lat: 0,
        lng: 0,
      },
    },
    configuration: {
      bathrooms: 0,
      bedrooms: 0,
      parking: 0,
      hasExtraRooms: false,
    },
    price: '',
    /* rawscore: {
      bathrooms: 1,
      bedrooms: 1,
      kitchen: 1,
      livingarea: 1,
      localarea: 1,
      nbn: 1,
      outdoorarea: 1,
      publictransport: 1,
      quality: 1,
      safety: 1,
    }, */
    references: [],
    tags: [],
    notes: '',
  },
};

let nextRefId = 0;

const newPropertySlice = createSlice({
  name: 'newproperty',
  initialState: initialState,
  reducers: {
    setAddress(state, action: PayloadAction<Address>) {
      state.property.address = action.payload;
      state.isAddressSet = action.payload.placeId && action.payload.placeId.length ? true : false;
    },
    setPrice(state, action: PayloadAction<string>) {
      state.property.price = action.payload;
    },
    setPropertyConfiguration(state, action: PayloadAction<PropertyConfiguration>) {
      const conf = {
        ...state.property.configuration,
        ...action.payload,
      };

      console.log(conf);

      state.property.configuration = conf;
    },
    /*setScore(state, action: PayloadAction<RawScore>) {
      state.property.rawscore = action.payload;
    },*/
    setNotes(state, action: PayloadAction<string>) {
      state.property.notes = action.payload;
    },
    addTag(state, action: PayloadAction<string>) {
      state.property.tags.push(action.payload);
    },
    removeTag(state, action: PayloadAction<string>) {
      console.log('removing', action);
      state.property.tags = state.property.tags.filter((tag) => tag !== action.payload);
    },
    addReference: {
      reducer: (state, action: PayloadAction<string>) => {
        state.property.references.push({
          id: nextRefId,
          url: action.payload,
        });
        nextRefId++; // TODO: Should be in a Thunk
      },
      prepare: () => {
        return {
          payload: '',
        };
      },
    },
    removeReference(state, action: PayloadAction<number>) {
      state.property.references = state.property.references.filter(
        (ref) => ref.id !== action.payload,
      );
    },
    updateReference: {
      reducer: (state, action: PayloadAction<PropertyReference>) => {
        const referenceIndex = state.property.references.findIndex(
          (r) => r.id === action.payload.id,
        );

        state.property.references[referenceIndex] = action.payload;
      },
      prepare: (id: number, reference: string) => {
        return {
          payload: {
            id,
            url: reference,
          },
        };
      },
    },
    //updateReference(state, action: PayloadAction<PropertyReference>) {
    //},
  },
});

export const {
  setAddress,
  addTag,
  removeTag,
  addReference,
  removeReference,
  updateReference,
  setPrice,
  //setScore,
  setPropertyConfiguration,
  setNotes,
} = newPropertySlice.actions;

export default newPropertySlice.reducer;
