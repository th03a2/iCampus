import React from "react";
import { rciCategory } from "../preference";

const Overview = ({ value, index, reference, handleValue }) => {
  const { lo, hi, unit } = reference;
  const colorValue = value || 0;
  return (
    <tr id="tr-mch">
      <th>{rciCategory[index]}</th>
      <td>
        <input
          type="number"
          id={index}
          name="rci"
          className="form-control cellCount"
          value={value}
          style={{
            color: colorValue < lo ? "blue" : colorValue > hi && "red",
          }}
          onChange={handleValue}
        />
      </td>
      <td>
        {lo}-{hi} {unit}
      </td>
    </tr>
  );
};

export default Overview;
