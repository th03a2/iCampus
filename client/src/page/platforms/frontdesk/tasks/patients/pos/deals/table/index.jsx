import React from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import TableCard from "./card";

export default function DealsTable({
  deals,
  source,
  privilege,
  handleRemove,
  percentage,
}) {
  const { theme } = useSelector(({ auth }) => auth);

  return (
    <MDBTable
      small
      align="middle"
      hover
      responsive
      color={theme.color}
      className="mt-3 mb-0"
    >
      <MDBTableHead>
        <tr>
          <th scope="col">Service</th>
          <th scope="col" className="text-center">
            SRP
          </th>
          <th scope="col" className="text-center">
            UP
          </th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {deals.length > 0 ? (
          deals.map((deal, index) => (
            <TableCard
              key={`${deal._id}-${index}`}
              index={index}
              deal={deal}
              source={source}
              privilege={privilege}
              percentage={percentage}
              handleRemove={handleRemove}
            />
          ))
        ) : (
          <tr>
            <td colSpan={3}>
              <p className="text-center fw-normal mb-1">
                Select a service using <MDBIcon icon="share-square" /> button
              </p>
            </td>
          </tr>
        )}
      </MDBTableBody>
    </MDBTable>
  );
}
