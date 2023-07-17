import React from "react";
import { MDBBadge } from "mdb-react-ui-kit";

export function Package({ pack, value }) {
  const bodySwitcher = (key) => {
    switch (key) {
      case "btl":
        return (
          <>
            <span>
              {value.v}
              {value.u}x{value.q}
            </span>
          </>
        );
      case "pack":
        return (
          <>
            <span>
              {value.u}
              {value.q}
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
