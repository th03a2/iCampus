import React, { useState, useEffect } from "react";
import {
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBTypography,
  MDBBtn,
  MDBCardGroup,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import Body from "./card";
import { forms } from "../../../../assets/references";

export function Cluster({ service, index, activeIndex, setActiveIndex, page }) {
  const { catalogs } = useSelector(({ preferences }) => preferences),
    { preference, name, template, abbreviation, id } = service,
    [references, setReferences] = useState([]);
  const toggleShow = () => setActiveIndex(activeIndex === index ? 0 : index);
  useEffect(() => {
    if (catalogs.length) {
      const _references = catalogs.filter(
        ({ serviceId }) => serviceId === service.id
      );
      setReferences(_references);
    }
  }, [service, catalogs]);

  return (
    <MDBTypography note className="text-dark mb-2">
      <MDBContainer className="d-flex align-items-center justify-content-between">
        <span>
          <strong>{(page - 1) * 6 + index}.</strong>
          <span className="ms-2 me-3">
            {name}|{abbreviation} -
            <span style={{ color: "blue" }}>{forms[template]}</span>
          </span>
        </span>
        {preference && (
          <MDBCardGroup>
            <span>
              Preference:{" "}
              <span
                style={{
                  color: "blue",
                }}
              >
                {preference}
              </span>
            </span>
            <MDBBtn onClick={toggleShow} size="sm" className="shadow-0 ms-3">
              <MDBIcon
                icon={`caret-${index === activeIndex ? "down" : "left"}`}
                color="white"
              />
            </MDBBtn>
          </MDBCardGroup>
        )}
      </MDBContainer>
      {preference && (
        <MDBCollapse show={index === activeIndex} className="px-4 mt-2">
          <Body
            references={references}
            preference={preference}
            serviceId={service.id}
          />
        </MDBCollapse>
      )}
    </MDBTypography>
  );
}
