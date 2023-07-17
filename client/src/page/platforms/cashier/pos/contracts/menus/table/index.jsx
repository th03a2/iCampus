import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import TableCard from "./card";
import { paginationHandler } from "./../../../../../../../components/utilities";

export default function TBLmenu({ menus, page, usage }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of menus</caption>
      <caption className="caption-top">
        Total of <b>{menus.length}</b> menu(s)
      </caption>
      <MDBTableHead>
        {menus.length > 0 ? (
          <tr>
            {usage === "default" ? (
              <th scope="col">#</th>
            ) : (
              <th scope="col"></th>
            )}
            <th scope="col">Name</th>
            <th scope="col" className="text-center">
              SRP
            </th>
            {usage === "default" && (
              <th scope="col" className="text-center">
                Action
              </th>
            )}
          </tr>
        ) : (
          <tr className="text-center">
            <td colSpan={2}>No listed menu.</td>
          </tr>
        )}
      </MDBTableHead>
      <MDBTableBody>
        {menus.length > 0 &&
          paginationHandler(menus, page, maxPage).map((item, index) => (
            <TableCard
              usage={usage}
              page={page}
              key={item._id}
              item={item}
              index={index}
            />
          ))}
      </MDBTableBody>
    </MDBTable>
  );
}
