import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import TableCard from "./table";
import { paginationHandler } from "../../../components/utilities";

export function PreMenus({ menus, page, willInclude, selectAll,willSave }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  const pickAll = e => selectAll(e.target.checked);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>
        <button className="btn btn-success" onClick={() => willSave()}>
          Save
        </button>
      </caption>
      <caption className="caption-top">
        Total of <b>{menus.length}</b> menu(s)
      </caption>
      <MDBTableHead>
        {menus.length > 0 ? (
          <>
            <tr>
              <th rowSpan={2} scope="col">
                <label htmlFor="checkbox">Select All &nbsp;</label>
                <input type="checkbox" id="checkbox" onChange={pickAll} />
              </th>
              <th rowSpan={2} scope="col">
                Title
              </th>
              <th rowSpan={2} scope="col">
                Abbrevations
              </th>
              <th colSpan={3} scope="col" className="text-center">
                Suggested Retail Price
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
            </tr>
          </>
        ) : (
          <tr className="text-center">
            <td colSpan={2}>No listed menus.</td>
          </tr>
        )}
      </MDBTableHead>
      <MDBTableBody>
        {menus.length > 0 &&
          paginationHandler(menus, page, maxPage).map((menu, index) => (
            <TableCard
              index={(page - 1) * maxPage + index}
              item={menu}
              willInclude={willInclude}
            />
          ))}
      </MDBTableBody>
    </MDBTable>
  );
}
