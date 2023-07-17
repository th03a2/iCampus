import React, { useState, useEffect } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtnGroup,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { paginationHandler } from "../../../../components/utilities";
import Swal from "sweetalert2";
import { DESTROY } from "../../../../redux/slices/query";
import MachineModal from "./modal";

export function TBLequipments({ page }) {
  const { token, theme, maxPage, auth } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ procurements }) => procurements),
    [equipment, setEquipment] = useState({}),
    [visibility, setVisibility] = useState(false),
    dispatch = useDispatch();

  const handleToggle = (model) => {
    setEquipment(model);
    setVisibility(!visibility);
  };
  return (
    <>
      <MDBTable align="middle" hover responsive color={theme.color}>
        <caption>List of pending equipments</caption>
        <caption className="caption-top">
          Total of <b>{catalogs?.length}</b> equipments(s)
        </caption>
        <MDBTableHead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Machines</th>
            <th scope="col">Serial #</th>
            <th scope="col">Mortgage</th>
            <th scope="col">Accuqired</th>
            <th scope="col">Price</th>
            <th scope="col">Status</th>
            <th scope="col" className="text-center">
              Action
            </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {catalogs?.length > 0 ? (
            paginationHandler(catalogs, page, maxPage).map(
              (equipment, index) => (
                <tr key={equipment?._id}>
                  <td>{index + 1}</td>
                  <td>
                    <>
                      <h6>{equipment.brand}</h6>
                      <small>{equipment.model}</small>
                    </>
                  </td>
                  <td>{equipment.serial}</td>
                  <td>{equipment.mortgage} year(s)</td>
                  <td>
                    <p className="fw-bold mb-1 text-capitalize">
                      {equipment.accuqired}
                    </p>
                  </td>
                  <td>
                    <p className="fw-bold mb-1 text-capitalize">
                      ₱ {equipment.price}
                    </p>
                  </td>
                  <td>
                    <p className="fw-bold mb-1 text-capitalize">
                      {equipment.status}
                    </p>
                  </td>
                  <td className="text-center">
                    <MDBBtnGroup className="shadow-0">
                      <MDBBtn
                        onClick={() => handleToggle(equipment)}
                        color="info"
                        size="sm"
                        title="Update information."
                      >
                        update
                      </MDBBtn>
                      <MDBBtn
                        onClick={() =>
                          Swal.fire({
                            icon: "warning",
                            title: "Are you sure?",
                            html: `You won't be able to revert this!`,
                            showCancelButton: true,
                            confirmButtonText: "Yes, continue!",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              dispatch(
                                DESTROY({
                                  entity: "assets/persons/equipments",
                                  id: equipment._id,
                                  token,
                                })
                              );
                            }
                          })
                        }
                        color={theme.color}
                        size="sm"
                        title="Archive this branch."
                      >
                        archive
                      </MDBBtn>
                    </MDBBtnGroup>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr className="text-center" style={{ height: "280px" }}>
              <td colSpan={4}>
                <h2>No Tag equipments.</h2>
              </td>
            </tr>
          )}
        </MDBTableBody>
      </MDBTable>
      <MachineModal
        visibility={visibility}
        setVisibility={setVisibility}
        equipment={equipment}
      />
    </>
  );
}
