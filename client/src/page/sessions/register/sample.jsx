import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBTabsContent,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import Basic from "./components/basic";
import Credentials from "./components/credentials";
import Address from "./components/address";
import Parents from "./components/parents";
import Agreement from "./components/agreement";
import { toast } from "react-toastify";
import { register, validateContactNumber } from "../../../components/utilities";
import { useNavigate } from "react-router-dom";

const tabs = [
  {
    title: "Informations",
    key: "basic",
  },
  {
    title: "Parents",
    key: "parents",
  },
  {
    title: "Address",
    key: "address",
  },
  {
    title: "Credentials",
    key: "credentials",
  },
  {
    title: "Agreement",
    key: "agreement",
  },
];

export default function Registration() {
  const [activeItem, setActiveItem] = useState("basic"),
    [form, setForm] = useState({
      fullName: {
        fname: "",
        mname: "",
        lname: "",
        suffix: "",
      },
      address: {
        street: "",
        barangay: "",
        region: "",
        city: "",
        province: "",
      },
      dob: "",
      mobile: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreed: false,
      tabs: {
        basic: true,
        address: false,
        credentials: false,
        agreement: false,
        parents: false,
      },
    }),
    navigate = useNavigate();

  useEffect(() => {
    if (form.agreed) {
      console.log(form);
      if (form.password === form.confirmPassword) {
        register(form)
          .then((res) => {
            if (res) {
              navigate("/login");
              toast.success(`Welcome aboard ${form.fullName.fname}!`);
            }
          })
          .catch((err) => toast.error(err.message));
      } else {
        toast.warn("Passwords does not match!");
      }
      toast.success("save mona thom");
    }
  }, [form]);

  const handleActiveContent = (activeItem) => {
    switch (activeItem) {
      case "address":
        return (
          <Address
            setForm={setForm}
            form={form}
            setActiveItem={setActiveItem}
          />
        );

      case "credentials":
        return (
          <Credentials
            setForm={setForm}
            form={form}
            setActiveItem={setActiveItem}
          />
        );

      case "agreement":
        return (
          <Agreement
            setForm={setForm}
            form={form}
            setActiveItem={setActiveItem}
          />
        );
      case "parents":
        return (
          <Parents
            setForm={setForm}
            form={form}
            setActiveItem={setActiveItem}
          />
        );

      default:
        return (
          <Basic setForm={setForm} form={form} setActiveItem={setActiveItem} />
        );
    }
  };

  return (
    <MDBContainer
      fluid
      style={{ backgroundColor: "#f6e7d8", height: "100vh" }}
      className="d-flex align-items-center"
    >
      <MDBCol
        md={6}
        size={10}
        className="mx-auto"
        style={{ minHeight: "400px", height: "400px" }}
      >
        <MDBCard className="h-100">
          <MDBCardBody>
            <MDBTabs justify fill>
              {tabs.map((tab, index) => (
                <MDBTabsItem key={`registration-${index}`}>
                  <MDBTabsLink
                    onClick={() => {
                      if (form.tabs[tab.key]) {
                        console.log(form.tabs);
                        setActiveItem(tab.key);
                      } else {
                        toast.warn("Complete the previous tab first.");
                      }
                    }}
                    active={activeItem === tab.key}
                  >
                    {tab.title}
                  </MDBTabsLink>
                </MDBTabsItem>
              ))}
            </MDBTabs>
            <MDBTabsContent activeItem={activeItem}>
              {handleActiveContent(activeItem)}
            </MDBTabsContent>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBContainer>
  );
}
