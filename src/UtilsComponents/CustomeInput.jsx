import { Input } from "@mui/material";
import { styled } from "@mui/material/styles";

function CustomInput(props) {
  const CustomInputComp = styled(Input)(({ theme }) => ({
    width: "50%",
    marginTop: "2%",
    ":after": { borderBottomColor: "#b61c4a" },
  }));
  return (
    <CustomInputComp placeholder={props.placeholder}>
      {props.children}
    </CustomInputComp>
  );
}

export default CustomInput;
