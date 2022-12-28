import { Input, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

function CustomInput(props) {
  const { placeholder, value, setValue, type, error, helperText } = props;

  return (
    <TextField
      sx={{
        color: "black",
        width: "60%",
        marginTop: "2%",
        ":after": { borderBottomColor: "#b61c4a" },
        "& .MuiOutlinedInput-root": {
          fontSize: ".8rem",

          "& fieldset": {
            borderRadius: "0px",
          },

          "&:hover fieldset": {
            borderRadius: "0px",
          },
          "&.Mui-focused fieldset": {
            borderRadius: "0px",
            border: "1px solid #b61c4a !important",
          },
        },
      }}
      placeholder={placeholder}
      value={value}
      type={type || "text"}
      onChange={(e) => setValue(e.target.value)}
      error={error}
      helperText={helperText}
    />
  );
}

export default CustomInput;
