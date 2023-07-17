import React from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { Services } from "../../../../../../fakeDb";
import {
  UPDATE,
  SETREFERENCE,
} from "../../../../../../redux/slices/commerce/menus";
import { templates } from "../../../../../../components/utilities";
export default function Body({ menu }) {
  const { token } = useSelector(({ auth }) => auth),
    dispatch = useDispatch();

  const services = Services.whereIn(menu.packages);

  const handleRemove = pk => {
    const packages = menu.packages.filter(service => service !== pk);
    dispatch(UPDATE({ data: { packages }, id: menu._id, token }));
  };
  return (
    <>
      <MDBTable
        align="middle"
        hover
        responsive
        small
        striped
        className="mt-2 bg-white"
      >
        <MDBTableHead>
          <tr>
            <th>Department </th>
            <th>Template </th>
            <th>Description </th>
            <th>Abbreviation </th>
            <th>Preference </th>
            <th>Preparation </th>
            <th>Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {services.map(service => {
            return (
              <tr>
                <td>{service?.department.toUpperCase()}</td>
                <td>
                  {
                    templates.find(
                      ({ department }) => department === service?.department
                    ).components[service?.template]
                  }
                </td>
                <td>{service?.name}</td>
                <td>{service?.abbreviation}</td>
                <td>{service?.preference}</td>
                <td>{service?.preparation}</td>
                <td>
                  {service?.id && (
                    <MDBBtn
                      onClick={() => handleRemove(service?.id)}
                      size="sm"
                      className="shadow-0 btn-danger"
                      title={`Untag ${service?.name}`}
                    >
                      <MDBIcon icon="trash" />
                    </MDBBtn>
                  )}
                </td>
              </tr>
            );
          })}
        </MDBTableBody>
      </MDBTable>
      <MDBBtn
        onClick={() => dispatch(SETREFERENCE(menu))}
        size="sm"
        className="shadow-0"
      >
        <MDBIcon icon="tag" color="red" />
        New Services
      </MDBBtn>
    </>
  );
}
