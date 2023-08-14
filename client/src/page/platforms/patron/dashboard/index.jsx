import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import Company from "../../../../fakeDb/company";
// import { nameFormatter } from "../../../../components/utilities";
import BreadCrumb from "../../../../components/breadcrumb";
import { BROWSE } from "../../../../redux/slices/query";
import { SCHOOL } from "../../../../redux/slices/assets/enrollment";
import levels from "../../../../fakeDb/json/levels";
import Modal from "./modal";

export default function Unset() {
  const { schools } = useSelector(({ enrollment }) => enrollment);
  const { catalogs } = useSelector(({ query }) => query),
    { token, auth } = useSelector(({ auth }) => auth),
    [modal, setModal] = useState(false),
    [populations, setPopulation] = useState([]),
    [students, setStudents] = useState([]),
    [batchs, setBatchs] = useState([]),
    dispatch = useDispatch();

  useEffect(() => {
    if (auth._id) {
      dispatch(
        BROWSE({
          entity: "assets/enrollment",
          data: { status: "dashboard" },
          token,
        })
      );
    }
  }, [auth._id, token, dispatch]);

  useEffect(() => {
    if (auth._id) {
      dispatch(
        SCHOOL({
          token,
        })
      );
    }
  }, [auth._id, token, dispatch]);

  useEffect(() => {
    setBatchs(schools);
  }, [schools]);

  useEffect(() => {
    setPopulation(catalogs);
  }, [catalogs]);

  useEffect(() => {
    const studentFilter = populations.filter(
      (population) => population.status === "approved"
    );

    if (studentFilter.length > 0) {
      const newArray = studentFilter.reduce((result, student) => {
        const section = levels.find(({ id }) => id === student.levelId);
        if (!result[section?.description]) {
          result[section.description] = [student];
        } else {
          result[section.description].push(student);
        }
        return result;
      }, []);
      setStudents(newArray);
    }
  }, [populations]);

  const toggle = () => setModal(!modal);

  const handleSubmit = () => {};

  return (
    <>
      <BreadCrumb title="Dasboard" />
      <Modal visibility={modal} setVisibility={toggle} />
      <MDBContainer className="py-5 mt-4">
        <h3 className="text-center">
          <strong>{batchs[0]?.companies[0]?.name}</strong>
        </h3>
        <MDBRow className="mt-5">
          {Object.entries(students).map(([key, value]) => (
            <MDBCol md={4}>
              <MDBCard>
                <MDBCardBody className="text-center">
                  <h4>
                    <strong>{key}</strong>
                  </h4>
                </MDBCardBody>
                <MDBCardTitle className="text-center">
                  Total Enrolled: <strong>{value.length}</strong>
                </MDBCardTitle>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
        {/* <MDBCard className={`p-0 ${theme.bg} ${theme.text}`}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol md="8" size="12">
                <MDBTypography tag="h4" className="small-corps mb-3">
                  PINOY iMD
                </MDBTypography>
                <MDBTypography tag="h3" className="large-corps mb-4">
                  PINOY integrated Medical Diagnostic System
                </MDBTypography>
                <MDBTypography tag="h6" className="mb-2">
                  Welcome,{" "}
                  <u>
                    <strong>
                      {auth.isMale ? "Sir " : "Ma'am "}
                      {nameFormatter(auth.fullName)}
                    </strong>
                  </u>
                  , We are happy to have you on board!
                </MDBTypography>
                <MDBTypography tag="h6" className="mb-4">
                  There are different choices at the sidebar where you can
                  choose to be a/an:
                </MDBTypography>
                <MDBTypography
                  onClick={toggle}
                  note
                  noteColor="primary"
                  className="text-dark"
                >
                  <strong>Aspirant: </strong> A user that manages a company
                  {/* a user that aspire to be the CEO of certain company */}
        {/* </MDBTypography>
                <MDBTypography note noteColor="info" className="text-dark">
                  <strong>Employee: </strong> A user that is associated with
                  certain branches
                </MDBTypography>
                <MDBTypography note noteColor="secondary" className="text-dark">
                  <strong>Patron: </strong> a customer, especially a regular
                  one..
                </MDBTypography>
              </MDBCol>
              <MDBCol md="4" size="12" className="text-center">
                <img
                  src={Company.logo}
                  className="img-fluid rounded img-thumbnail"
                  alt="PINOY iMD logo"
                />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard> */}{" "}
        {/* <div className="text-center mt-4">
        <div className="large-corps mb-3 w-50 mx-auto">
          More than a hundred cases solved every month
        </div>
        <div className="norm-corps w-75 mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
          voluptatum dicta eos fugiat tenetur illum iste eaque autem,
          perferendis eveniet facere eum numquam vero, deleniti consectetur
          explicabo ipsam, amet quam.
        </div>
      </div> */}
      </MDBContainer>
    </>
  );
}
