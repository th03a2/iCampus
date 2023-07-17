import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { currencyFormatter } from "../../../../../../components/utilities";

export function Footer() {
  const { theme } = useSelector(({ auth }) => auth),
    { gross, discount } = useSelector(({ pos }) => pos);

  return (
    <MDBTable
      small
      align="middle"
      hover
      responsive
      color={theme.color}
      className="mt-3 mb-0 border-top"
    >
      <MDBTableHead>
        <tr>
          <th scope="col" colSpan={2} className="text-center">
            Overall Computation
          </th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <td>
            <p className="fw-normal mb-1">Gross amount</p>
          </td>
          <td>
            <p className="text-center fw-normal mb-1">
              {currencyFormatter(gross)}
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <p className="fw-normal mb-1">Discount</p>
          </td>
          <td>
            <p className="text-center fw-normal mb-1">
              {currencyFormatter(discount)}
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <p className="fw-normal mb-1">Net amount</p>
          </td>
          <td>
            <p className="text-center fw-normal mb-1">
              {currencyFormatter(gross - discount)}
            </p>
          </td>
        </tr>
      </MDBTableBody>
    </MDBTable>
  );
}
