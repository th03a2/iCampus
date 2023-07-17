import React from "react";
import { MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import ResultCard from "./card";
import { useSelector } from "react-redux";

export default function Sendout({ activeIndex, setActiveIndex }) {
  const { sendout } = useSelector(({ sales }) => sales);

  return (
    <MDBContainer>
      {sendout.length > 0 ? (
        sendout.map((sale, index) => (
          <ResultCard
            key={`${sale._id}-sendout`}
            sale={sale}
            index={index + 1}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        ))
      ) : (
        <MDBTypography note noteColor="info">
          <strong>No Send-Out: </strong> All transaction don't need outsourcing.
        </MDBTypography>
      )}
    </MDBContainer>
  );
}
