import React from "react";
import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import Pt from "./Card/pt";
import Aptt from "./Card/aptt";

const index = () => {
  const deal = JSON.parse(localStorage.getItem(`task-printout`));
  return (
    <div
      style={{
        border: "solid 2px",
        marginBottom: "3%",
        minHeight: "280px",
      }}
    >
      <div className="mt-3">
        {deal.packages.length > 1 ? (
          <MDBRow>
            <MDBCol sn={6}>
              <Pt />
            </MDBCol>
            <MDBCol sn={6}>
              <Aptt />
            </MDBCol>
          </MDBRow>
        ) : deal.pt.length > 0 ? (
          <Pt />
        ) : (
          <Aptt />
        )}
      </div>
    </div>
  );
};

export default index;
