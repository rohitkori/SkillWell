import React from 'react'
import loading from './assets/loading.gif'

const Spinner = () => {
  return (
    <div style={{ display: "flex", margin: "auto", justifyContent: "center" }}>
      <img src={loading} alt="loading" style={{ width: "100px" }} />
    </div>
  );
}

export default Spinner