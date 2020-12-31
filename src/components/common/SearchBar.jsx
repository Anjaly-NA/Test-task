import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const SearchBar = (props) => {
  const [value, setValue] = React.useState(null);
  const onTagsChange = (event, values) => {
    if (values) {
      props.setEventFromChildToParent(values.items.title);
    } else {
      props.setEventFromChildToParent("");
    }
    setValue(values);
  };
  const { events } = props;
  return (
    <>
      {events && (
        <Autocomplete
          id="country-select-demo"
          style={{ width: 200 }}
          options={events}
          value={value}
          onChange={onTagsChange}
          autoHighlight
          getOptionLabel={(option) => option.items.title}
          getOptionSelected={(option) => option.items.title}
          renderOption={(option) => (
            <React.Fragment>
              <span>
                <img
                  src={option.items.file}
                  className="img-suggestions"
                  alt="logo"
                />
              </span>
              {option.items.title}
            </React.Fragment>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose an event title"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
            />
          )}
        />
      )}
    </>
  );
};
export default SearchBar;
