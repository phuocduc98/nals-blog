export const BorderGrowSpinner = () => (
  <div className="vh-100 d-flex justify-content-center align-items-center">
    <div
      className="spinner-border"
      style={{ width: '3rem', height: '3rem' }}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
    <div
      className="spinner-grow"
      style={{ width: '3rem', height: '3rem' }}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export const GrowSpinner = () => (
  <div className="spinner-grow spinner-grow-sm" role="status">
    <span className="sr-only">Loading...</span>
  </div>
);
