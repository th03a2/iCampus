import React from "react";

const overview = ({ index, value, service }) => {
  const { reference } = service;
  const color = {
    color: value < reference?.lo ? "blue" : value > reference?.hi && "red",
    fontWeight: "bold",
  };
  const _lo =
    reference?.lo <= 2
      ? reference?.lo.toFixed(2)
      : reference?.lo < 10
      ? reference?.lo.toFixed(1)
      : reference?.lo;
  const _hi =
    reference?.hi <= 2
      ? reference?.hi.toFixed(2)
      : reference?.hi < 10
      ? reference?.hi.toFixed(1)
      : reference?.hi;
  const references = reference?.lo === 0 ? `< ${_hi}` : `${_lo} - ${_hi}`;
  const indicators = reference?.pvHi
    ? value >= reference?.pvHi
      ? "***"
      : reference?.pvLo
      ? value >= reference?.pvLo
        ? "**"
        : reference?.warn
        ? value >= reference?.warn
          ? "*"
          : null
        : null
      : null
    : null;

  return (
    <tr className="text-center p-0" key={`result - ${index}`}>
      <td className="py-0 px-2">{index + 1}</td>
      <td className="py-0 px-2">{service?.name}</td>
      <td className="py-0 px-2" style={color}>
        {indicators} {value}
      </td>
      <td className="py-0 px-2">{references}</td>
      <td className="py-0 px-2">{reference?.units}</td>
    </tr>
  );
};

export default overview;
