import React, { useState, useEffect } from "react";
import { MDBBtn, MDBBtnGroup, MDBIcon } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { DESTROY } from "../../../../../../../../../redux/slices/commerce/menus";
import { toast } from "react-toastify";

export default function TableCard({ item, branchId }) {
  const { theme, token } = useSelector(({ auth }) => auth),
    [title, setTitle] = useState(""),
    dispatch = useDispatch();

  useEffect(() => {
    if (item._id) {
      var str = "";

      item.services?.map((service, index) => {
        str += `${service.abbreviation || service.name}${
          item.services.length - 1 !== index ? ", " : ""
        }`;
      });

      setTitle(str);
    }
  }, [item]);

  return (
    <tr title={title}>
      <td>
        <p className="fw-normal mb-1">{item.name}</p>
      </td>
      <td className="text-center">
        <MDBBtnGroup className="shadow-0">
          <MDBBtn
            onClick={() => toast.info("Future update.")}
            size="sm"
            title="Activate promo."
          >
            <MDBIcon icon={item.isPromo ? "bell-slash" : "bell"} />
          </MDBBtn>
          <MDBBtn
            onClick={() =>
              window.open(
                `/platform/owner/menus/${btoa(branchId)}/${btoa(item._id)}`
              )
            }
            size="sm"
            color="info"
            title="View information."
          >
            <MDBIcon icon="eye" />
          </MDBBtn>
          <MDBBtn
            onClick={() =>
              Swal.fire({
                icon: "warning",
                title: "Are you sure?",
                html: `You won't be able to revert this!`,
                showCancelButton: true,
                confirmButtonText: "Yes, continue!",
              }).then(result => {
                if (result.isConfirmed) {
                  dispatch(DESTROY({ id: item._id, token }));
                }
              })
            }
            size="sm"
            color={theme.color}
            title="Send package to archive."
          >
            <MDBIcon icon="trash" />
          </MDBBtn>
        </MDBBtnGroup>
      </td>
    </tr>
  );
}
