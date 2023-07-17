import React from "react";
import { MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import ResultCard from "./card";
import { useSelector } from "react-redux";

var Subcon = ({ activeIndex, setActiveIndex }) => {
  const { contract } = useSelector(({ sales }) => sales);

  return (
    <MDBContainer>
      {!!contract.length ? (
        contract.map((sale, index) => (
          <ResultCard
            key={`subcon-${sale._id}-key${index}`}
            sale={sale}
            index={index + 1}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        ))
      ) : (
        <MDBTypography note noteColor="info">
          <strong>No Tracking ID: </strong> Walang nagpapa-alalay pa.
        </MDBTypography>
      )}
    </MDBContainer>
  );
};

export default Subcon;
