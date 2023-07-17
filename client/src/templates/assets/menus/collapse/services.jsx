import React, { useEffect, useState } from "react";
import {
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBIcon,
  MDBModalDialog,
  MDBModalContent,
  MDBModalTitle,
} from "mdb-react-ui-kit";
import Services from "../../../../fakeDb/json/services";
import {
  SETVIEWSERVICES,
  UPDATE,
} from "../../../../redux/slices/commerce/menus";
import { useDispatch, useSelector } from "react-redux";

const Index = () => {
  const { theme, token } = useSelector(({ auth }) => auth),
    { viewServices, model } = useSelector(({ menus }) => menus),
    dispatch = useDispatch(),
    [services, setServices] = useState([]);

  useEffect(() => {
    setServices(Services);
  }, [Services]);
  const keyPress = e =>
    e.keyCode === 13 &&
    setServices(
      services.filter(service =>
        Object.values(service).some(val =>
          String(val).toLowerCase().includes(e.target.value)
        )
      )
    );
  const handlePick = pk => {
    let packages = [...model.packages, pk];
    dispatch(UPDATE({ data: { packages }, id: model._id, token }));
    dispatch(SETVIEWSERVICES(false));
  };

  return (
    <MDBModal show={viewServices} size="lg">
      <MDBModalDialog centered size="lg" scrollable>
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader toggle={SETVIEWSERVICES} className="bg-dark">
            <input
              type="search"
              name="search"
              placeholder="Name or Abbr"
              autoFocus
              onKeyDown={keyPress}
              required
            />
            <button>
              <MDBIcon icon="search" />
            </button>
          </MDBModalHeader>
          <MDBModalBody>
            <MDBTable responsive hover bordered>
              <MDBTableHead>
                <th>#</th>
                <th>Department</th>
                <th>Services Name</th>
                <th>Abbr</th>
                <th>Action</th>
              </MDBTableHead>
              <MDBTableBody>
                {services?.map((model, index) => {
                  const { id, name, abbreviation, department } = model;
                  return (
                    <tr key={`menu-${index}-${id}`}>
                      <td>{++index}</td>
                      <td>{department}</td>
                      <td>{name}</td>
                      <td>{abbreviation}</td>
                      <td className="d-flex align-items-center">
                        <button
                          className="btn btn-outline-info btn-sm"
                          title="Pick"
                          onClick={() => handlePick(id)}
                        >
                          pick
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </MDBTableBody>
            </MDBTable>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};

export default Index;
