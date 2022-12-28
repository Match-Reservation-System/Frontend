import { Select } from "@mui/material";
import { styled } from "@mui/material/styles";

function CustomSelect(props) {
  const CustomSelectComp = styled(Select)(({ theme }) => ({
    width: "50%",
    marginTop: "2%",
    marginBottom: "2%",
    // label Color set to black
  }));
  return (
    <CustomSelectComp defaultValue={props.defaultValue}>
      {props.children}
    </CustomSelectComp>
  );
}

export default CustomSelect;
