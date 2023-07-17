import React, { useEffect } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import Overview from "./overview";
import { Services } from "../../../../../../../../../fakeDb";
import {
  SETPACKAGE,
  SETSIGNATORIES,
  SETSERVICES,
} from "../../../../../../../../../redux/slices/task/forms";

const Index = () => {
  const { theme, onDuty, auth } = useSelector(({ auth }) => auth),
    { patron, packages, preferences, services, form } = useSelector(
      ({ task }) => task
    ),
    dispatch = useDispatch();

  useEffect(() => {
    if (packages && onDuty._id) {
      dispatch(SETSIGNATORIES({ encoder: auth?._id, section: form }));
      const _keys = Object.keys(packages);
      const _deals = _keys.map(fk => {
        let service = { ...Services.find(fk) };
        if (service.preference === "equal") {
          service.reference = preferences.find(
            ({ serviceId }) => serviceId === Number(fk)
          );
        } else if (service.preference === "gender") {
          service.reference = preferences.find(
            ({ serviceId, isMale }) =>
              serviceId === Number(fk) && isMale === patron.isMale
          );
        } else if (service.preference === "development") {
          service.reference = preferences.find(
            ({ serviceId, development }) =>
              serviceId === Number(fk) && development === patron.development
          );
        }
        return service;
      });
      dispatch(SETSERVICES(_deals));
    }
  }, [packages, onDuty, dispatch, patron, preferences, auth, form]);

  const packageHandler = e => {
    const { id, value } = e.target;
    let _packages = { ...packages };
    _packages[id] = Number(value);
    dispatch(SETPACKAGE(_packages));
  };

  return (
    <MDBTable
      align="middle"
      hover
      responsive
      small
      color={theme.color}
      className="mt-2"
      striped
    >
      <MDBTableHead>
        <tr className="text-center">
          <th rowSpan={2}> # </th>
          <th rowSpan={2}> Services </th>
          <th rowSpan={2}> Result </th>
          <th colSpan={2}> Reference Value </th>
        </tr>
        <tr>
          <th> Range</th>
          <th> Unit</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {packages &&
          Object?.keys(packages).map((fk, index) => (
            <Overview
              index={index}
              fk={fk}
              value={packages[fk]}
              service={services?.find(({ id }) => Number(fk) === id)}
              packageHandler={packageHandler}
            />
          ))}
      </MDBTableBody>
    </MDBTable>
  );
};

export default Index;
