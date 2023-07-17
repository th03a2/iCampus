import React from "react";
import { formatToSIUnits, formatToSIValue } from "../../../../asset/references";

const overview = ({ deal, index }) => {
  const { service, result, units, lo, hi, warn, pvLo, pvHi } = deal;
  const color = {
    color: deal?.result < deal.lo ? "blue" : deal?.result > deal.hi && "red",
    fontWeight: "bold",
  };
  const _lo = lo <= 2 ? lo.toFixed(2) : lo < 10 ? lo.toFixed(1) : lo;
  const _hi = hi <= 2 ? hi.toFixed(2) : hi < 10 ? hi.toFixed(1) : hi;
  const name = service?.name;
  const reference = lo === 0 ? `< ${_hi}` : `${_lo} - ${_hi}`;
  const SIReference =
    lo === 0
      ? `< ${formatToSIValue(hi, name)}`
      : `${formatToSIValue(lo, name)} - ${formatToSIValue(hi, name)}`;
  const indicators = pvHi
    ? result >= pvHi
      ? "***"
      : pvLo
      ? result >= pvLo
        ? "**"
        : warn
        ? result >= warn
          ? "*"
          : null
        : null
      : null
    : null;

  const _result =
    result && (result < 15 ? Number.parseFloat(result).toFixed(2) : result);

  return (
    <tr key={`result - ${index}`}>
      <td>{++index}</td>
      <td>{service?.fullname}</td>
      <td style={color} className="text-center">
        {/* {indicators} */}
        {_result}
      </td>
      <td>{reference}</td>
      <td>{units}</td>
      <td style={color} className="text-center">
        {/* {indicators} */}
        {result && formatToSIValue(_result, name)}
      </td>
      <td>{SIReference}</td>
      <td>{formatToSIUnits(name)}</td>
    </tr>
  );
};

export default overview;
