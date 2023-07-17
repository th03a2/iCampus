import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { UPDATE } from "../../../../../redux/slices/procurments/purchase";
import { useDispatch, useSelector } from "react-redux";

export default function Modal({ visible, setVisible, purchase }) {
  const { theme, access, token, auth } = useSelector(({ auth }) => auth),
    [merchandises, setMerchandises] = useState([]),
    dispatch = useDispatch();

  useEffect(() => {
    purchase?.merchandises && setMerchandises(purchase.merchandises);
  }, [purchase]);

  const handleSubmit = (isApproved) => {
    if (isApproved) {
      dispatch(
        UPDATE({
          entitity: "procurements/purchase",
          data: {
            purchase: {
              _id: purchase._id,
              approvedBy: auth._id,
              approved: new Date().toLocaleDateString(),
              status: "approved",
            },
            merchandises,
          },
          token,
        })
      );

      Swal.fire({
        icon: "success",
        title: "Approved Success!",
        showConfirmButton: false,
        timer: 1500, // Notification will automatically close after 1.5 seconds
      }).then(() => {
        // Code to execute after the modal is closed
        setVisible(false);
        window.location.reload();
      });
    } else {
      dispatch(
        UPDATE({
          entitity: "procurements/purchase",
          data: {
            purchase: {
              _id: purchase._id,
              status: "deny",
            },
            merchandises: [],
          },
          token,
        })
      );

      Swal.fire({
        icon: "success",
        title: "Deny Success!",
        showConfirmButton: false,
        timer: 1500, // Notification will automatically close after 1.5 seconds
      }).then(() => {
        // Code to execute after the modal is closed
        setVisible(false);
        window.location.reload();
      });
    }
  };
  const handleMerchandises = (e) => {
    const { name, value } = e.target;
    const merchandise = { ...merchandises[name] };
    const quantity = { ...merchandise.quantity };

    quantity.approved = Number(value);

    merchandise.quantity = quantity;

    let _merchandises = [...merchandises];
    _merchandises[name] = merchandise;
    setMerchandises(_merchandises);
  };

  return (
    <>
      <MDBBtn onClick={() => setVisible(false)}>Products Approval</MDBBtn>
      <MDBModal show={visible} setShow={setVisible} tabIndex="-1">
        <MDBModalDialog size="xl">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle></MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setVisible(false)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBTable align="middle" hover responsive color={theme.color}>
                <MDBTableHead>
                  <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Package</th>
                    <th>Quantity</th>
                    {access && <th>Approve Quantity</th>}
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {merchandises?.length > 0 ? (
                    merchandises?.map((data, index) => (
                      <tr key={`machines-${index}`}>
                        <td>{1 + index}</td>
                        <td>{data?.product?.name}</td>
                        <td>
                          {data.product?.packages &&
                            Object.keys(data?.product.packages).map((key) => (
                              <span>{key}</span>
                            ))}
                        </td>
                        <td>{data.quantity?.request}</td>
                        <td>
                          {access && (
                            <MDBInput
                              type="number"
                              name={index}
                              onChange={handleMerchandises}
                              value={
                                data.quantity?.approved ||
                                data.quantity?.request
                              }
                            />
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="text-center">
                      <td colSpan={3}>No Request.</td>
                    </tr>
                  )}
                </MDBTableBody>
              </MDBTable>
            </MDBModalBody>

            <MDBModalFooter>
              {access ? (
                <>
                  <MDBBtn color="secondary" onClick={() => setVisible(false)}>
                    Close
                  </MDBBtn>
                  <MDBBtn type="button" onClick={() => handleSubmit(false)}>
                    Deny
                  </MDBBtn>
                  <MDBBtn type="button" onClick={() => handleSubmit(true)}>
                    Approved
                  </MDBBtn>
                </>
              ) : (
                <MDBBtn color="secondary" onClick={() => setVisible(false)}>
                  Close
                </MDBBtn>
              )}
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
