import React from "react";
import { MDBBtn, MDBBtnGroup, MDBIcon } from "mdb-react-ui-kit";
import Swal from "sweetalert2";

export default function TableCard({ service, addHandler, index }) {
  const { id, name, abbreviation } = service;
  return (
    <tr>
      <td>
        <p className="fw-bold mb-1">{name}</p>
        <p className="text-muted mb-0">{abbreviation}</p>
      </td>
      <td className="text-center">
        <MDBBtnGroup>
          <MDBBtn
            onClick={() => Swal.fire(name, abbreviation, "info")}
            size="sm"
            color="info"
            title="View Information"
          >
            <MDBIcon icon="info" />
          </MDBBtn>
          <MDBBtn
            onClick={() => addHandler(id)}
            size="sm"
            title="Transfer to package"
          >
            <MDBIcon icon="share-square" />
          </MDBBtn>
        </MDBBtnGroup>
      </td>
    </tr>
  );
}
