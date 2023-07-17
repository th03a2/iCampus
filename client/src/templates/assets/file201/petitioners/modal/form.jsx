import React, { useEffect } from "react";
import { MDBRow, MDBCol, MDBInputGroup } from "mdb-react-ui-kit";
import { BROWSE } from "../../../../../redux/slices/subquery";
import { useSelector, useDispatch } from "react-redux";
import { nameFormatter } from "../../../../../components/utilities";

export default function ModalForm({ model }) {
  const { theme, onDuty, token } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ subquery }) => subquery),
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      BROWSE({ entity: "assets/persons/personnels", branch: onDuty._id, token })
    );
  }, [onDuty]);

  return (
    <MDBRow>
      <MDBCol md={6} className="mb-3">
        <MDBInputGroup
          textBefore={<span className={theme.text}>Department</span>}
        >
          <select
            className="form-select"
            name="department"
            defaultValue={model?.department}
          >
            <option value="Pathologist">Pathologist</option>
            <option value="Analysis">Analysis</option>
            <option value="Bacteriology">Bacteriology</option>
            <option value="Biopsy">Biopsy</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Coagulation">Coagulation</option>
            <option value="Compatibility">Compatibility</option>
            <option value="Hematology">Hematology</option>
            <option value="Miscellaneous">Miscellaneous</option>
            <option value="Parasitology">Parasitology</option>
            <option value="PAPs">PAPs</option>
            <option value="PBS">PBS</option>
            <option value="Serology">Serology</option>
            <option value="Urinalysis">Urinalysis</option>
            <option value="ECG">ECG</option>
            <option value="Ultrasound">Ultrasound</option>
            <option value="Xray">Xray</option>
            <option value="2DEcho">2DEcho</option>
          </select>
        </MDBInputGroup>
      </MDBCol>
      <MDBCol md={6} className="mb-3">
        <MDBInputGroup
          textBefore={<span className={theme.text}>Fullname</span>}
        >
          <select
            className="form-select"
            name="user"
            defaultValue={model?.user}
          >
            {catalogs.map((branch) => (
              <option value={branch?.user._id}>
                {nameFormatter(branch.user?.fullName, false)}
              </option>
            ))}
          </select>
        </MDBInputGroup>
      </MDBCol>
    </MDBRow>
  );
}
