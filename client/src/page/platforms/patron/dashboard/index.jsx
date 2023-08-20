import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBCardTitle,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import Company from "../../../../fakeDb/company";
// import { nameFormatter } from "../../../../components/utilities";
import BreadCrumb from "../../../../components/breadcrumb";
import { BROWSE } from "../../../../redux/slices/query";
import { SCHOOL } from "../../../../redux/slices/assets/enrollment";
import levels from "../../../../fakeDb/json/levels";
import "./index.css";
import Modal from "./modal";

export default function Unset() {
  const { schools } = useSelector(({ enrollment }) => enrollment);
  const { catalogs } = useSelector(({ query }) => query),
    { token, auth } = useSelector(({ auth }) => auth),
    [modal, setModal] = useState(false),
    [populations, setPopulation] = useState([]),
    [students, setStudents] = useState([]),
    [batchs, setBatchs] = useState([]),
    [totalEnrolleesFemale, setTotalEnrolleesFemale] = useState([]),
    [totalEnrolleesMale, setTotalEnrolleesMale] = useState([]),
    [totalEnrolleePending, setTotalEnrolleePending] = useState([]),
    [totalEnrolleeDeny, setTotalEnrolleeDeny] = useState([]),
    [totalEnrollees, setTotalEnrollees] = useState([]),
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
    setTotalEnrollees(studentFilter);

    const pending = catalogs.filter((data) => data.status === "pending");
    setTotalEnrolleePending(pending ? pending : []);

    const deny = catalogs.filter((data) => data.status === "deny");
    setTotalEnrolleeDeny(deny ? deny : []);

    if (studentFilter.length > 0) {
      const female = studentFilter.filter(
        (data) => data.student.isMale === false
      );
      const male = studentFilter.filter((data) => data.student.isMale === true);
      setTotalEnrolleesFemale(female.length > 0 ? female : []);
      setTotalEnrolleesMale(male.length > 0 ? male : []);
      const newArray = populations.reduce((result, student) => {
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

  const addressFormatter = (address) => {
    if (typeof address === "object") {
      const { province, city } = address;
      return city + " " + province;
    }
  };

  return (
    <>
      <BreadCrumb title="Dasboard" />
      <Modal visibility={modal} setVisibility={toggle} />
      <MDBContainer className="py-5 mt-4">
        <h3 className="text-center">
          <strong>
            {batchs[0]?.companies[0]?.name}
            {" #" + batchs[0]?.companies[0]?.schoolId}
          </strong>
        </h3>
        <h5 className="text-center">
          <strong> {addressFormatter(batchs[0]?.companies[0]?.address)}</strong>
          <strong>{addressFormatter(batchs[0]?.companies[0]?.schoolId)}</strong>
        </h5>
        <MDBRow className="d-flex justify-content-center mt-3">
          <MDBCol md={6}>
            <MDBCard>
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className="mt-1"
              >
                <h6 className="bg-warning">
                  <strong> {"Pending: " + totalEnrolleePending.length}</strong>{" "}
                </h6>
                <h6 className="bg-danger">
                  <strong> {"Deny: " + totalEnrolleeDeny.length}</strong>
                </h6>
              </div>
              <MDBCardBody>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h1 className="text-start mt-4">
                    <MDBIcon fas icon="female" color="warning" />
                    <strong>{" " + totalEnrolleesFemale.length}</strong>
                  </h1>
                  <h1 className="text-end display-2">
                    <strong>{totalEnrollees.length}</strong>
                  </h1>
                  <h1 className="text-center mt-4">
                    <MDBIcon fas icon="male" color="warning" />
                    <strong>{" " + totalEnrolleesMale.length}</strong>
                  </h1>
                </div>
              </MDBCardBody>
              <MDBCardTitle className="text-center">
                <strong>Populations</strong>
              </MDBCardTitle>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <MDBRow className="mt-4 d-flex justify-content-center">
          {Object.entries(students).map(([key, value]) => {
            console.log(value);
            const female = value.filter(
              (data) =>
                data.student.isMale === false && data.status === "approved"
            );
            const male = value.filter(
              (data) =>
                data.student.isMale === true &&
                data.student.status === "approved"
            );
            const pending = value.filter((data) => data.status === "pending");
            const deny = value.filter((data) => data.status === "deny");
            const approved = value.filter((data) => data.status === "approved");
            return (
              <MDBCol md={3}>
                <MDBCard className="mt-2">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                    className="mt-1"
                  >
                    <h6 className="bg-warning">
                      <strong> {"Pending: " + pending.length}</strong>
                    </h6>
                    <h6 className="bg-danger">
                      <strong>{"Deny: " + deny.length}</strong>
                    </h6>
                  </div>
                  <MDBCardBody className="text-center">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h3 className="text-start mt-3">
                        <MDBIcon fas icon="female" color="warning" />
                        <strong>{" " + female.length}</strong>
                      </h3>
                      <div>
                        <h1
                          className="text-end display-5"
                          style={{ paddingRight: "30px" }}
                        >
                          <strong>{approved.length}</strong>
                        </h1>
                        <h6>
                          <strong>Populations</strong>
                        </h6>
                      </div>

                      <h3 className="text-center mt-3">
                        <MDBIcon fas icon="male" color="warning" />
                        <strong>{" " + male.length}</strong>
                      </h3>
                    </div>
                  </MDBCardBody>
                  <MDBCardTitle className="text-center">
                    <h5>
                      <strong>{key}</strong>
                    </h5>
                  </MDBCardTitle>
                </MDBCard>
              </MDBCol>
            );
          })}
        </MDBRow>
      </MDBContainer>
    </>
  );
}
