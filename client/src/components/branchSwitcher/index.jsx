import React, { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBListGroup,
  MDBListGroupItem,
  MDBBadge,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DUTY } from "../../redux/slices/assets/persons/auth";
import { toast } from "react-toastify";

export default function BranchSwitcher({ visibility, setVisibility, roles }) {
  const [activeIndex, setActiveIndex] = useState(0),
    navigate = useNavigate(),
    dispatch = useDispatch(),
    { theme } = useSelector(({ auth }) => auth);

  const handleProceed = () => {
    var onDuty = { ...roles[activeIndex] };
    if (!onDuty.status) {
      onDuty?.platform = "patron";

      navigate(`/platform/${onDuty?.platform}/dashboard`);
      dispatch(DUTY({ onDuty, isAdmin: onDuty.role === "admin" }));
      setVisibility(false);
    } else {
      if (onDuty.status === "deactivated") {
        toast.warn("Your account has been deactivated.");
      } else {
        toast.error("You have been banned!");
      }
    }
  };

  return (
    <MDBModal
      backdrop={false}
      show={visibility}
      setShow={setVisibility}
      staticBackdrop
      tabIndex="-1"
      className="custom-backdrop"
    >
      <MDBModalDialog size="lg" centered>
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>Select Company to visit</MDBModalTitle>
            <MDBBtn
              color="none"
              className="shadow-0 border-0"
              onClick={() => setVisibility(false)}
            >
              <MDBIcon icon="times" />
            </MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <MDBListGroup>
              {roles?.map((role, index) => (
                <MDBListGroupItem
                  key={`switcher-${index}`}
                  active={activeIndex === index}
                  aria-current="true"
                  className="px-3 text-capitalize d-flex justify-content-between cursor-pointer"
                  onClick={() => setActiveIndex(index)}
                >
                  <div>
                    <p className="fw-bold mb-1">
                      {role.companyName}
                      {role.branchName && ` / ${role.branchName}`}
                    </p>
                    {role.status && (
                      <p
                        className={`text-${
                          role.status === "deactivated" ? "warning" : "danger"
                        } mb-0`}
                      >
                        {role.status}
                      </p>
                    )}
                  </div>
                  <div>
                    <MDBBadge color="info" pill>
                      {role?.name}
                    </MDBBadge>
                  </div>
                </MDBListGroupItem>
              ))}
            </MDBListGroup>
          </MDBModalBody>

          <MDBModalFooter>
            <MDBBtn onClick={handleProceed}>proceed</MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
