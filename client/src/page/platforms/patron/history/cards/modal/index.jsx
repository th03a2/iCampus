import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBTextArea,
  MDBInput,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  SAVE,
  APPLICATION,
} from "../../../../../../redux/slices/assets/persons/personnels";
import { Policy } from "../../../../../../fakeDb";

export default function ApplicationModal({
  visibility,
  setVisibility,
  company,
}) {
  const { theme, auth, token } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ personnels }) => personnels),
    [application, setApplication] = useState({}),
    [department, setDepartment] = useState(),
    [positions, setPositions] = useState([]),
    dispatch = useDispatch();
  useEffect(() => {
    token &&
      dispatch(
        APPLICATION({
          data: {
            _id: auth._id,
            key: "",
          },
          token,
        })
      );
  }, [dispatch, token, auth]);

  const handleToggle = () => setVisibility(!visibility);

  const handleApplication = e => {
    e.preventDefault();
    if (!!company.branches.length) {
      console.log({
        userId: auth._id,
        ...application,
      });
    } else {
      toast.warn("Sorry, there are no available branches for this company.");
    }
  };

  const handleDepartment = e => {
    const { value } = e.target;
    setDepartment(value);
    setPositions(Policy.positions(value).positions);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setApplication({
      ...application,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    dispatch(
      SAVE({
        form: {
          user: auth._id,
          status: "petition",
          branch: application.branchId,
          hasPds: application.pds ? true : false,
          hasResume: application.resume ? true : false,
          hasLetter: application.letter ? true : false,
          code: Number(application.designation),
          hos: 8,
          message: application.message,
        },
        token,
      })
    );
    setVisibility(!visibility);
  };

  return (
    <MDBModal
      staticBackdrop
      tabIndex="-1"
      show={visibility}
      setShow={setVisibility}
    >
      <MDBModalDialog>
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>
              {company.name}'s Application Requirements
            </MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={handleToggle} />
          </MDBModalHeader>
          <form onSubmit={handleApplication}>
            <MDBModalBody className="text-start">
              <select
                required
                className="form-control mb-3"
                value={application?.branchId}
                name="branchId"
                onChange={handleChange}
              >
                <option value="" selected>
                  Select a branch
                </option>
                {company.branches?.map(branch => {
                  const disabler = catalogs?.find(
                    catalog => catalog?.branch?._id === branch?._id
                  );
                  return (
                    <option
                      value={branch._id}
                      key={branch._id}
                      disabled={disabler}
                      style={{ backgroundColor: disabler ? "yellow" : "white" }}
                    >
                      {branch?.name} {disabler ? "Application on process" : ""}
                    </option>
                  );
                })}
              </select>
              <select
                required
                className="form-control mb-3"
                value={department}
                name="department"
                onChange={handleDepartment}
              >
                <option value="" selected>
                  Select a department
                </option>
                {Object.entries(Policy.departments())?.map(
                  ([index, collections]) => (
                    <option value={collections.department} key={index}>
                      {collections.department.toLocaleUpperCase()}
                    </option>
                  )
                )}
              </select>
              <select
                required
                className="form-control mb-3"
                value={application?.designation}
                name="designation"
                onChange={handleChange}
              >
                <option value="" selected>
                  Select a Designation / Positions
                </option>
                {Object.entries(positions)?.map(([i, collections]) => (
                  <option
                    value={collections.id}
                    key={`position-${collections.id}-${i}`}
                  >
                    {collections.display_name}
                  </option>
                ))}
              </select>
              <MDBInput
                className="form-control mb-3"
                label="Personal Data Sheet"
                value={application?.pds}
                name="pds"
                onChange={handleChange}
              />
              <MDBInput
                className="form-control mb-3"
                label="Resume"
                value={application?.resume}
                name="resume"
                onChange={handleChange}
              />
              <MDBInput
                className="form-control mb-3"
                label="Application Letter"
                value={application?.letter}
                name="letter"
                onChange={handleChange}
              />
              <MDBTextArea
                label="Message"
                value={application?.message}
                name="message"
                onChange={handleChange}
              />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn type="button" color="secondary" onClick={handleToggle}>
                Close
              </MDBBtn>
              <MDBBtn type="submit" color="success" onClick={handleSubmit}>
                Submit application
              </MDBBtn>
            </MDBModalFooter>
          </form>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
