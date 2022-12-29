import { MenuItem, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const CenteredItem = (props) => {
  return (
    <Paper
      sx={{
        width: "60%",
        height: props.height || "90%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "2%",
        alignItems: "center",
        textAlign: "center",
        color: "#b61c4a",
        ...props.style,
      }}
    >
      {props.children}
    </Paper>
  );
};

export default CenteredItem;
