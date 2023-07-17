import React, { useState, useEffect } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import TableCard from "./card";
import { currencyFormatter } from "../../../../../../../../components/utilities";

export default function DetailTable({ items }) {
  const { theme } = useSelector(({ auth }) => auth),
    [total, setTotal] = useState(0);

  useEffect(() => {
    if (items.length > 0) {
      setTotal(items.reduce((total, item) => total + item.up, 0));
    }
  }, [items]);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>Total Net: {currencyFormatter(total)}</caption>
      <caption className="caption-top ">
        Total of <b>{items.length}</b> menu(s)
      </caption>
      <MDBTableHead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col" className="text-center">
            Services
          </th>
          <th scope="col" className="text-center">
            Net Amount
          </th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {items?.length > 0 &&
          items?.map(item => <TableCard key={item?._id} item={item} />)}
      </MDBTableBody>
    </MDBTable>
  );
}
