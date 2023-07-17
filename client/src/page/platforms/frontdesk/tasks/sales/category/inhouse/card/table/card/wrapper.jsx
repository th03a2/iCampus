import React from "react";
import { currencyFormatter } from "../../../../../../../../../../components/utilities";
import { Services } from "../../../../../../../../../../fakeDb";

export default function Wrapper({ inhouse, packages }) {
  return (
    <p className="mb-1">
      {Services.whereIn(packages).map(service => (
        <span style={{ color: inhouse.includes(service.id) ? "black" : "red" }}>
          {service.abbreviation || service.name},{" "}
        </span>
      ))}
    </p>
  );
}
