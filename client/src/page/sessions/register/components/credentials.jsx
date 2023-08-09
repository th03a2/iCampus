import React, { useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";

export default function Credentials({ form, setForm, setActiveItem }) {
  const [password, setPassword] = useState(true),
    [confirmPassword, setConfirmPassword] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password === form.confirmPassword) {
      const tabs = { ...form.tabs };

      tabs.agreement = true;

      setForm({
        ...form,
        tabs,
      });
      setActiveItem("agreement");
    } else {
      toast.warn("Passwords does not match.");
    }
  };

  return (
    <MDBContainer className="mt-4">
      <form onSubmit={handleSubmit}>
        <MDBRow>
          <MDBCol>
            <MDBInputGroup textBefore="Email">
              <input
                type="email"
                className="form-control"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                required
                autoFocus
              />
            </MDBInputGroup>
          </MDBCol>
        </MDBRow>

        <MDBRow className="my-3">
          <MDBCol>
            <div className="position-relative">
              <MDBInputGroup textBefore="Password">
                <input
                  type={password ? "password" : "text"}
                  className="form-control"
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                  minLength={8}
                  required
                />
              </MDBInputGroup>
              <MDBIcon
                icon={password ? "eye" : "eye-slash"}
                className="custom-register-eye cursor-pointer"
                onClick={() => setPassword(!password)}
              />
            </div>
          </MDBCol>
        </MDBRow>

        <MDBRow className="my-3">
          <MDBCol>
            <div className="position-relative">
              <MDBInputGroup textBefore="Confirm Password">
                <input
                  type={confirmPassword ? "password" : "text"}
                  className="form-control"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      confirmPassword: e.target.value,
                    })
                  }
                  minLength={8}
                  required
                />
              </MDBInputGroup>
              <MDBIcon
                icon={confirmPassword ? "eye" : "eye-slash"}
                className="custom-register-eye cursor-pointer"
                onClick={() => setConfirmPassword(!confirmPassword)}
              />
            </div>
          </MDBCol>
        </MDBRow>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            position: "absolute",
            bottom: "23px",
            left: "10px",
            right: "25px",
          }}
        >
          <MDBBtn
            onClick={() => setActiveItem("address")}
            type="button"
            color="light"
            className="shadow-0"
          >
            Previous
          </MDBBtn>
          <MDBBtn type="submit">Submit</MDBBtn>
        </div>
      </form>
    </MDBContainer>
  );
}
