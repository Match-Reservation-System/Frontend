import "./LazyLoading.css";

export const LazyLoading = () => {
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
        src="src\assets\football.svg"
        alt="loading"
        width="100px"
        height="100px"
        className="loading"
      />
    </div>
  );
};
