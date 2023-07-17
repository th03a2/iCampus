import React, { useState } from "react";
import { useEffect } from "react";
import { currencyFormatter } from "../../../../components/utilities";
import { Services } from "../../../../fakeDb/library/services";
import { MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";

export default function TableCard({ item }) {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    if (item.info?.packages.length > 0) {
      setPackages(item.info?.packages.map(service => Services.find(service)));
    }
  }, [item]);

  return (
    <tr>
      <td className="text-start py-0 px-1">
        <p className="mb-0 text-capitalize">{item.info?.name}</p>
        <MDBListGroup>
          {packages?.map((_package, index) => (
            <MDBListGroupItem
              key={`package-item-${index}`}
              className="px-1 py-0 border-0"
            >
              -{_package.abbreviation || _package.name}
            </MDBListGroupItem>
          ))}
        </MDBListGroup>
      </td>
      <td className="px-1 text-end py-0">
        {currencyFormatter(item.discountable ? item.ip : item.up)}
      </td>
    </tr>
  );
}
