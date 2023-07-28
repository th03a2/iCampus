import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import {
  validateContactNumber,
  properNameFormatter,
} from "../../../../components/utilities";
import axios from "axios";
import { toast } from "react-toastify";
export function ModalSearchUsers({
  visibility,
  setVisibility,
  gender,
  handleParents,
}) {
  const { token } = useSelector(({ auth }) => auth),
    { catalogs, isSuccess } = useSelector(({ users }) => users),
    [user, setUser] = useState({ gender: gender }),
    [users, setUsers] = useState([]);

  const handleSearch = async () => {
    console.log(user);
    let _users = user;
    if (typeof _users === "object") {
      _users = `?${Object.keys(_users)
        .map(i => `${i}=${_users[i]}`)
        .join("&")}`;
    } else if (_users) {
      _users = `?key=${_users}`;
    }
    await axios.get(`assets/persons/users/parents${_users}`).then(res => {
      if (res.data.error) {
        toast.warn(res.data.error);
        throw new Error(res.data.error);
      } else {
        setUsers(res.data);
      }
    });
    // setLook(true);
  };

  const handleOnchange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value.toUpperCase() });
  };
  return (
    <>
      <MDBModal show={visibility} setShow={setVisibility} tabIndex="-1">
        <MDBModalDialog size="xl">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Search User</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setVisibility(false)}
              ></MDBBtn>
            </MDBModalHeader>

            <MDBModalBody>
              <MDBRow className="mb-3">
                <MDBCol md={4} className=" mb-md-0 ">
                  <MDBInput
                    type="text"
                    label="Name"
                    name="name"
                    value={user.name}
                    onChange={e => handleOnchange(e)}
                  />
                </MDBCol>

                <MDBCol md={4} className="mb-md-0 ">
                  <MDBInput
                    type="text"
                    label="Middle Name (Optional)"
                    name="mname"
                    value={user.mname}
                    onChange={e => handleOnchange(e)}
                  />
                </MDBCol>
                <MDBCol md={4} className=" mb-md-0 ">
                  <MDBInput
                    type="text"
                    label="Last Name"
                    name="lname"
                    value={user.lname}
                    onChange={e => handleOnchange(e)}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-2">
                <MDBCol md={4} className=" mb-md-0 ">
                  <select
                    class="form-select"
                    name="suffix"
                    value={user.suffix}
                    onChange={e => handleOnchange(e)}
                  >
                    <option selected value="">
                      Suffix (Optional)
                    </option>
                    <option value="JR">JR</option>
                    <option value="SR">SR</option>
                    <option value="III">III</option>
                    <option value="IV">IV</option>
                    <option value="V">V</option>
                  </select>
                </MDBCol>
                <MDBCol md={4} className="mb-md-0 ">
                  <MDBInput
                    type="date"
                    label="Birthday"
                    name="dob"
                    value={user.dob}
                    onChange={e => handleOnchange(e)}
                  />
                </MDBCol>
                <MDBCol md={4} className="mb-md-0 ">
                  <MDBInput
                    type="text"
                    label="Mobile (+63) (Optional)"
                    name="phone"
                    value={user.phone}
                    onChange={e => handleOnchange(e)}
                    onKeyDown={validateContactNumber}
                    maxLength={10}
                  />
                </MDBCol>
              </MDBRow>
              <div className="text-end">
                <MDBBtn
                  color="secondary"
                  onClick={() => {
                    handleSearch();
                  }}
                >
                  Search
                </MDBBtn>
              </div>
              <MDBTable align="middle" hover responsive small className="mt-3">
                <MDBTableHead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Birthday</th>
                    <th>Phone</th>
                    <th>Action</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {users.map((u, i) => (
                    <tr>
                      <td>{1 + i}</td>
                      <td>{properNameFormatter(u.fullName)}</td>
                      <td>{u.dob}</td>
                      <td>(+63) {u.mobile}</td>
                      <td>
                        <MDBBtn
                          onClick={() => {
                            handleParents(u, gender);
                            setVisibility(false);
                          }}
                        >
                          Pick
                        </MDBBtn>
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            </MDBModalBody>

            {/* <MDBModalFooter></MDBModalFooter> */}
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
