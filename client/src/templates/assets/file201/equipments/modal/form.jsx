import React from "react";
import { MDBRow, MDBCol, MDBInputGroup, MDBInput } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { nameFormatter } from "../../../../../components/utilities";

export default function ModalForm({ equipment }) {
  const { theme, onDuty, token } = useSelector(({ auth }) => auth);
  return (
    <MDBRow>
      <MDBCol md={6} className="mb-3">
        <MDBInput
          type="text"
          label="Brand"
          name="brand"
          contrast={theme.dark}
          value={equipment?.brand}
          required
        />
      </MDBCol>
      <MDBCol md={6} className="mb-3">
        <MDBInput
          type="text"
          label="Model"
          name="model"
          contrast={theme.dark}
          value={equipment?.model}
          required
        />
      </MDBCol>
      <MDBCol md={6} className="mb-3">
        <MDBInput
          type="text"
          label="Serial"
          name="serial"
          contrast={theme.dark}
          value={equipment?.serial}
        />
      </MDBCol>
      <MDBCol md={6} className="mb-3">
        <MDBInput
          type="number"
          label="Mortgage"
          name="mortgage"
          contrast={theme.dark}
          value={equipment?.mortgage}
        />
      </MDBCol>

      <MDBCol md={4} className="mb-3">
        <MDBInputGroup textBefore={<span className={theme.text}>Status</span>}>
          <select
            className="form-select"
            name="status"
            defaultValue={equipment?.status}
          >
            <option value="fully functional">Fully Functional</option>
            <option value="functional">Functional</option>
            <option value="damaged">Damaged</option>
            <option value="broken">Broken</option>
          </select>
        </MDBInputGroup>
      </MDBCol>
      <MDBCol md={4} className="mb-3">
        <MDBInputGroup
          textBefore={<span className={theme.text}>Accuqired</span>}
        >
          <select
            className="form-select"
            name="accuqired"
            defaultValue={equipment?.accuqired}
          >
            <option value="brand-new">Brand New</option>
            <option value="refurbish">Refurbish</option>
          </select>
        </MDBInputGroup>
      </MDBCol>
      <MDBCol md={4} className="mb-3">
        <MDBInputGroup
          textBefore={<span className={theme.text}>Category</span>}
        >
          <select
            className="form-select"
            name="category"
            defaultValue={equipment?.category}
          >
            <option value="furniture">Furniture</option>
            <option value="machines">Machines</option>
          </select>
        </MDBInputGroup>
      </MDBCol>
    </MDBRow>
  );
}
