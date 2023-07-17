import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import { paginationHandler } from "../../../../components/utilities";
import { ENDPOINT } from "../../../../components/utilities";
import defaultImage from "../../../../assets/images/image.png";
import Modal from "./modal";
import { useSelector } from "react-redux";
import { Packages } from "./packages";

export function CRDitems({ items, page }) {
  const { maxPage } = useSelector(({ auth }) => auth),
    [visibility, setVisibility] = useState(false),
    [item, setItem] = useState(null);

  const handleBuy = (data) => {
    setVisibility(true);
    setItem(data);
  };

  return (
    <>
      <MDBContainer className="mt-4">
        <MDBRow>
          {items
            ? paginationHandler(items, page, maxPage).map((data, index) => (
                <MDBCol md={3} className="mb-4" key={`items-${index}`}>
                  <MDBCard>
                    <MDBCardImage
                      src={
                        data.isUpload
                          ? `${ENDPOINT}/public/products/${data.name}.png`
                          : defaultImage
                      }
                      className="mx-auto rounded img-max img-fluid mb-1  cursor-pointer"
                      position="top"
                      onClick={() => handleBuy(data)}
                    />
                    <MDBCardBody>
                      <MDBCardTitle>
                        {data.name ? data.name.toUpperCase() : data.name}
                        <br />
                        <span>{item?.subname}</span>
                      </MDBCardTitle>
                      <MDBCardText>
                        {data?.packages &&
                          Object.keys(data?.packages)?.map((item) => (
                            <Packages
                              key={`packages-${item}`}
                              pack={item}
                              value={data?.packages[item]}
                            />
                          ))}
                      </MDBCardText>
                      <MDBContainer className="d-flex justify-content-end p-0">
                        <MDBBtn color="danger" onClick={() => handleBuy(data)}>
                          Select
                        </MDBBtn>
                      </MDBContainer>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              ))
            : "No Available Item"}
        </MDBRow>
        {visibility ? (
          <Modal
            item={item}
            setVisibility={setVisibility}
            visibility={visibility}
          />
        ) : (
          ""
        )}
      </MDBContainer>
    </>
  );
}
