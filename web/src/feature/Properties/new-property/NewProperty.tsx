import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  Grid,
  Hidden,
  Typography,
  Link,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { TextInput } from 'components/TextInput';
import { AddressInput } from 'feature/Properties/components/AddressInput';
import Tags from './Tags';
import Map from './Map';
import PropertyDetails from './PropertyDetails';
import References from './References';
import { useForm } from 'react-hook-form';
import makeStyles from '@mui/styles/makeStyles';
import { Address, Nbn, PropertyReference } from '../types';
import { SubmitNewProperty } from '../../../_services/ApiService/houseApi';
import { Property } from '../../../_services/ApiService/types';
import { Alert } from '@mui/material';

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

export const NewProperty: FunctionComponent = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    clearErrors,
    errors,
    watch,
    formState,
  } = useForm<FormInputs>({
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
    register({ name: 'extrarooms', type: 'boolean' }, { required: false });
  });

  const [failed, setFailed] = useState<string | undefined>();

  const history = useHistory();

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
      Notes: data.notes,
    };

    try {
      const response = await SubmitNewProperty(property);

      if (!response.ok) {
        const responseBody = await response.text();

        let errorMessage = `${response.statusText}`;
        if (responseBody) {
          errorMessage += `\r\nResponse Body: ${responseBody}`;
        }
        console.error(errorMessage);
      }

      const responseObj = await response.json();
      if (responseObj.Id) {
        history.push(`/Properties/${responseObj.Id}`);
      }
    } catch (e) {
      setFailed('Failed to submit new property');
      console.error('Failed to submit new property', e);
    }
  };
  const onErrors = (error, event) => console.error('Error during submit', error, event);

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
              <Hidden mdDown>
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
        {formState.isSubmitting ? (
          <CircularProgress />
        ) : (
          <Button type="submit" variant="text" color="primary">
            Submit
          </Button>
        )}
        <Snackbar open={failed !== undefined && failed !== ''}>
          <Alert severity="error">
            {failed}
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setFailed(undefined)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Alert>
        </Snackbar>
      </form>
    </div>
  );
};

export default NewProperty;
