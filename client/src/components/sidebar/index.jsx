import React, { useEffect, useState } from "react";
import {
  MDBListGroupItem,
  MDBListGroup,
  MDBIcon,
  MDBTypography,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import "./index.css";
import SidebarCard from "./card";
import Company from "../../fakeDb/company";
import { BASE } from "../utilities";
import {
  accreditation,
  headquarter,
  administrator,
  principal,
  hr,
  auditor,
  author,
  cashier,
  frontdesk,
  laboratory,
  nutritionist,
  radiology,
  pharmacist,
  procurement,
  utility,
  patron,
} from "../../fakeDb/library/sidebar";

const Sidebar = ({ show, toggle, dimensions }) => {
  const { onDuty, branches, auth } = useSelector(({ auth }) => auth),
    [activeMenu, setActiveMenu] = useState(null),
    [sidebar, setSidebar] = useState([]),
    navigate = useNavigate(),
    location = useLocation(),
    [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  useEffect(() => {
    if (onDuty?.designation) {
      switch (onDuty?.platform) {
        case "accreditations":
          setSidebar(accreditation);
          break;
        case "headquarter":
          setSidebar(headquarter);
          break;
        case "administrator":
          setSidebar(administrator);
          break;
        case "principal":
          setSidebar(principal);
          break;
        case "hr":
          setSidebar(hr);
          break;
        case "auditor":
          setSidebar(auditor);
          break;
        case "author":
          setSidebar(author);
          break;
        case "cashier":
          setSidebar(cashier);
          break;
        case "frontdesk":
          setSidebar(frontdesk);
          break;
        case "laboratory":
          setSidebar(laboratory);
          break;
        case "nutritionist":
          setSidebar(nutritionist);
          break;
        case "radiology":
          setSidebar(radiology);
          break;
        case "pharmacist":
          setSidebar(pharmacist);
          break;
        case "procurement":
          setSidebar(procurement);
          break;
        case "utility":
          setSidebar(utility);
          break;
        default:
          setSidebar(patron);
      }
    }
  }, [onDuty]);
  return (
    <div
      id="sidebar"
      style={{
        width: 140,
        left: !show && dimensions.width <= 768 && "-140px",
      }}
      className="sidebar-fixed position-fixed transition-all"
    >
      <span
        className="logo-wrapper waves-effect m-0 py-0 px-2 d-flex align-items-center"
        style={{ height: dimensions.width <= 768 ? "4rem" : "6rem" }}
      >
        <img
          src={Company.icon}
          draggable={false}
          style={{
            width: dimensions.width <= 768 ? "3rem" : "4.5rem",
            height: dimensions.width <= 768 ? "3rem" : "4.5rem",
          }}
          className="mx-auto"
          alt={Company.name}
        />
      </span>
      <MDBListGroup className="list-group-flush text-center">
        {sidebar.map((menus, index) => {
          if (!!menus.children) {
            return (
              <SidebarCard
                menus={menus}
                currentPath={currentPath}
                setCurrentPath={setCurrentPath}
                key={`link-${index}`}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
                toggle={toggle}
                dimensions={dimensions}
              />
            );
          } else {
            const platform = onDuty?.platform ? onDuty?.platform : "patron";
            const _path = `/${BASE}/${platform}/${menus.path}`;
            return (
              <MDBListGroupItem
                key={`sidebar-link-${index}`}
                className={`border-0 bg-transparent p-0  ${
                  dimensions.height > 800 && "py-lg-3"
                }`}
              >
                <MDBBtn
                  onClick={() => {
                    setCurrentPath(_path);
                    navigate(_path);
                    setActiveMenu(menus.name);
                    toggle();
                  }}
                  className={`m-0 px-0 w-100 shadow-0 text-light`}
                  color="transparent"
                >
                  <MDBIcon
                    icon={menus.icon}
                    size={dimensions.height < 800 ? "lg" : "2x"}
                    className={`text-${
                      currentPath === _path ? "primary" : "muted"
                    }`}
                  />
                  <MDBTypography
                    tag="h6"
                    className={`special-header mb-1 text-${
                      currentPath === _path ? "light" : "muted"
                    }`}
                  >
                    {menus.name}
                  </MDBTypography>
                </MDBBtn>
              </MDBListGroupItem>
            );
          }
        })}
        {dimensions.width <= 768 && (
          <MDBListGroupItem className="bg-transparent border-0 px-0 py-1 py-lg-3">
            <MDBBtn
              onClick={toggle}
              className={`m-0 px-0 w-100 shadow-0 text-light`}
              color="transparent"
            >
              <MDBIcon icon="times" size="lg" className="text-muted" />
            </MDBBtn>
          </MDBListGroupItem>
        )}
      </MDBListGroup>
    </div>
  );
};

export default Sidebar;
