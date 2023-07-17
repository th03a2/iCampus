import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { paginationHandler } from "./../../../../../../components/utilities";
import TableCard from "./card";

export default function EquipmentsTable({ equipments, page }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of available equipments</caption>
      <caption className="caption-top">
        Total of <b>{equipments?.length}</b> equipments
      </caption>
      <MDBTableHead>
        {equipments?.length > 0 ? (
          <tr>
            <th scope="col">Name</th>
            <th scope="col" className="text-center">
              Serial Number
            </th>
            <th scope="col" className="text-center">
              MortGage
            </th>
            <th scope="col" className="text-center">
              Price
            </th>
            <th scope="col" className="text-center">
              Actions
            </th>
          </tr>
        ) : (
          <tr className="text-center">
            <td colSpan={4}>No registered machine.</td>
          </tr>
        )}
      </MDBTableHead>
      <MDBTableBody>
        {equipments?.length > 0 &&
          paginationHandler(equipments, page, maxPage).map(machine => (
            <TableCard key={machine?._id} machine={machine} />
          ))}
      </MDBTableBody>
    </MDBTable>
  );
}
