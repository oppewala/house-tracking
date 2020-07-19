import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import Popper from '@material-ui/core/Popper';
import clsx from 'clsx';

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  dropdown: {
    '& ul:last-child:after': {
      display: 'block',
      content: '""',
      background: `url('/google_attribution.png') top right ${theme.spacing() / 2}px no-repeat`,
      width: '100%',
      height: `18px`,
      marginTop: `${theme.spacing() / 2}px`,
    },
  },
}));

export default function GoogleAutocomplete(props) {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [suggestions, setSuggestions] = React.useState([]);
  const loaded = React.useRef(false);

  const { selectionHandler } = props;

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=
          ${process.env.REACT_APP_GOOGLE_APIKEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps',
      );
    }

    loaded.current = true;
  }

  const fetchSuggestions = React.useMemo(
    () =>
      throttle((request, callback) => {
        const autocompletionRequest = {
          ...request,
          componentRestrictions: {
            country: 'au',
          },
          types: ['address'],
        };
        autocompleteService.current.getPlacePredictions(autocompletionRequest, callback);
      }, 200),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setSuggestions(selectedValue ? [selectedValue] : []);
      return undefined;
    }

    fetchSuggestions({ input: inputValue }, (results) => {
      if (active) {
        let newSuggestions = [];

        if (selectedValue) {
          newSuggestions = [selectedValue];
        }

        if (results) {
          newSuggestions = [...newSuggestions, ...results];
        }

        setSuggestions(newSuggestions);
      }
    });

    return () => {
      active = false;
    };
  }, [selectedValue, inputValue, fetchSuggestions]);

  // eslint-disable-next-line no-unused-vars
  const selectSuggestion = (suggestion) => {
    selectionHandler(suggestion.place_id);
  };

  const Dropdown = (p) => {
    return (
      <Popper
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...p}
        id="property-lookup-dropdown"
        /* eslint-disable-next-line react/destructuring-assignment */
        className={clsx(p.className, classes.dropdown)}
      />
    );
  };

  return (
    <Autocomplete
      debug
      id="property-lookup"
      fullWidth
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
      filterOptions={(x) => x}
      options={suggestions}
      autoComplete
      autoSelect
      autoHighlight
      includeInputInList
      filterSelectedOptions
      value={selectedValue}
      noOptionsText="Address not found"
      onChange={(event, newValue) => {
        selectSuggestion(newValue);
        setSuggestions(newValue ? [newValue, ...suggestions] : suggestions);
        setSelectedValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <TextField {...params} label="Add a location" variant="outlined" fullWidth />
      )}
      PopperComponent={Dropdown}
      renderOption={(option) => {
        const matches = option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length]),
        );

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                  {part.text}
                </span>
              ))}

              <Typography variant="body2" color="textSecondary">
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}
