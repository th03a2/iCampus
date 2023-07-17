import React from "react";
import { MDBTypography } from "mdb-react-ui-kit";

import { rciCategory, reference } from "../reference";
const overview = ({ value, index }) => {
  // const { service, result, units, lo, hi } = deal;
  // const color = {
  //   color: deal?.result < deal.lo ? "blue" : deal?.result > deal.hi && "red",
  //   fontWeight: "bold",
  // };
  const category = rciCategory[index];
  const lo = reference.rci[category].lo;
  const hi = reference.rci[category].hi;
  const unit = reference.rci[category].unit;

  const color = {
    color: value < lo ? "blue" : value > hi && "red",
    fontWeight: "bold",
  };

  return (
    <tr key={`rci-${index}`}>
      <td className="py-0 px-2">{category}</td>
      <td className="py-0 px-2" style={color}>
        <MDBTypography className="mb-0 font-weight-bold">{value}</MDBTypography>
      </td>
      <td className="py-0 px-2">
        {lo}-{hi} {unit}
      </td>
    </tr>
  );
};

export default overview;
