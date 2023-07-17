import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import TableCard from "./card";
import { paginationHandler } from "../../../../../../../../components/utilities";

export default function TBLmenu({ menu, page, branchId }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of menus</caption>
      <caption className="caption-top">
        Total of <b>{menu.length}</b> menu(s)
      </caption>
      <MDBTableHead>
        {menu.length > 0 ? (
          <tr>
            <th scope="col">Information</th>
            <th scope="col" className="text-center">
              Action
            </th>
          </tr>
        ) : (
          <tr className="text-center">
            <td colSpan={2}>No listed menu.</td>
          </tr>
        )}
      </MDBTableHead>
      <MDBTableBody>
        {menu.length > 0 &&
          paginationHandler(menu, page, maxPage).map((item) => (
            <TableCard key={item._id} item={item} branchId={branchId} />
          ))}
      </MDBTableBody>
    </MDBTable>
  );
}
