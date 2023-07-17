import React, { useEffect, useState } from "react";
import { MDBRow, MDBContainer, MDBCol } from "mdb-react-ui-kit";
import BreadCrumb from "../../../../../components/breadcrumb";
import { LIST } from "../../../../../redux/slices/responsibilities/qc";
import { TBLassurance } from "../../../../../templates/Responsibilities";
import { useDispatch, useSelector } from "react-redux";
import { Services } from "../../../../../fakeDb";

const path = [
  {
    path: "Quality",
  },
];

export function Quality() {
  const { token, onDuty } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ qc }) => qc),
    [assurance, setAssurance] = useState([]),
    [page] = useState(1),
    [serviceId, setServiceId] = useState(null),
    dispatch = useDispatch();

  useEffect(() => {
    if (onDuty._id && serviceId > 0) {
      dispatch(LIST({ branchId: onDuty._id, serviceId, token }));
    }
  }, [serviceId, onDuty, dispatch, token]);

  useEffect(() => {
    setAssurance(catalogs);
  }, [catalogs]);

  return (
    <>
      <BreadCrumb title="Quality Assurance" paths={path} button={false} />
      <MDBContainer className="py-5 mt-4">
        <MDBRow className="mb-3 d-flex justify-content-center">
          <MDBCol md={4}>
            <select
              className="form-select form-control text-center"
              onChange={e => setServiceId(e.target.value)}
            >
              <option value={0}>Services</option>
              {Services.collection.map(({ id, name }) => (
                <option value={id}>{name}</option>
              ))}
            </select>
          </MDBCol>
        </MDBRow>

        <TBLassurance assurance={assurance} page={page} />
      </MDBContainer>
      ;
    </>
  );
}
