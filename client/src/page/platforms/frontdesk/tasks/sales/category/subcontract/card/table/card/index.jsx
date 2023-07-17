import React from "react";
import { currencyFormatter } from "../../../../../../../../../../components/utilities";
import { Services } from "../../../../../../../../../../fakeDb";

export default function TableCard({ sold, index }) {
  const { menuId } = sold;
  return (
    <tr key={`subcon-table-card${index}`}>
      <td>
        <p className="fw-bold mb-1">{index}</p>
      </td>
      <td>
        <p className="mb-1">{menuId?.name}</p>
      </td>
      <td>
        <p className="mb-1">
          {Services.whereIn(menuId?.packages || []).map(service => (
            <span>{service.abbreviation || service.name}, </span>
          ))}
        </p>
      </td>
      <td>
        {/* Depend on the contract */}
        <p className="mb-1 text-center">{currencyFormatter(menuId.up)}</p>
      </td>
    </tr>
  );
}
