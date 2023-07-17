import React from "react";

const index = ({ month, setMonth }) => {
  return (
    <div>
      <select
        className="form-select form-control"
        value={month}
        onChange={(e) => setMonth(Number(e.target.value))}
      >
        <option value="">Month</option>
        <option value="1">January</option>
        <option value="2">Februay</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">Augost</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
    </div>
  );
};

export default index;
