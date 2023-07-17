import { Markup } from "interweave";
import React from "react";
import { cellTitle, preference, cellAbbr } from "../preference";

const index = ({ index, value, gender }) => {
  const reference = preference[gender];

  const { lo, hi, unit } = reference[cellAbbr[index]];
  const _lo = lo <= 2 ? lo.toFixed(2) : lo < 10 ? lo.toFixed(1) : lo;
  const _hi = hi <= 2 ? hi.toFixed(2) : hi < 10 ? hi.toFixed(1) : hi;
  const _value = value
    ? value < 20
      ? value.toFixed(2)
      : value.toFixed(0)
    : null;
  const color = {
    color: value < lo ? "blue" : value > hi && "red",
    fontWeight: "bold",
  };

  return (
    <>
      <tr key={`tr-${index}`}>
        <td className="py-0 px-2">{cellTitle[index]}</td>
        <td style={color} className="py-0 px-2">
          {_value}
        </td>
        <td className="py-0 px-2">
          {_lo} - {_hi} <Markup content={unit} />
        </td>
      </tr>
    </>
  );
};

export default index;
