import React from "react";
import { currencyFormatter } from "../../../../../../../../../../components/utilities";
import { Services } from "../../../../../../../../../../fakeDb";

export default function TableCard({ deal, index }) {
  return (
    <tr>
      <td>
        <p className="fw-bold mb-1">{index}</p>
      </td>
      <td>
        <p className="mb-1">{deal?.menuId?.name}</p>
      </td>
      <td>
        <p className="mb-1">
          {Services.whereIn(deal?.menuId?.packages || []).map(service => (
            <span>{service.abbreviation || service.name}, </span>
          ))}
        </p>
      </td>
      <td>
        <p className="mb-1 text-center">{currencyFormatter(deal.up)}</p>
      </td>
    </tr>
  );
}
