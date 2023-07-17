import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBTypography,
} from "mdb-react-ui-kit";
import ReceiptHeader from "./header";
import TableCard from "./card";
import {
  nameFormatter,
  currencyFormatter,
  privileges,
} from "../../../components/utilities";

export default function ClaimingStab() {
  const [sale, setSale] = useState({}),
    [discounted, setDiscounted] = useState(0);

  useEffect(() => {
    const _sale = JSON.parse(localStorage.getItem("claim_stub"));

    if (_sale.privilege > 0) {
      const _discounted = _sale.items.filter((_item) => _item.discountable);

      setDiscounted(
        _discounted.reduce((total, _itm) => total + (_itm.ip - _itm.up), 0)
      );
    }

    setSale(_sale);
  }, []);

  useEffect(() => {
    if (sale) {
      setTimeout(() => {
        window.print();
        window.close();
      }, 1000);
    }
  }, [sale]);

  return (
    <MDBContainer
      style={{
        fontFamily: "arial",
        fontSize: "15px",
        width: "250px",
        maxWidth: "250px",
        letterSpacing: "-0.5px",
        wordSpacing: "-1px",
        lineHeight: "20px",
      }}
      className="text-center text-black"
    >
      <ReceiptHeader />
      <MDBTable
        style={{
          fontSize: "15px",
          letterSpacing: "-0.5px",
          wordSpacing: "-1px",
        }}
        align="middle"
        hover
        responsive
        color="light"
        className="mb-0"
        small
        borderless
      >
        <caption className="caption-top pb-1 pt-3 mx-0 text-black border-bottom border-black fw-bold text-center">
          <MDBTypography
            style={{ marginBottom: "-0.5%" }}
            className="text-start"
          >
            {nameFormatter(sale.customerInfo?.fullName)}
          </MDBTypography>
          <MDBTypography
            style={{ marginBottom: "-0.5%" }}
            className="d-flex justify-content-end"
          >
            {new Date(sale.createdAt).toLocaleString()}
          </MDBTypography>
        </caption>

        <MDBTableHead className="border-bottom border-black">
          <tr>
            <th scope="col" className="text-start p-1 fw-bold">
              Items
            </th>
            <th scope="col" className="p-1 fw-bold text-end">
              Totals
            </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody className="border-bottom border-black">
          {sale.items?.map((item, index) => (
            <TableCard key={`claim-stub-${index}`} item={item} />
          ))}
          <tr className="border-bottom border-black fw-bold">
            <td className="text-start px-1 py-0">Total</td>
            <td className="px-1 py-0 text-end">
              {currencyFormatter(
                discounted > 0 ? sale.amount + discounted : sale.amount
              )}
            </td>
          </tr>
          <tr className="fw-bold">
            <td className="text-start px-1 py-0">Cash</td>
            <td className="px-1 py-0 text-end">
              {currencyFormatter(sale.cash)}
            </td>
          </tr>
          {sale.privilege > 0 && (
            <tr className="fw-bold">
              <td className="text-start px-1 py-0">
                {privileges[sale.privilege]}
              </td>
              <td className="px-1 py-0 text-end">
                {currencyFormatter(discounted)}
              </td>
            </tr>
          )}
          <tr className="fw-bold">
            <td className="text-start px-1 py-0">Change</td>
            <td className="px-1 py-0 text-end">
              {currencyFormatter(sale.cash - sale.amount)}
            </td>
          </tr>
        </MDBTableBody>
      </MDBTable>
      <MDBTypography
        style={{ marginBottom: "-0.5%" }}
        className="text-capitalize text-start"
      >
        {nameFormatter(sale.cashierInfo?.fullName)}
      </MDBTypography>

      <MDBTypography
        style={{ marginBottom: "-0.5%", letterSpacing: "0.5px" }}
        className="text-center mt-2"
      >
        THIS SHALL SERVE AS YOUR CLAIMING STUB AND IS VALID FOR <b>FIVE(5)</b>
        &nbsp;DAYS
      </MDBTypography>
      <MDBTypography className="text-center mt-2">
        <strong>THANK YOU, COME AGAIN.</strong>
      </MDBTypography>
    </MDBContainer>
  );
}
