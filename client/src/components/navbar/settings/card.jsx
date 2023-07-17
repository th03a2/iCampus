import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MDBCol, MDBContainer, MDBIcon } from "mdb-react-ui-kit";
import { ACTIVEPLATFORM } from "../../../redux/slices/assets/persons/auth";
import { useNavigate } from "react-router-dom";
import { BASE } from "../../utilities";

export default function PlatformCard({ portal, setVisibility, i }) {
  const { theme, onDuty, isCeo } = useSelector(({ auth }) => auth),
    navigate = useNavigate(),
    [isSame, setIsSame] = useState(false),
    dispatch = useDispatch();

  useEffect(() => {
    const givenRole = JSON.stringify(portal);
    const usedRole = JSON.stringify(onDuty);

    if (givenRole === usedRole) {
      setIsSame(true);
    } else {
      setIsSame(false);
    }
  }, [portal, onDuty]);

  const portalHandler = (platform) => {
    if (isCeo) {
      let _lastVisited = JSON.parse(localStorage.getItem("lastVisited"));
      _lastVisited.platform = platform;
      localStorage.setItem("lastVisited", JSON.stringify(_lastVisited));
    }
    dispatch(ACTIVEPLATFORM({ id: onDuty._id, platform }));

    navigate(`/${BASE}/${platform}/dashboard`);
    setVisibility(false);
  };

  return (
    <MDBCol
      className="custom-notification-container position-relative pb-4 mx-5"
      key={i}
    >
      <div
        onClick={() => portalHandler(portal.code)}
        className={`${!isSame && "cursor-pointer"}`}
      >
        <MDBIcon
          style={{
            backgroundColor: isSame ? "#54B4D3" : "#504d4d",
          }}
          icon={portal.icon}
          size="lg"
          className="custom-notification-icon"
        />
        <MDBContainer className="ms-5 p-0">
          <h6
            className={`h6 h6-responsive custom-notification-title fw-bold p-0 w-0 ${theme.text}`}
          >
            {portal.title}
          </h6>
          <p className={`custom-notification-label p-0 w-0 ${theme.text}`}>
            {portal.description}
          </p>
        </MDBContainer>
      </div>
    </MDBCol>
  );
}
