import React from "react";
import {
  MDBInput,
  MDBRow,
  MDBCol,
  MDBCheckbox,
  MDBCardImage,
  MDBContainer,
} from "mdb-react-ui-kit";

const ModalBody = ({
  setBottle,
  setMl,
  setConsumable,
  setHalt,
  setName,
  setRevert,
  setPquantity,
  setSubname,
  setPack,
  setVat,
  vat,
  bottle,
  ml,
  isConsumable,
  halt,
  name,
  revert,
  Pquantity,
  subname,
  pack,
  handleImageChange,
  defaultImage,
  imageData,
}) => {
  return (
    <>
      <MDBRow>
        <MDBCol md={9}>
          <MDBRow className="mt-4">
            <MDBCol md={6}>
              <MDBInput
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Name"
                required
              />
            </MDBCol>
            <MDBCol md={6}>
              <MDBInput
                type="text"
                value={subname}
                onChange={(e) => setSubname(e.target.value)}
                label="Subname"
              />
            </MDBCol>
          </MDBRow>
          <MDBRow className="mt-3">
            <MDBCol md={6}>
              <MDBInput
                type="text"
                value={pack}
                onChange={(e) => setPack(e.target.value)}
                label="Pack/Unit"
              />
            </MDBCol>
            <MDBCol md={6}>
              <MDBInput
                type="number"
                value={Pquantity}
                onChange={(e) => setPquantity(e.target.value)}
                label="quantity"
                min={0}
              />
            </MDBCol>
          </MDBRow>
          <MDBRow className="mt-3">
            <MDBCol md={6}>
              <MDBInput
                type="text"
                value={bottle}
                onChange={(e) => setBottle(e.target.value)}
                label="Bottle/unit"
              />
            </MDBCol>
            <MDBCol md={6}>
              <MDBInput
                type="text"
                value={ml}
                onChange={(e) => setMl(e.target.value)}
                label="volume"
              />
            </MDBCol>
          </MDBRow>
          <MDBRow className="mt-3">
            <MDBCol md={3}>
              <MDBCheckbox
                checked={revert}
                onChange={() => setRevert(!revert)}
                label="Revert"
              />
            </MDBCol>

            <MDBCol md={6}>
              <MDBCheckbox
                checked={isConsumable}
                onChange={() => setConsumable(!isConsumable)}
                label="Consumable: untrackable|cannot be include in inventory "
              />
            </MDBCol>
            <MDBCol md={3}>
              <MDBCheckbox
                checked={vat}
                onChange={() => setVat(!vat)}
                label="VatTable"
              />
            </MDBCol>
          </MDBRow>
        </MDBCol>
        <MDBCol md={3}>
          <MDBCardImage
            src={imageData ? imageData : defaultImage}
            className="mx-auto rounded img-max img-fluid mb-1 d-flex justify-content-center"
          />
          <MDBContainer className="d-flex justify-content-center">
            <label htmlFor="upload-image" className="mt-2 btn btn-info btn-sm">
              Select image
            </label>
            <input
              type="file"
              id="upload-image"
              onChange={handleImageChange}
              className="d-none"
              accept="image/*"
            />
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </>
  );
};

export default ModalBody;
