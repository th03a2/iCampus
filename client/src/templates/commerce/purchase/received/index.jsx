import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";

import { paginationHandler } from "../../../../components/utilities";
import { nameFormatter } from "../../../../components/utilities";
export function TBLreceived({ received, page }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);
  const options = { year: "numeric", month: "long", day: "numeric" };

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of Received</caption>
      <caption className="caption-top">
        Total of <b>{received?.length}</b> Received(s)
      </caption>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th>Product Name</th>
          <th>Package</th>
          <th>Expected Quantity</th>
          <th>Date</th>
          <th>Approved By</th>
          <th>Received Quantity</th>
          <th>Approved Date</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {received?.length > 0 ? (
          paginationHandler(received && received, page, maxPage).map(
            (data, index) => (
              <tr key={`machines-${index}`}>
                <td>{1 + index}</td>
                <td>{data.productId?.name}</td>
                <td>{data?.packages}</td>
                <td>{data?.quantity}</td>
                <td>
                  {new Date(data.createdAt).toLocaleDateString(
                    "en-US",
                    options
                  )}
                </td>
                <td>{nameFormatter(data.approvedBy.fullName)}</td>
                <td>{data.approvedQty ? data.approvedQty : data.quantity}</td>
                <td>{data.approved}</td>
              </tr>
            )
          )
        ) : (
          <tr className="text-center">
            <td colSpan={3}>No Request.</td>
          </tr>
        )}
      </MDBTableBody>
    </MDBTable>
  );
}
