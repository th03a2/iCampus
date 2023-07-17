import React from "react";
import { MDBBadge } from "mdb-react-ui-kit";

export function Packages({ pack, value }) {
  const bodySwitcher = (key) => {
    switch (key) {
      case "btl":
        return (
          <>
            <span>
              {value.v}
              {value.u} {value.q}
            </span>
          </>
        );
      case "pack":
        return (
          <>
            <span>
              {value.u}
              {value.q > 1 ? "pc/s" : "pc"}
            </span>
          </>
        );
      default:
        return <></>;
    }
  };
  return (
    <>
      <MDBBadge>{pack}</MDBBadge>
      {bodySwitcher(pack)}
      <br />
    </>
  );
}
