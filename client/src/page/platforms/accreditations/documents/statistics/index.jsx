import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBTableBody,
  MDBTableHead,
  MDBTable,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
// import BreadCrumb from "../../../../../components/breadcrumb/";
// import BreadCrumb from "../../../../../components/accreditations/breadcrumb";

import { FILTER } from "../../../../../redux/slices/query";
import { Services } from "../../../../../fakeDb";
import BreadCrumbMonthly from "../../../../../components/breadcrumb/monthly";
const path = [
  {
    path: "Statistics",
  },
];

export function Statistics() {
  const { token, onDuty } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ query }) => query),
    [menus, setMenus] = useState([]),
    [menusStat, setMenusStat] = useState([]),
    [servicesArray, setServicesArray] = useState([]),
    [serviceStat, setServiceStat] = useState([]),
    dispatch = useDispatch();

  useEffect(() => {
    onDuty?._id &&
      dispatch(
        FILTER({
          entity: "commerce/items/monthly",
          data: { branchId: onDuty?._id, year: 2023, month: 6 },
          token,
        })
      );
  }, [onDuty, dispatch, token]);

  useEffect(() => {
    catalogs.menus && setMenus(catalogs.menus);
    if (catalogs.menusArray) {
      const duplicateMenuss = catalogs.menusArray.reduce(
        (acc, currentValue) => {
          acc[currentValue] = (acc[currentValue] || 0) + 1;
          return acc;
        },
        {}
      );
      setMenusStat(duplicateMenuss);
    }
    if (catalogs.services) {
      setServicesArray(catalogs.services);
      const duplicateServices = catalogs.services.reduce(
        (acc, currentValue) => {
          acc[currentValue] = (acc[currentValue] || 0) + 1;
          return acc;
        },
        {}
      );
      setServiceStat(duplicateServices);
    }
  }, [catalogs]);

  return (
    <>
      {/* <BreadCrumb title="Services Statistics" paths={path} button={false} /> */}
      <BreadCrumbMonthly />
      <MDBContainer className="py-5 mt-4">
        <MDBCard>
          <MDBCardBody>
            <MDBRow>
              <MDBCol md={6}>
                <MDBTable
                  responsive
                  bordered
                  className="text-center border-dark"
                >
                  <MDBTableHead>
                    <th>#</th>
                    <th>Menus</th>
                    <th>Count</th>
                  </MDBTableHead>
                  <MDBTableBody>
                    {servicesArray?.length > 0 ? (
                      Object.entries(menusStat).map(([key, value], index) => {
                        return (
                          <tr key={`Menus-${key}`}>
                            <td>{1 + index}</td>
                            <td>{menus.find(menu => menu._id === key).name}</td>
                            <td>{value}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr className="text-center">
                        <td colSpan={3}>No Employees.</td>
                      </tr>
                    )}
                  </MDBTableBody>
                </MDBTable>
              </MDBCol>
              <MDBCol md={6}>
                <MDBTable
                  responsive
                  bordered
                  className="text-center border-dark"
                >
                  <MDBTableHead>
                    <th>#</th>
                    <th>Service</th>
                    <th>Count</th>
                  </MDBTableHead>
                  <MDBTableBody>
                    {servicesArray?.length > 0 ? (
                      Object.entries(serviceStat).map(([key, value], index) => {
                        return (
                          <tr key={`Services-${key}`}>
                            <td>{1 + index}</td>
                            <td>{Services.find(key).name}</td>
                            <td>{value}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr className="text-center">
                        <td colSpan={3}>No Employees.</td>
                      </tr>
                    )}
                  </MDBTableBody>
                </MDBTable>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
}
