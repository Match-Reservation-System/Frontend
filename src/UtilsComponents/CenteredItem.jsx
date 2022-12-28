import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

function CenteredItem(props) {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "#b61c4a",
  }));

  const CenterdItemGrid = styled(Item)(({ theme }) => ({
    width: "60%",
    height: props.height || "75%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }));
  return <CenterdItemGrid>{props.children}</CenterdItemGrid>;
}

export default CenteredItem;
