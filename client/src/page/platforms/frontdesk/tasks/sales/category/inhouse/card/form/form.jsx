import React, { useEffect, useState } from "react";
import {
  MDBRow,
  MDBCol,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { Services } from "../../../../../../../../../fakeDb";
export default function ModalForm({ inhouse, packages }) {
  const { theme, onDuty, token } = useSelector(({ auth }) => auth),
    [sendout, setSendout] = useState([]),
    dispatch = useDispatch();

  const handleSendout = (pk) => {
    if (sendout.includes(pk)) {
      const _sendout = sendout.filter((x) => x !== pk);
      setSendout([..._sendout]);
    } else {
      setSendout([...sendout, pk]);
    }
  };

  return (
    <MDBRow>
      <MDBCol md={6} className="mb-3"></MDBCol>
      <MDBTable>
        <MDBTableHead>
          <tr>
            <th scope="col" className="text-start p-1 fw-bold">
              #
            </th>
            <th scope="col" className="p-1 fw-bold text-end">
              Services
            </th>
            <th scope="col" className="p-1 fw-bold text-end">
              Price
            </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {packages.map((pk) => (
            <tr>
              <td>
                <input
                  type="checkbox"
                  className="mb-2 mr-5 ml-5"
                  checked={sendout.includes(pk)}
                  onChange={() => handleSendout(pk)}
                />
              </td>
              <td>
                <label
                  htmlFor="checkbox"
                  style={{ color: inhouse.includes(pk) ? "black" : "red" }}
                >
                  {Services.getName(pk)}
                </label>
              </td>
              <td>Php 45</td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </MDBRow>
  );
}
