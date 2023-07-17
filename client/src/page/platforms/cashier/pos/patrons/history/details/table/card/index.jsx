import React from "react";
import { MDBBadge } from "mdb-react-ui-kit";
import { Services } from "../../../../../../../../../fakeDb";
import { currencyFormatter } from "../../../../../../../../../components/utilities";

export default function TableCard({ item }) {
  const { name, services } = item.menuId;

  return (
    <tr>
      <td className="text-capitalize">
        <p className="fw-bold mb-1">{name}</p>
      </td>
      <td className="text-center">
        <p className="fw-bold mb-1">
          {services?.map(service => {
            const newService = Services.collection.find(
              fService => fService.id === service
            );

            return (
              <MDBBadge className="mx-1">
                {newService.abbreviation || newService.name}
              </MDBBadge>
            );
          })}
        </p>
      </td>
      <td className="text-center">
        <p className="fw-bold mb-1">{currencyFormatter(item.up)}</p>
      </td>
    </tr>
  );
}
