import React from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBTypography,
  MDBContainer,
  MDBInput,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

export default function EmployeeAuthorization({
  setVisibility,
  visibility,
  getResponse,
}) {
  const { theme, onDuty, auth } = useSelector(({ auth }) => auth);

  const handleToggle = () => setVisibility(!visibility);

  const handleSubmit = e => {
    e.preventDefault();

    const { email, password } = e.target;

    axios
      .get(
        `auth/authorize?email=${email.value}&password=${password.value}&branchId=${onDuty._id}&companyId=${onDuty.companyId}`
      )
      .then(res => {
        const { error, user } = res.data;

        if (error) {
          toast.warn(res.data.error);
        }

        if (user) {
          if (auth.email !== user.email) {
            alert(user.username);
            getResponse(user);
            toast.success(`Validated by: ${email.value}`);
            document.getElementById("authorizationForm").reset();
          } else {
            toast.warn("Someone other than yourself.");
          }
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <MDBModal
      staticBackdrop
      tabIndex="-1"
      show={visibility}
      setShow={setVisibility}
    >
      <MDBModalDialog centered>
        <MDBModalContent
          className={`${theme.bg} ${theme.text} border border-info`}
        >
          <MDBModalHeader>
            <MDBModalTitle>Restricted access</MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={handleToggle} />
          </MDBModalHeader>
          <MDBModalBody className="text-start p-0 text-center">
            <MDBContainer>
              <MDBTypography tag="h5" className=" mb-0 mt-3">
                Provide Secondary Validation
              </MDBTypography>
              <form
                onSubmit={handleSubmit}
                autoComplete="off"
                id="authorizationForm"
              >
                <MDBInput
                  type="email"
                  name="email"
                  label="E-mail Address / Mobile Number"
                  contrast={theme.dark}
                  className="my-3"
                  required
                />
                <MDBInput
                  type="password"
                  name="password"
                  label="Password"
                  contrast={theme.dark}
                  required
                />
                <MDBBtn type="submit" className="my-3">
                  submit
                </MDBBtn>
              </form>
              <MDBTypography note noteColor="info" className="text-dark mb-3">
                <strong>Note: </strong>Ask the owner or fellow branch employee
                to login their credentials to validate your action.
              </MDBTypography>
            </MDBContainer>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
