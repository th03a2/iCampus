import React from "react";
import { MDBRow, MDBCol, MDBInput, MDBInputGroup } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import {
  nameFormatter,
} from "../../../../../../components/utilities";

export default function ModalForm({users}) {
  const { theme } = useSelector(({ auth }) => auth);

  return (
    <MDBRow>
      <MDBRow>
        <MDBCol md={6} className="mb-3">
        <MDBInputGroup textBefore={<span className={theme.text}>Fullname</span>}>
        <select className="form-select" name="user_id">
          {users.map((user)=>(
            <option value={user?._id}>{nameFormatter(user?.fullName, false)}</option>
          ))}
        </select>
        </MDBInputGroup>
        </MDBCol>
        <MDBCol md={6} className="mb-3">
        <MDBInputGroup textBefore={<span className={theme.text}>Designation</span>}>
        <select className="form-select" name="designation">
            <option value="admin">Administrator</option>
            <option value="manager">Manager</option>
            <option value="pathologist">Pathologist</option>
            <option value="medtech">Med Tech</option>
            <option value="tech">Tech</option>
            <option value="recep">Receptionist</option>
        </select>
        </MDBInputGroup>
        </MDBCol>
      </MDBRow>
    </MDBRow>
  );
}
