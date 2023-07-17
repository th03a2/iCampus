import React from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { SETINITIALMODEL } from "../../../../../redux/slices/task/preferences";

export default function Equal({ references, serviceId }) {
  const dispatch = useDispatch();
  const handleModal = (reference) =>
    dispatch(SETINITIALMODEL({ category: "equal", model: reference }));

  return (
    <MDBTable align="middle" hover responsive small className="mt-2 bg-white">
      <MDBTableHead>
        <tr className="text-center">
          <th colSpan={2}>Reference Value </th>
          <th rowSpan={2}>Units</th>
          <th colSpan={3}>Panic Value </th>
          <th rowSpan={2}>Action</th>
        </tr>
        <tr className="text-center">
          <th scope="col">Minimum</th>
          <th scope="col">Maximum</th>
          <th scope="col">Mild</th>
          <th scope="col">Moderate</th>
          <th scope="col">Severe</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {references.map((reference) => {
          const { lo, hi, warn, pvLo, pvHi, units } = reference;
          return (
            <tr className="text-center">
              <td>{lo}</td>
              <td>{hi}</td>
              <td>{units}</td>
              <td>{warn}</td>
              <td>{pvLo}</td>
              <td>{pvHi}</td>
              <td>
                <MDBBtn
                  onClick={() => handleModal(reference)}
                  size="sm"
                  className="shadow-0"
                >
                  <MDBIcon icon={`edit`} color="red" />
                </MDBBtn>
              </td>
            </tr>
          );
        })}
        {references.length < 1 && (
          <tr>
            <td>
              <MDBBtn
                onClick={() =>
                  dispatch(
                    SETINITIALMODEL({
                      category: "equal",
                      model: { serviceId: serviceId },
                    })
                  )
                }
                size="sm"
                className="shadow-0"
              >
                Create New References
                <MDBIcon icon={`plus`} color="red" />
              </MDBBtn>
            </td>
          </tr>
        )}
      </MDBTableBody>
    </MDBTable>
  );
}
