import React from "react";
import { currencyFormatter } from "../../../../../../../../../../components/utilities";
import Wrapper from "./wrapper";

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
        <Wrapper inhouse={deal?.inhouse} packages={deal?.packages} />
      </td>
      <td>
        <p className="mb-1 text-center">{currencyFormatter(deal.up)}</p>
      </td>
    </tr>
  );
}
