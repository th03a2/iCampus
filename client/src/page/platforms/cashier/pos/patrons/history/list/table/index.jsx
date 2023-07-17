import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import TableCard from "./card";
import { paginationHandler } from "../../../../../../../../components/utilities";

export default function HistoryTable({ transactions, page, privilege }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of transaction</caption>
      <caption className="caption-top">
        Total of <b>{transactions.length}</b> transaction(s)
      </caption>
      <MDBTableHead>
        {transactions.length > 0 ? (
          <tr>
            <th scope="col">Date</th>
            <th scope="col" className="text-center">
              Source
            </th>
            <th scope="col" className="text-center">
              Gross & Discount
            </th>
            <th scope="col" className="text-center">
              Amount & Payment
            </th>
            <th scope="col" className="text-center">
              Actions
            </th>
          </tr>
        ) : (
          <tr className="text-center">
            <td colSpan={4}>No previous transactions.</td>
          </tr>
        )}
      </MDBTableHead>
      <MDBTableBody>
        {transactions.length > 0 &&
          paginationHandler(transactions, page, maxPage).map(transaction => (
            <TableCard
              key={`${transaction._id}-${page}-modal`}
              transaction={transaction}
              privilege={privilege}
            />
          ))}
      </MDBTableBody>
    </MDBTable>
  );
}
