import React, { useState } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

const Sort = (props) => {
  const [sortValue, setSortValue] = useState("");

  const handleChange = (event) => {
    setSortValue(event.target.value);
    props.setSortData(event.target.value);
  };

  return (
    <div>
      <FormControl className="form-control-sort">
        <InputLabel id="demo-simple-select-label">Sort any field</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortValue}
          onChange={handleChange}
        >
          <MenuItem value={"title"}>Title</MenuItem>
          <MenuItem value={"description"}>Description</MenuItem>
          <MenuItem value={"date"}>Date</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
export default Sort;
