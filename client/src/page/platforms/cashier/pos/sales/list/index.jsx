import React from "react";
import { MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import ResultCard from "./card";

export default function POS({ sales, activeIndex, setActiveIndex }) {
  return (
    <MDBContainer>
      {sales.length > 0 ? (
        sales.map((sale, index) => (
          <ResultCard
            key={`${sale._id}-sales`}
            sale={sale}
            index={index + 1}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        ))
      ) : (
        <MDBTypography note noteColor="info">
          <strong>No Inhouse: </strong> Havent made a transaction yet.
        </MDBTypography>
      )}
    </MDBContainer>
  );
}
