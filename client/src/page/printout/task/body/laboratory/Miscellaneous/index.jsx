import React from "react";
import { MDBContainer, MDBCol } from "mdb-react-ui-kit";
import { bodySwitcher } from "./bodySwitcher";
import Troupe from "./troupe";

const Index = () => {
  const { specimen, packages } = JSON.parse(
    localStorage.getItem(`task-printout`)
  );
  let FormBody = bodySwitcher(packages);

  return (
    <div
      style={{
        border: "solid 2px",
        marginBottom: "3%",
        minHeight: "300px",
      }}
    >
      <MDBContainer className="offset-1 mt-2">
        <span>Specimen : </span>
        <strong>
          <u>{String(specimen).toUpperCase()}</u>
        </strong>
      </MDBContainer>
      <FormBody />
      {!packages.includes(66) && (
        <>
          <hr />

          <MDBCol
            size="12"
            className="ml-5"
            style={{
              marginLeft: 20,
            }}
          >
            <Troupe />
          </MDBCol>
        </>
      )}
    </div>
  );
};

export default Index;
