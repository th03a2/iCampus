import React, { useEffect } from "react";
import { MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import InhouseCard from "./card";
import { useSelector, useDispatch } from "react-redux";
import { BROWSE } from "../../../../../../../redux/slices/assets/persons/physician";

export default function Inhouse({ activeIndex, setActiveIndex }) {
  const { token, onDuty } = useSelector(({ auth }) => auth),
    { inhouse } = useSelector(({ sales }) => sales),
    dispatch = useDispatch();

  useEffect(() => {
    onDuty._id &&
      dispatch(BROWSE({ data: { branch: onDuty._id, key: "" }, token }));
  }, [onDuty, token]);

  return (
    <MDBContainer>
      {inhouse?.length > 0 ? (
        inhouse.map((sold, index) => (
          <InhouseCard
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
      {/* Modal here SendoutModal */}
    </MDBContainer>
  );
}
