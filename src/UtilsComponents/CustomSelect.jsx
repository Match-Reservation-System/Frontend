import { Select } from "@mui/material";
import { styled } from "@mui/material/styles";

function CustomSelect(props) {
  const { defaultValue, value, setValue } = props;

  return (
    <Select
      sx={{
        width: "60%",
        marginTop: "2%",
        marginBottom: "2%",
      }}
      defaultValue={defaultValue}
      value={value}
      onChange={(e) => {
        e.preventDefault();
        setValue(e.target.value);
      }}
    >
      {props.children}
    </Select>
  );
}

export default CustomSelect;
