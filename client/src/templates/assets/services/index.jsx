import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { Cluster } from "./cluster";
import { paginationHandler } from "../../../components/utilities";
import { useState } from "react";
import { Modal } from "./modal";

export function ServicesCollapsable({ services, page }) {
  const { maxPage } = useSelector(({ auth }) => auth),
    [activeIndex, setActiveIndex] = useState(0);

  return (
    <MDBContainer className="p-0">
      <MDBRow>
        <MDBCol size={12} className="transition-all">
          {services.length &&
            paginationHandler(services, page, maxPage).map((service, index) => (
              <Cluster
                key={`collapse-${service.id}`}
                service={service}
                page={page}
                index={index + 1}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            ))}
        </MDBCol>
      </MDBRow>
      <Modal />
    </MDBContainer>
  );
}
