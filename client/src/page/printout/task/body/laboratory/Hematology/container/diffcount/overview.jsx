import React from "react";
import { differentialCategory, preference } from "../preference";
const overview = ({ index, value }) => {
  const name = differentialCategory[index];
  const { lo, hi } = preference.differentials[name];

  const color = {
    color: value < lo ? "blue" : value > hi && "red",
    fontWeight: "bold",
  };

  const _value = value && value / 100;

  return (
    <tr key={`diff-${index}`}>
      <th className="py-0 px-2">{name}</th>
      <td className="py-0 px-2" style={color}>
        {value > 0 && _value.toFixed(2)}
      </td>
      <td className="py-0 px-2">
        {lo / 100} - {hi / 100}
      </td>
    </tr>
  );
};

export default overview;
