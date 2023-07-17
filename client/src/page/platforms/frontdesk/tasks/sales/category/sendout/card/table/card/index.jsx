import React from "react";
import { currencyFormatter } from "../../../../../../../../../../components/utilities";
import { Services } from "../../../../../../../../../../fakeDb";

export default function SendoutCard({ deal, index }) {
  const { menuId, up } = deal;

  return (
    <tr>
      <td>
        <p className="fw-bold mb-1">{index}</p>
      </td>
      <td>
        <p className="mb-1">{menuId?.name}</p>
      </td>
      <td>
        <p className="mb-1">
          {Services.whereIn(menuId.packages || []).map(service => (
            <span>{service.abbreviation || service.name}, </span>
          ))}
        </p>
      </td>
      <td>
        <p className="mb-1 text-center">{currencyFormatter(up)}</p>
      </td>
    </tr>
  );
}
