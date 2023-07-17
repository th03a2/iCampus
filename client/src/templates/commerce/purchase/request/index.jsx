import React, { useEffect, useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { paginationHandler } from "../../../../components/utilities";
// import { GETREQUEST } from "../../../../redux/slices/procurments/purchase";
// import { UPDATE, SAVE } from "../../../../redux/slices/query";
import { nameFormatter } from "../../../../components/utilities";
import Modal from "./modal";
export function TBLrequest({ products, page, setProducts }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);
  const options = { year: "numeric", month: "long", day: "numeric" },
    [purchases, setPurchases] = useState([]),
    [purchase, setPurchase] = useState(),
    [visible, setVisible] = useState(false);

  useEffect(() => {
    const data = [...products];
    const sortedData = data?.sort((a, b) => {
      if (a?.remarks === "priority" && b?.remarks !== "priority") {
        return -1; // a (priority) should come before b (regular)
      }
      if (a?.remarks !== "priority" && b?.remarks === "priority") {
        return 1; // b (priority) should come before a (regular)
      }
      return 0; // a and b have the same remarks or both are regular
    });
    setPurchases(sortedData);
  }, [products]);

  const handleView = (purchase) => {
    setPurchase(purchase);
    setVisible(true);
  };

  return (
    <>
      <MDBTable align="middle" hover responsive color={theme.color}>
        <caption>List of Request</caption>
        <caption className="caption-top">
          Total of <b>{purchases?.length}</b> Request(s)
        </caption>
        <MDBTableHead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Date Request</th>
            <th>Date Expected</th>
            <th>Priority</th>
            <th>Action </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {!!purchases?.length ? (
            paginationHandler(purchases, page, maxPage).map(
              (purchase, index) => (
                <tr key={`machines-${index}`}>
                  <td>{1 + index}</td>
                  <td>{nameFormatter(purchase?.userId?.fullName)}</td>
                  <td>
                    {new Date(purchase.createdAt).toLocaleDateString(
                      "en-US",
                      options
                    )}
                  </td>
                  <td>{purchase.expected}</td>
                  <td>{purchase.remarks}</td>
                  <td>
                    <MDBBtn onClick={() => handleView(purchase)}>View</MDBBtn>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr className="text-center">
              <td colSpan={3}>No Request.</td>
            </tr>
          )}
        </MDBTableBody>
      </MDBTable>

      <Modal visible={visible} setVisible={setVisible} purchase={purchase} />
    </>
  );
}
