import React, { FunctionComponent, useEffect } from 'react';
import { Grid, Hidden, Typography, Link, TextField, Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { TextInput } from 'components/TextInput';
import { AddressInput } from 'feature/Properties/components/AddressInput';
import Tags from './Tags';
import Map from './Map';
import PropertyDetails from './PropertyDetails';
import References from './References';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { Address, Nbn, PropertyReference } from '../types';
import { SubmitNewProperty } from '../../../_services/ApiService/houseApi';
import { Property } from '../../../_services/ApiService/types';

const useStyles = makeStyles((theme) => ({
  breadcrumb: {
    marginBottom: theme.spacing() * 3,
  },
  urlSelect: {
    width: '100%',
  },
}));

type FormInputs = {
  address: Address;
  references: PropertyReference[];
  tags: string[];
  bedrooms: number;
  bathrooms: number;
  parking: number;
  extrarooms: boolean;
  notes: string;
  price: string;
  nbn: Nbn;
};

export const NewProperty: FunctionComponent<NewPropertyProps> = (props) => {
  const { register, handleSubmit, getValues, setValue, clearErrors, errors, watch } = useForm<
    FormInputs
  >({
    defaultValues: {
      address: undefined,
      references: [],
      tags: [],
      nbn: Nbn.Unknown,
    },
  });

  const classes = useStyles();

  useEffect(() => {
    register({ name: 'address', type: 'custom' }, { required: 'Address is required' });
    register({ name: 'references', type: 'custom' });
    register({ name: 'tags', type: 'custom' });
  });

  const addressFieldChangeHandler = async (address) => {
    if (address || getValues('address') || errors.address) {
      clearErrors('address');
      setValue('address', address);
    }
  };

  const addReference = () => {
    const references = getValues('references');
    const reference: PropertyReference = {
      id: references.length + 1,
      value: '',
    };
    setValue('references', [...references, reference]);
  };
  const removeReference = (e) => {
    console.log('remove', e);
  };
  const updateReference = (id, url) => {
    const references = getValues('references');
    setValue(
      'references',
      references.map((r) =>
        r.id !== id
          ? r
          : {
              id,
              value: url,
            },
      ),
    );
  };

  const addTag = (tag) => {
    const tags = getValues('tags');
    setValue('tags', [...tags, tag]);
  };
  const removeTag = (tag) => {
    const tags = getValues('tags');
    setValue(
      'tags',
      tags.filter((t) => t !== tag),
    );
  };

  const onValid = async (data: FormInputs) => {
    console.log(data);

    const property: Property = {
      Address: {
        Postcode: data.address.postcode,
        State: data.address.state,
        Street: data.address.street,
        Suburb: data.address.suburb,
      },
      Location: {
        Latitude: data.address.point.lat,
        Longitude: data.address.point.lng,
        PlaceID: data.address.placeId,
      },
      Layout: {
        Bedrooms: Number(data.bedrooms),
        Bathrooms: Number(data.bathrooms),
        Parking: Number(data.parking),
        ExtraRooms: data.extrarooms,
        Nbn: data.nbn,
      },
      Price: data.price,
      References: data.references.map((r) => {
        return {
          Type: 'Unknown',
          Value: r.value,
        };
      }),
      Tags: data.tags,
    };
    const response = await SubmitNewProperty(property);

    console.log(response);
  };
  const onErrors = (e, er) => console.log(e, er);

  return (
    <div>
      <Typography variant="subtitle1" className={classes.breadcrumb}>
        <Link variant="button" color="textPrimary" component={RouterLink} to="/Properties">
          Properties
        </Link>{' '}
        / Add new property
      </Typography>
      <form onSubmit={handleSubmit(onValid, onErrors)}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <AddressInput changeHandler={addressFieldChangeHandler} error={errors.address} />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  desc="Price"
                  name="price"
                  inputRef={register({ required: true })}
                  error={!!errors?.price}
                />
              </Grid>
              <Grid item xs={12}>
                <PropertyDetails inputRef={register({ required: true })} errors={errors} />
              </Grid>
              <Tags tags={watch('tags')} addTag={addTag} removeTag={removeTag} />
              <References
                references={watch('references')}
                addReference={addReference}
                removeReference={removeReference}
                updateReference={updateReference}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container direction="column" spacing={5}>
              <Hidden smDown>
                <Map placeId={watch('address')?.placeId} />
              </Hidden>
              <Grid item xs={12}>
                <TextField
                  label="Notes"
                  name="notes"
                  multiline
                  variant="outlined"
                  fullWidth
                  rows={6}
                  inputRef={register}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <br />
        <Button type="submit" variant="text" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

type NewPropertyProps = {
  classes: any;
};

export default NewProperty;
