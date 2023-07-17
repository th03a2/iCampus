import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
} from "mdb-react-ui-kit";
import { SAVE } from "../../../redux/slices/query";
import Swal from "sweetalert2";
import io from "socket.io-client";
const socket = io("http://localhost:5000");
const Cart = () => {
  const { theme, auth, token, onDuty } = useSelector(({ auth }) => auth);
  const [cart, setCart] = useState([]),
    [request, setRequest] = useState([]),
    [date, setDate] = useState(""),
    [remarks, setRemarks] = useState(""),
    dispatch = useDispatch();

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem(`${auth._id}`));
    setCart(cartData);
  }, [auth._id]);

  const handleRemove = (productId) => {
    const index = cart.findIndex((data) => data.productId === productId);
    cart.splice(index, 1);
  };
  const handleRequest = (data) => {
    const existing = request.findIndex((e) => e.name === data.name);
    if (existing > -1) {
      request.splice(existing, 1);
    } else {
      request.push(data);
    }
  };

  const handleSubmit = () => {
    if (request.length !== 0) {
      if (remarks) {
        if (date) {
          const purchase = {
            branchId: onDuty._id,
            userId: auth._id,
            expected: date,
            status: "pending",
            remarks: remarks,
          };
          const merchandises = request.map((data) => ({
            purchase: "",
            product: data._id,
            quantity: {
              request: data.quantity,
            },
            packages: data.packages,
          }));

          dispatch(
            SAVE({
              entity: "procurements/purchase",
              data: { merchandises, purchase },
              token,
            })
          );

          Swal.fire({
            icon: "success",
            title: "Request Sent!",
            showConfirmButton: false,
            timer: 1500, // Notification will automatically close after 1.5 seconds
          }).then(() => {
            // Code to execute after the modal is closed

            merchandises.map((data) => handleRemove(data.productId));
            localStorage.removeItem(auth._id);
            localStorage.setItem(auth._id, JSON.stringify(cart));
            setCart(cart);
            socket.emit("recived_cart", cart);

            if (cart.length !== 0) {
              window.location.reload();
            } else {
              window.location.href = "frontdesk/market/items";
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Request failed",
            text: "Please set expected date.",
            timer: 5000, // Close after 1000 milliseconds (1 second)
            timerProgressBar: true, // Show a progress bar for the timer
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Request failed",
          text: "Please select remarks!",
          timer: 5000, // Close after 1000 milliseconds (1 second)
          timerProgressBar: true, // Show a progress bar for the timer
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Request failed",
        text: "Please choose you want to request.",
        timer: 5000, // Close after 1000 milliseconds (1 second)
        timerProgressBar: true, // Show a progress bar for the timer
      });
    }
  };
  return (
    <MDBContainer className="">
      <MDBTable align="middle" hover responsive color={theme.color}>
        <caption>List of cart</caption>
        <caption className="caption-top">
          Total of <b>{cart?.length}</b> Cart(s)
        </caption>
        <MDBTableHead>
          <tr>
            <th>#</th>
            <th>gusto mong i request</th>
            <th>Product Name</th>
            <th>Packages</th>
            <th>Quantity</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {cart && cart.length > 0 ? (
            cart.map((data, index) => (
              <>
                <tr key={`cart-${index}`}>
                  <td>{index + 1}</td>
                  <td>
                    <MDBCheckbox onClick={() => handleRequest(data, index)} />
                  </td>
                  <td>{data.name}</td>
                  <td>{data.packages}</td>
                  <td style={{ width: "150px" }}>
                    <MDBInput
                      size="sm"
                      type="number"
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value);
                        const updatedCart = [...cart];
                        updatedCart[index].quantity = newQuantity;
                        setCart(updatedCart);
                      }}
                      value={data.quantity}
                    />
                  </td>
                </tr>
              </>
            ))
          ) : (
            <tr className="text-center">
              <td colSpan={4}>No Cart.</td>
            </tr>
          )}
        </MDBTableBody>

        <tfoot>
          <tr>
            <td colSpan={2}>
              <select
                className="form-select form-control "
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              >
                <option value={""}>Remarks</option>
                <option value={"priority"}>Priority</option>
                <option value={"regular"}>Regular</option>
              </select>
            </td>
          </tr>

          <tr>
            <td colSpan={6} style={{ textAlign: "right" }}>
              <MDBInput
                type="date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
                label="Expected Date"
              />

              <MDBBtn
                color="primary"
                className="mt-2"
                type="button"
                onClick={handleSubmit}
              >
                Request
              </MDBBtn>
            </td>
          </tr>
        </tfoot>
      </MDBTable>
    </MDBContainer>
  );
};

export default Cart;
