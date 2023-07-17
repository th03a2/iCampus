import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { MDBRow, MDBContainer } from "mdb-react-ui-kit";
import BreadCrumb from "../../../../../components/breadcrumb";
import { MDBCol, MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import Monthly from "../../../../../widgets/monthly";
import { LIST } from "../../../../../redux/slices/query";
import { useDispatch, useSelector } from "react-redux";

const path = [
  {
    path: "Temperature",
  },
];

export function Temperature() {
  const { token, onDuty } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ query }) => query),
    [year, setYear] = useState(0),
    [month, setMonth] = useState(""),
    [data, setData] = useState([]),
    [categories, setCategories] = useState([]),
    dispatch = useDispatch();

  useEffect(() => {
    if (year) {
      dispatch(
        LIST({
          entity: "monitorings/temperatures",
          data: { year, month, branchId: onDuty._id },
          token,
        })
      );
    }
  }, [year, month, dispatch, onDuty, token]);

  useEffect(() => {
    setCategories(
      Array.from(
        new Set(
          catalogs.map((catalog) => new Date(catalog.createdAt).getDate())
        )
      )
    );

    const amRoom = Array.from(catalogs.map((data) => data.AmRoom));
    const pmRoom = Array.from(catalogs.map((data) => data.PmRoom));
    const amRef = Array.from(catalogs.map((data) => data.AmRef));
    const pmRef = Array.from(catalogs.map((data) => data.PmRef));

    setData([
      { name: "AmRoom", data: amRoom },
      { name: "PmRoom", data: pmRoom },
      { name: "AmRef", data: amRef },
      { name: "PmRef", data: pmRef },
    ]);
  }, [catalogs]);

  return (
    <>
      <BreadCrumb title="Temperature" paths={path} button={false} />
      <MDBContainer className="py-5 mt-4">
        <MDBRow className="mb-3">
          <MDBContainer className="d-flex justify-content-center">
            <MDBCol md={4} className="px-2">
              <select
                className="form-select form-control"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              >
                <option>Year</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            </MDBCol>
            <MDBCol md={4} className="px-2">
              <Monthly setMonth={setMonth} />
            </MDBCol>
          </MDBContainer>
        </MDBRow>
        <MDBContainer className="mt-4 d-flex justify-content-center">
          <MDBCard className="align-items-center">
            <MDBCardBody fluid={"true"}>
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
        </MDBContainer>
      </MDBContainer>
    </>
  );
}
