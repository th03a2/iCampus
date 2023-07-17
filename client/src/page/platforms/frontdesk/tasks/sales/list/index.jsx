import React from "react";
import { MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import ResultCard from "./card";
import { useSelector } from "react-redux";

export default function POS({ activeIndex, setActiveIndex }) {
  const { pos } = useSelector(({ sales }) => sales);

  return (
    <MDBContainer>
      {pos.length > 0 ? (
        pos.map((sale, index) => (
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
