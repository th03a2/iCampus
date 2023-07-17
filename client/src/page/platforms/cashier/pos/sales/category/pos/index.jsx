import React, { useEffect } from "react";
import { MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import ResultCard from "./card";
import { useSelector, useDispatch } from "react-redux";
import { LIST } from "./../../../../../../../redux/slices/assets/persons/physician";

var Pos = ({ activeIndex, setActiveIndex }) => {
  const { token, onDuty } = useSelector(({ auth }) => auth),
    { pos } = useSelector(({ sales }) => sales),
    dispatch = useDispatch();
  useEffect(() => {
    onDuty?._id && dispatch(LIST({ data: { branch: onDuty._id }, token }));
  }, [onDuty, token]);

  return (
    <MDBContainer>
      {!!pos.length ? (
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
};

export default Pos;
