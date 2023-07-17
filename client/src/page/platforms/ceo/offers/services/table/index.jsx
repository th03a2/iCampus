import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { paginationHandler } from "../../../../../../components/utilities";
import TableCard from "./card";

export default function ServicesTable({
  packages,
  services,
  page,
  addHandler,
}) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of services</caption>
      <caption className="caption-top">
        Total of <b>{services.length}</b> service(s)
      </caption>
      <MDBTableHead>
        {services.length > 0 ? (
          <tr>
            <th scope="col">Information</th>
            <th scope="col" className="text-center">
              Action
            </th>
          </tr>
        ) : (
          <tr className="text-center">
            <td colSpan={4}>No requested services.</td>
          </tr>
        )}
      </MDBTableHead>
      <MDBTableBody>
        {services.length > 0 &&
          paginationHandler(services, page, maxPage).map((service, index) => {
            if (packages.includes(service.id)) {
              return false;
            } else {
              return (
                <TableCard
                  key={`${index}-service${index}`}
                  index={index}
                  service={service}
                  addHandler={() => addHandler(service.id)}
                />
              );
            }
          })}
      </MDBTableBody>
    </MDBTable>
  );
}
