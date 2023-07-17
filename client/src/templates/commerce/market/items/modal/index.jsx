import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBCardImage,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";

import defaultImage from "../../../../../assets/images/image.png";
import { ENDPOINT } from "../../../../../components/utilities";
import { SAVECART } from "../../../../../redux/slices/query";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
const socket = io("http://localhost:5000");
export default function Modal({ item, visibility, setVisibility }) {
  const { auth, cart } = useSelector(({ auth }) => auth);
  const [quantity, setQuantity] = useState(1),
    [packages, setPackages] = useState(""),
    [take, setCart] = useState([]),
    dispatch = useDispatch();

  useEffect(() => {
    socket.on("received_cart", (data) => {
      setCart(data);
    });
  }, [cart]);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleCart = () => {
    const existing = localStorage.getItem(`${auth._id}`);

    if (existing) {
      // this if is to exisiting user _id or already to use to cart

      const datas = JSON.parse(existing);
      const filter = datas.filter((data) => data.name === item.name);
      const index = datas.findIndex((data) => data.name === item.name);

      if (packages) {
        // itong if na ito ay ibig sabihin nakapili siya ng packages ng product
        if (index > -1) {
          // itong if na ito ay para malaman kung meron naba siyang product na ganun kung meron na iuupdate nalang yung quantity ng
          //cart niya
          const update = {
            ...filter[0],
            quantity: filter[0].quantity + quantity,
            packages: filter[0].packages,
          };
          datas[index] = update;
        } else {
          //itong else na ito ay para sa panibagong order niya ibig sabihin di pa siya nakakapag cart nang ganung product
          datas.push({ ...item, quantity, packages });
        }
        localStorage.setItem(auth._id, JSON.stringify(datas));
        setQuantity(1);
        Swal.fire({
          icon: "success",
          title: "Added to Cart!",
          showConfirmButton: false,
          timer: 1500, // Notification will automatically close after 1.5 seconds
        }).then(() => {
          // Code to execute after the modal is closed
          dispatch(SAVECART(datas));
          setVisibility(false);
        });
      } else {
        //itong else na ito ay ibig sabihin hindi siya nakapili ng package ng product na iaadd to cart niya
        Swal.fire({
          icon: "error",
          title: "Please choose packages!",
          showConfirmButton: false,
          timer: 1500, // Notification will automatically close after 1.5 seconds
        });
      }
    } else {
      // this else is to  if _id of user is not existing or not already to add to cart
      if (packages) {
        const json = {
          ...item,
          quantity,
          packages,
        };
        take.push(json);
        localStorage.setItem(auth._id, JSON.stringify(take));

        Swal.fire({
          icon: "success",
          title: "Added to Cart!",
          showConfirmButton: false,
          timer: 1500, // Notification will automatically close after 1.5 seconds
        }).then(() => {
          // Code to execute after the modal is closed
          dispatch(SAVECART(take));
          setQuantity(1);
          setVisibility(false);
        });
      } else {
        //itong else na ito ay ibig sabihin hindi siya nakapili ng package ng product na iaadd to cart niya
        Swal.fire({
          icon: "error",
          title: "Please choose packages!",
          showConfirmButton: false,
          timer: 1500, // Notification will automatically close after 1.5 seconds
        });
      }
    }
  };
  console.log(packages);
  return (
    <>
      <MDBModal
        show={visibility}
        setShow={setVisibility}
        tabIndex="-1"
        staticBackdrop
      >
        <MDBModalDialog size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>
                {item.name && item.name.toUpperCase()}
              </MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setVisibility(false)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBRow>
                <MDBCol md={12}>
                  <MDBCardImage
                    src={
                      item.isUpload
                        ? `${ENDPOINT}/public/products/${item.name}.png`
                        : defaultImage
                    }
                    className="mx-auto rounded img-max img-fluid mb-1 d-flex justify-content-center"
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md={12}>
                  <h3 className="text-center">{item.name}</h3>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md={6}>
                  <span>Packages</span>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md={6}>
                  {item?.packages &&
                    Object.keys(item?.packages).map((key) => (
                      <MDBBtn
                        key={key}
                        color="primary"
                        outline={packages !== key}
                        onClick={() => setPackages(key)}
                        size="sm"
                        type="button"
                      >
                        {key}
                      </MDBBtn>
                    ))}
                </MDBCol>
              </MDBRow>
              <MDBRow className="mt-3">
                <MDBCol md={12}>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Quantity</span>
                    </div>
                    <input
                      type="text"
                      className="form-control text-center"
                      value={quantity}
                      readOnly
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={handleDecrease}
                      >
                        -
                      </button>
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={handleIncrease}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn onClick={handleCart}>Add to cart</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
