import "./LazyLoading.css";
import path from "path";
import NavBar from "../UtilsComponents/NavBar";

export const LazyLoading = ({ loadingPath }) => {
  return (
    <>
      <NavBar />
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
          src={loadingPath || "football.svg"}
          alt=""
          width="100px"
          height="100px"
          className="loading"
        />
      </div>
    </>
  );
};
