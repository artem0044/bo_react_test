import "./index.sass";
export const PreviewLoader = ({ loading }) => {
  return (
    <>
      <div className={`previewLoader ${loading ? "" : "hidden"}`}>
        <div>
          <svg
            width="153"
            height="153"
            viewBox="0 0 153 153"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="previewLoader__loader"
          >
            <circle
              cx="76.5"
              cy="76.5"
              r="75.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="35 35"
            />
          </svg>
          <p className="previewLoader__text">
            Loading<span className="dots">...</span>
          </p>
        </div>
      </div>
    </>
  );
};
