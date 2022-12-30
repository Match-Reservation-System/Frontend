import "./LazyLoading.css";
import path from "path";

export const LazyLoading = ({ loadingPath }) => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={loadingPath || "src/assets/football.svg"}
        alt=""
        width="100px"
        height="100px"
        className="loading"
      />
    </div>
  );
};
