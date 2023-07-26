import React, { useState } from "react";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalBody,
  MDBListGroup,
  MDBListGroupItem,
  MDBBadge,
  MDBModalFooter,
  MDBBtn,
  MDBBtnGroup,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { Role } from "../../../fakeDb";
import { browse } from "../../../redux/sqlbuilder";
import { ACTIVEDUTY } from "../../../redux/slices/assets/persons/auth";

export default function BranchSwitcher({ visibility, setVisibility }) {
  const { theme, auth, onDuty, branches, token, isCeo } = useSelector(
      ({ auth }) => auth
    ),
    [selectedBranch, setSelectedBranch] = useState({}),
    dispatch = useDispatch();
  const handleConfirm = () => {
    if (selectedBranch._id !== onDuty?._id) {
      if (isCeo) {
        const { _id, platform } = selectedBranch;
        const _lastVisited = {
          id: _id,
          platform, //: "headquarter",
          designation: 6,
        };
        localStorage.setItem("lastVisited", JSON.stringify(_lastVisited));
      } else {
        browse(
          "assets/persons/auth/branchSwitcher",
          {
            designation: selectedBranch.designation, // role
            userId: auth._id, // user
            activeId: onDuty._id, // out going branch
            selectedId: selectedBranch._id, // in comming branch
          },
          token
        ).catch(err => console.log(err));
      }
      dispatch(
        ACTIVEDUTY({
          designation: selectedBranch.designation,
          platform: selectedBranch.platform,
          name: selectedBranch.name,
          company: selectedBranch.company,
        })
      );
    }
    setVisibility(false);
  };

  return (
    <MDBModal
      backdrop={false}
      staticBackdrop
      tabIndex="-1"
      show={visibility}
      setShow={setVisibility}
      className="custom-backdrop"
    >
      <MDBModalDialog centered>
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>Branch Switcher</MDBModalHeader>
          <MDBModalBody>
            <MDBListGroup>
              {!!branches.length &&
                branches?.map((branch, index) => (
                  <MDBListGroupItem
                    onClick={() => setSelectedBranch(branch)}
                    key={`branch-switcher-${index}`}
                    active={selectedBranch._id === branch?._id}
                    className="d-flex justify-content-between align-items-start cursor-pointer"
                  >
                    <div className="me-auto">
                      <div className="fw-bold">{branch?.name}</div>
                      {branch?.company}
                    </div>
                    <MDBBadge
                      pill
                      title={Role.find(branch.designation)?.display_name}
                      color={
                        selectedBranch?.designation === branch?.designation
                          ? "info"
                          : onDuty?.designation === branch?.designation
                          ? "success"
                          : "primary"
                      }
                    >
                      {Role.find(branch.designation)?.name}
                    </MDBBadge>
                  </MDBListGroupItem>
                ))}
            </MDBListGroup>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtnGroup className="shadow-0">
              <MDBBtn
                onClick={() => {
                  setVisibility(false);
                  setSelectedBranch({});
                }}
                color={theme.color}
              >
                cancel
              </MDBBtn>
              <MDBBtn onClick={handleConfirm} color="success">
                confirm
              </MDBBtn>
            </MDBBtnGroup>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
