import React, { useEffect, useState } from "react";
import { MDBBtn, MDBBtnGroup, MDBIcon } from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { currencyFormatter } from "../../../../components/utilities";
import { Services } from "../../../../fakeDb";
import { SETMODEL } from "../../../../redux/slices/commerce/menus";

export default function TableCard({ item, index, handleTransfer }) {
  const [title, setTitle] = useState(""),
    [srp, setSrp] = useState(0),
    dispatch = useDispatch();

  useEffect(() => {
    if (item._id) {
      var str = "";

      Services.whereIn(item.packages).map(
        (service, index) =>
          (str += `${service.abbreviation || service.name}${
            item.packages.length - 1 !== index ? ", " : ""
          }`)
      );

      setSrp(item?.opd);
      setTitle(str);
    }
  }, [item]);

  return (
    <tr title={`Services: ${title}`}>
      <td>{index + 1}</td>
      <td>
        <p className="fw-normal mb-1">{item.name}</p>
      </td>
      <td>
        <p className="fw-normal mb-1">{item.abbreviation}</p>
      </td>
      <td>
        <p className="fw-normal text-center mb-1">
          {currencyFormatter(item.opd)}
        </p>
      </td>
      <td>
        <p className="fw-normal text-center mb-1">
          {currencyFormatter(item.cw)}
        </p>
      </td>
      <td>
        <p className="fw-normal text-center mb-1">
          {currencyFormatter(item.pw)}
        </p>
      </td>
      <td>
        <p className="fw-normal text-center mb-1">
          {currencyFormatter(item.hmo)}
        </p>
      </td>
      <td>
        <p className="fw-normal text-center mb-1">
          {currencyFormatter(item.sc)}
        </p>
      </td>
      <td>
        <p className="fw-normal text-center mb-1">
          {currencyFormatter(item.ssc)}
        </p>
      </td>
      <td className="text-center">
        {srp > 0 ? (
          <MDBBtn
            // onClick={() => handleTransfer(item)}
            size="sm"
            title="Transfer package transaction."
          >
            <MDBIcon icon="share-square" />
          </MDBBtn>
        ) : (
          <MDBBtnGroup>
            <MDBBtn
              onClick={() => dispatch(SETMODEL(item))}
              size="sm"
              color="info"
              title="Update"
            >
              <MDBIcon icon="pen" />
            </MDBBtn>
            <MDBBtn
              // onClick={() =>
              //   Swal.fire(
              //     "No price",
              //     `Inform the admin to set a price for ${String(
              //       source
              //     ).toUpperCase()}`,
              //     "info"
              //   )
              // }
              size="sm"
              color="danger"
              title="Archive"
            >
              <MDBIcon icon="trash" />
            </MDBBtn>
          </MDBBtnGroup>
        )}
      </td>
    </tr>
  );
}
