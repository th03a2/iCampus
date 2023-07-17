import React from "react";
import { MDBRow, MDBCol, MDBInput, MDBContainer } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { SETMODEL } from "../../../../redux/slices/commerce/menus";

export default function ModalForm() {
  const { theme, onDuty } = useSelector(({ auth }) => auth),
    { model } = useSelector(({ menus }) => menus),
    dispatch = useDispatch();
  const handleParams = e => {
    const { name, value, type } = e.target;

    let _model = {
      ...model,
      branchId: onDuty._id,
      [name]: type === "number" ? Number(value) : value,
    };
    dispatch(SETMODEL(_model));
  };

  return (
    <MDBContainer>
      <MDBRow className="mb-2">
        <MDBCol md={6}>
          <MDBInput
            label="Name"
            name="name"
            value={model?.name}
            contrast={theme.dark}
            onChange={handleParams}
          />
        </MDBCol>
        <MDBCol md={6}>
          <MDBInput
            type="text"
            label="Abbreviation"
            name="abbreviation"
            value={model?.abbreviation}
            contrast={theme.dark}
            onChange={handleParams}
          />
        </MDBCol>
      </MDBRow>
      <MDBRow className="mb-2">
        <MDBCol md={6}>
          <MDBInput
            type="number"
            label="Capital"
            name="capital"
            value={model?.capital}
            contrast={theme.dark}
            onChange={handleParams}
          />
        </MDBCol>
        <MDBCol md={6}>
          <MDBInput
            type="number"
            label="Refund"
            name="refund"
            value={model?.refund}
            contrast={theme.dark}
            onChange={handleParams}
          />
        </MDBCol>
      </MDBRow>
      <hr />
      <span>SRP:</span>
      <MDBRow className="mb-2">
        <MDBCol md={6}>
          <MDBInput
            type="number"
            label="Out Patient Department"
            name="opd"
            value={model?.opd}
            contrast={theme.dark}
            onChange={handleParams}
          />
        </MDBCol>
        <MDBCol md={6}>
          <MDBInput
            type="number"
            label="Charity Ward"
            name="cw"
            value={model?.cw}
            contrast={theme.dark}
            onChange={handleParams}
          />
        </MDBCol>
      </MDBRow>
      <MDBRow className="mb-2">
        <MDBCol md={6}>
          <MDBInput
            type="number"
            icon="thermometer-half"
            label="Emergency room"
            name="er"
            value={model?.er}
            contrast={theme.dark}
            onChange={handleParams}
          />
        </MDBCol>
        <MDBCol md={6}>
          <MDBInput
            type="number"
            label="Promo"
            name="promo"
            value={model?.promo}
            contrast={theme.dark}
            onChange={handleParams}
          />
        </MDBCol>
      </MDBRow>
      <MDBRow className="mb-2">
        <MDBCol md={6}>
          <MDBInput
            type="number"
            label="Private Ward"
            name="pw"
            value={model?.pw}
            contrast={theme.dark}
            onChange={handleParams}
          />
        </MDBCol>
      </MDBRow>
      <hr />
      <span>Contracts</span>
      <MDBRow className="mb-2">
        <MDBCol md={6}>
          <MDBInput
            type="number"
            label="Health Maintenance Organization"
            name="hmo"
            value={model?.hmo}
            contrast={theme.dark}
            onChange={handleParams}
          />
        </MDBCol>
        <MDBCol md={6}>
          <MDBInput
            type="number"
            icon="thermometer-half"
            label="Company Price"
            name="vp"
            value={model?.vp}
            contrast={theme.dark}
            onChange={handleParams}
          />
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol md={6}>
          <MDBInput
            type="number"
            label="Insourcing"
            name="sb"
            value={model?.sb}
            contrast={theme.dark}
            onChange={handleParams}
          />
        </MDBCol>
        <MDBCol md={6}>
          <MDBInput
            type="number"
            label="Special Insourcing"
            name="ssc"
            value={model?.ssc}
            contrast={theme.dark}
            onChange={handleParams}
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
