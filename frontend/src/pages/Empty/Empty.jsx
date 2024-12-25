import React, { useState } from "react";

const Empty = ({ message }) => {
  const [mess, setMessage] = useState("No data found...");

  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src="https://cdn-icons-png.freepik.com/256/11329/11329073.png?semt=ais_hybrid"
        width={150}
        height={250}
        className="mx-auto"
      />
      <h3>{message ? message : mess}</h3>
    </div>
  );
};

export default Empty;
