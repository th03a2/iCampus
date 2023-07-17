import React, { useEffect, useState } from "react";
import { MDBBtn, MDBCheckbox, MDBIcon } from "mdb-react-ui-kit";
import { currencyFormatter } from "./../../../../../../../../components/utilities";
import Swal from "sweetalert2";
import { Services } from "./../../../../../../../../fakeDb";
import { ADDITEM } from "../../../../../../../../redux/slices/commerce/pos";
import { useDispatch, useSelector } from "react-redux";

export default function TableCard({ item, index, page, usage }) {
  const [title, setTitle] = useState(""),
    [srp, setSrp] = useState(0),
    { category } = useSelector(({ pos }) => pos),
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

      setTitle(str);
    }
  }, [item]);

  useEffect(() => {
    if (item._id) {
      setSrp(item[category === "walkin" ? "opd" : category]);
    }
  }, [item, category]);

  const AddItem = item => dispatch(ADDITEM(item));

  return (
    <tr title={`Services: ${title}`}>
      {usage === "default" ? (
        <td>{++index + (page - 1) * 6}</td>
      ) : (
        <td>
          <MDBCheckbox />
        </td>
      )}
      <td>
        <p className="fw-normal mb-1">{item.name || item.abbreviation}</p>
      </td>
      <td>
        <p className="fw-normal text-center mb-1">{currencyFormatter(srp)}</p>
      </td>
      {usage === "default" && (
        <td className="text-center">
          {srp > 0 ? (
            <MDBBtn
              onClick={() => AddItem(item)}
              size="sm"
              title="Transfer package transaction."
            >
              <MDBIcon icon="share-square" />
            </MDBBtn>
          ) : (
            <MDBBtn
              onClick={() =>
                Swal.fire(
                  "No Price Tags",
                  `Inform the admin to set a price for ${String(
                    category
                  ).toUpperCase()} Patient!`,
                  "info"
                )
              }
              size="sm"
              color="info"
              title="Information."
            >
              <MDBIcon fas icon="info-circle" />
            </MDBBtn>
          )}
        </td>
      )}
    </tr>
  );
}
