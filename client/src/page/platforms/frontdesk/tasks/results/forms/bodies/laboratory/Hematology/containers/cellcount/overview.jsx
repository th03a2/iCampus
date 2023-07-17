import React from "react";
import { cellTitle } from "../preference";
import { Markup } from "interweave"; // npm install interweave react

const overview = ({ index, value, reference, handleCells }) => {
  const { lo, hi, unit } = reference;
  // const _result =
  //   value && index != 0
  //     ? value <= 10
  //       ? value.toFixed(2)
  //       : value.toFixed(0)
  //     : null;
  return (
    <tr key={`cells-${index}`}>
      <th>{cellTitle[index]}</th>
      <td>
        <input
          type="number"
          id={index}
          className="form-control cellCount"
          value={value}
          style={{
            color: value ? (value < lo ? "red" : value > hi && "red") : "",
            width: "80px",
          }}
          onChange={handleCells}
        />
      </td>
      <td>
        {lo} - {hi} <Markup content={unit} />
      </td>
    </tr>
  );
};

export default overview;
