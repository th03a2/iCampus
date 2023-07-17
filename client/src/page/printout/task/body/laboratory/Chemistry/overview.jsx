import React from "react";
import {
  formatToSIUnits,
  formatToSIValue,
} from "../../../../../../assets/references";

const overview = ({ key, index, value, service }) => {
  const color = {
    color:
      value < service?.reference?.lo
        ? "blue"
        : value > service?.reference?.hi && "red",
    fontWeight: "bold",
  };

  const _lo =
    service?.reference?.lo <= 2
      ? service?.reference?.lo.toFixed(2)
      : service?.reference?.lo < 10
      ? service?.reference?.lo.toFixed(1)
      : service?.reference?.lo;
  const _hi =
    service?.reference?.hi <= 2
      ? service?.reference?.hi.toFixed(2)
      : service?.reference?.hi < 10
      ? service?.reference?.hi.toFixed(1)
      : service?.reference?.hi;
  const name = service?.name;
  const reference =
    service?.reference?.lo === 0 ? `< ${_hi}` : `${_lo} - ${_hi}`;
  const SIReference =
    service?.reference?.lo === 0
      ? `< ${formatToSIValue(service?.reference?.hi, name)}`
      : `${formatToSIValue(service?.reference?.lo, name)} - ${formatToSIValue(
          service?.reference?.hi,
          name
        )}`;
  const indicators = service?.reference?.pvHi
    ? value >= service?.reference?.pvHi
      ? "***"
      : service?.reference?.pvLo
      ? value >= service?.reference?.pvLo
        ? "**"
        : service?.reference?.warn
        ? value >= service?.reference?.warn
          ? "*"
          : null
        : null
      : null
    : null;

  const _value =
    value && (value < 15 ? Number.parseFloat(value).toFixed(2) : value);

  return (
    <tr key={key}>
      <td className="py-0 px-2">{++index}</td>
      <td className="text-start py-0 px-2">{service.name}</td>
      <td className="fw-bold p-0 text-end pe-3" style={color}>
        {indicators}
        {Number.isInteger(value) ? value : Number.parseFloat(value).toFixed(2)}
      </td>
      <td className="p-0 text-center">
        {reference} {service?.reference?.units}
      </td>
      <td style={color} className="fw-bold p-0 text-end pe-3">
        {indicators}
        {value && formatToSIValue(_value, name)}
      </td>
      <td className="p-0 text-center">
        {SIReference} {formatToSIUnits(name)}
      </td>
    </tr>
  );
};

export default overview;
