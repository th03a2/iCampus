import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBCol,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBBadge,
  MDBTooltip,
} from "mdb-react-ui-kit";
import Company from "../../fakeDb/company";
import { useSelector } from "react-redux";
import NavbarProfile from "./profile";
import "../breadcrumb/index.css";
// import NavbarNotifications from "./notification";
// import NavbarTodo from "./todo";
import NavSettings from "./settings";
import "./index.css";
import BranchSwitcher from "./branchSwitcher";
import { Role } from "../../fakeDb";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
const socket = io("http://localhost:5000");
const TopNavigation = ({ toggle }) => {
  const { theme, onDuty, branches, auth } = useSelector(({ auth }) => auth),
    { cart } = useSelector(({ query }) => query),
    [visibility, setVisibility] = useState(false),
    [hasPendingPurchase, setHasPendingPurchase] = useState(false),
    [quantity, setQuantity] = useState(null),
    [role, setRole] = useState({});
  const navigate = useNavigate();

  // useEffect(() => {
  //   socket.on("send_cart", data => {
  //     if (!!data) {
  //       if (data === "medtech" || data === "manager" || data === "medtech") {
  //         setHasPendingPurchase(false);
  //       } else {
  //         if (data.length !== 0) {
  //           setHasPendingPurchase(true);
  //           setQuantity(data.length);
  //         } else {
  //           setHasPendingPurchase(false);
  //         }
  //       }
  //     } else {
  //       setHasPendingPurchase(false);
  //     }
  //   });
  // }, [auth._id]);

  useEffect(() => {
    if (!!cart) {
      setQuantity(cart.length);
      setHasPendingPurchase(true);
    }
  }, [cart]);

  useEffect(() => {
    onDuty?.designation && setRole(Role.find(onDuty?.designation));
  }, [onDuty]);

  return (
    <MDBNavbar
      expand="lg"
      dark={theme.dark}
      className={theme.topbar}
      fixed="top"
      style={{ minWidth: "450px" }}
    >
      <MDBContainer fluid className="py-2 transition-all">
        <MDBCol size={1}>
          {toggle ? (
            <MDBBtn
              onClick={toggle}
              size="sm"
              color="transparent"
              className="shadow-0"
            >
              <MDBIcon icon="bars" size="lg" className="custom-navbar-icon" />
            </MDBBtn>
          ) : (
            <MDBNavbarBrand className={`cursor-pointer ${theme.text}`}>
              {Company.name}
            </MDBNavbarBrand>
          )}
        </MDBCol>
        <MDBCol>
          <MDBNavbarNav className="d-flex flex-row justify-content-between">
            <MDBNavbarItem className={`${theme.text} ms-md-5 ms-2`}>
              <MDBTooltip
                tag="span"
                wrapperClass="d-inline-block"
                title={Company?.name}
                placement="bottom"
              >
                <MDBBadge
                  pill
                  color="secondary"
                  className="cursor-pointer"
                  onClick={() => branches.length > 1 && setVisibility(true)}
                >
                  {onDuty?.name}
                </MDBBadge>
              </MDBTooltip>
              <MDBTooltip
                tag="span"
                wrapperClass="d-inline-block"
                title={role?.display_name}
                placement="bottom"
              >
                <MDBBadge pill className="cursor-pointer">
                  {onDuty?.category?.toUpperCase()}
                </MDBBadge>
              </MDBTooltip>
            </MDBNavbarItem>
            <span className="d-flex">
              {/* <NavbarTodo /> */}
              {/* <NavbarNotifications /> */}
              {hasPendingPurchase && (
                <MDBBtn
                  onClick={() => navigate(`/snapshot/cart`)}
                  className="btn btn-sm "
                >
                  <MDBIcon icon="shopping-cart" />
                  <span className="cart-quantity">{quantity}</span>
                </MDBBtn>
              )}
              <NavSettings />
              <NavbarProfile />
            </span>
          </MDBNavbarNav>
        </MDBCol>
      </MDBContainer>
      <BranchSwitcher visibility={visibility} setVisibility={setVisibility} />
    </MDBNavbar>
  );
};

export default TopNavigation;
