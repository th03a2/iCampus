import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import TableCard from "./card";
import { paginationHandler } from "../../../components/utilities";

export function TBLmenu({ menus, page }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of menus</caption>
      <caption className="caption-top">
        Total of <b>{menus.length}</b> menu(s)
      </caption>
      <MDBTableHead>
        {!!menus.length ? (
          <>
            <tr>
              <th rowSpan={2} scope="col">
                #
              </th>
              <th rowSpan={2} scope="col">
                Title
              </th>
              <th rowSpan={2} scope="col">
                Abbrevations
              </th>
              <th colSpan={6} scope="col" className="text-center">
                Suggested Retail Price
              </th>
              <th rowSpan={2} scope="col" className="text-center">
                Action
              </th>
            </tr>
            <tr>
              <th scope="col" className="text-center">
                OPD
              </th>
              <th scope="col" className="text-center">
                Ward
              </th>
              <th scope="col" className="text-center">
                Private
              </th>
              <th scope="col" className="text-center">
                HMO
              </th>
              <th scope="col" className="text-center" title="Sub contract">
                SC
              </th>
              <th scope="col" className="text-center">
                SSC
              </th>
            </tr>
          </>
        ) : (
          <tr className="text-center">
            <td colSpan={2}>
              <h3 className="text-center">
                Please inform your admin to create Menus first..
              </h3>
              <span>No listed menus.</span>
            </td>
          </tr>
        )}
      </MDBTableHead>
      <MDBTableBody>
        {!!menus.length &&
          paginationHandler(menus, page, maxPage).map((menu, index) => (
            <TableCard index={(page - 1) * maxPage + index} item={menu} />
          ))}
      </MDBTableBody>
    </MDBTable>
  );
}
