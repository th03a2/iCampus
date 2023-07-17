import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Chart from "react-apexcharts";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { BROWSE } from "../../../../../redux/slices/responsibilities/qc";
import BreadCrumb from "../../../../../components/breadcrumb";
import Monthly from "../../../../../widgets/monthly";
import { Services } from "../../../../../fakeDb";
import io from "socket.io-client";
// Railway update
const socket = io("http://localhost:5000");
// const socket = io("https://pinoyimd.up.railway.app/");

const path = [
  {
    path: "Quality Controll",
  },
];

export function QControll() {
  const { token, onDuty } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ qc }) => qc),
    [categories, setCategories] = useState([]),
    [data, setData] = useState([]),
    [serviceId, setServiceId] = useState(null),
    [year, setYear] = useState(""),
    [month, setMonth] = useState(""),
    dispatch = useDispatch();

  useEffect(() => {
    if ((year, month, serviceId)) {
      dispatch(
        BROWSE({
          data: { branchId: onDuty._id, year, month, serviceId },
          token,
        })
      );
    } else {
      console.log("Please Select Year");
    }
  }, [year, month, onDuty, token, dispatch, serviceId]);

  useEffect(() => {
    setCategories(
      Array.from(
        new Set(catalogs.map(catalog => new Date(catalog.createdAt).getDate()))
      )
    );

    const abnormal = Array.from(catalogs.map(data => data.abnormal));
    const high = Array.from(catalogs.map(data => data.high));
    const normal = Array.from(catalogs.map(data => data.normal));

    setData([
      { name: "abnormal", data: abnormal },
      { name: "high", data: high },
      { name: "normal", data: normal },
    ]);
  }, [catalogs]);

  return (
    <>
      <BreadCrumb title="Quality Controll" paths={path} />
      <MDBContainer className="py-5 mt-5">
        <MDBRow className="mb-3">
          <MDBCol md={4}>
            <select
              className="form-select form-control"
              value={year}
              onChange={e => setYear(Number(e.target.value))}
            >
              <option>Year</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
            </select>
          </MDBCol>
          <MDBCol md={4}>
            <Monthly month={month} setMonth={setMonth} />
          </MDBCol>
          <MDBCol md={4} className="text-right">
            <select
              className="form-select form-control"
              onChange={e => setServiceId(e.target.value)}
            >
              <option>Services</option>
              {Services.collection.map(({ id, name }) => (
                <option value={id}>{name}</option>
              ))}
            </select>
          </MDBCol>
        </MDBRow>
        <MDBContainer className="mt-4 d-flex justify-content-center">
          {serviceId ? (
            <MDBCard className="align-items-center">
              <MDBCardBody fluid={true}>
                <Chart
                  options={{
                    chart: {
                      id: "dashboard-sales",
                    },
                    xaxis: {
                      categories,
                    },
                  }}
                  series={data}
                  type="line"
                  width="220%"
                />
              </MDBCardBody>
            </MDBCard>
          ) : (
            <h6>No data.</h6>
          )}
        </MDBContainer>
      </MDBContainer>
    </>
  );
}
