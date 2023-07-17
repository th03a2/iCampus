import React, { useEffect } from "react";
import { MDBRow, MDBCol, MDBInputGroup } from "mdb-react-ui-kit";
import { EMPLOYEE } from "../../../../../../redux/slices/assets/persons/personnels";
import { useSelector, useDispatch } from "react-redux";
import { nameFormatter } from "../../../../../../components/utilities";

export default function ModalForm({ model }) {
  const { theme, onDuty, token } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ personnels }) => personnels),
    dispatch = useDispatch();

  useEffect(() => {
    onDuty._id &&
      dispatch(
        EMPLOYEE({
          branch: onDuty._id,
          token,
        })
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
            <option value="laboratory">Laboratory</option>
            <option value="radiology">Radiology</option>
          </select>
        </MDBInputGroup>
      </MDBCol>
      <MDBCol md={6} className="mb-3">
        <MDBInputGroup textBefore={<span className={theme.text}>Section</span>}>
          <select
            className="form-select"
            name="section"
            defaultValue={model?.section}
          >
            <option value="pathologist">Pathologist</option>
            <option value="analysis">Analysis</option>
            <option value="bacteriology">Bacteriology</option>
            <option value="biopsy">Biopsy</option>
            <option value="chemistry">Chemistry</option>
            <option value="coagulation">Coagulation</option>
            <option value="compatibility">Compatibility</option>
            <option value="drugtest">Drugtest</option>
            <option value="hematology">Hematology</option>
            <option value="miscellaneous">Miscellaneous</option>
            <option value="parasitology">Parasitology</option>
            <option value="paps">PAPs</option>
            <option value="pbs">PBS</option>
            <option value="serology">Serology</option>
            <option value="urinalysis">Urinalysis</option>
            <option value="ecg">ECG</option>
            <option value="ultrasound">Ultrasound</option>
            <option value="xray">Xray</option>
            <option value="2decho">2DEcho</option>
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
            {catalogs.map(branch => (
              <option value={branch?.user?._id}>
                {nameFormatter(branch.user?.fullName, false)}
              </option>
            ))}
          </select>
        </MDBInputGroup>
      </MDBCol>
    </MDBRow>
  );
}
