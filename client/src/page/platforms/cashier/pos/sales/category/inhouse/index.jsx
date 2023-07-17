import React from "react";
import { MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import ResultCard from "./card";
import { useSelector } from "react-redux";

var Inhouse = ({ activeIndex, setActiveIndex }) => {
  const { inhouse } = useSelector(({ sales }) => sales);

  return (
    <MDBContainer>
      {inhouse.length > 0 ? (
        inhouse.map((sold, index) => (
          <ResultCard
            key={`${sold._id}-inhouse-${index}`}
            sold={sold}
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
};

export default Inhouse;
