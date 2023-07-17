import React, { useEffect, useState } from "react";
import {
  currencyFormatter,
  nameFormatter,
  memberships,
  privileges,
} from "../../../../../../../../../components/utilities";
import TransactionDetails from "../../../details";

export default function TableCard({ transaction, privilege }) {
  const [discount, setDiscount] = useState("");

  useEffect(() => {
    if (privilege) {
      if (privilege > 0 && transaction.discount) {
        setDiscount(privileges[privilege]);
      }
    } else {
      if (transaction.discount) {
        setDiscount(memberships[transaction.discount]);
      }
    }
  }, [transaction, privilege]);

  return (
    <tr>
      <td>
        <p className="fw-bold mb-1">
          {new Date(transaction.createdAt).toDateString()}
        </p>
        <p className="text-muted mb-0">
          {new Date(transaction.createdAt).toLocaleTimeString()}
        </p>
      </td>
      <td className="text-center text-capitalize">
        <p className="fw-bold mb-1">{transaction.source}</p>
        <p className="text-muted mb-0">
          {nameFormatter(transaction.physicianId?.fullName)}
        </p>
      </td>
      <td className="text-center text-capitalize">
        <p className="fw-bold mb-1">{currencyFormatter(transaction.amount)}</p>
        <p className="text-muted mb-0">{discount}</p>
      </td>
      <td className="text-center text-capitalize">
        <p className="fw-bold mb-1">
          {transaction.payment === "free"
            ? nameFormatter(transaction.authorizedBy?.fullName)
            : currencyFormatter(transaction.cash)}
        </p>
        <p className="text-muted mb-0">{transaction.payment}</p>
      </td>
      <td className="text-center">
        <TransactionDetails
          saleId={transaction._id}
          date={new Date(transaction.createdAt).toDateString()}
          time={new Date(transaction.createdAt).toLocaleTimeString()}
        />
      </td>
    </tr>
  );
}
