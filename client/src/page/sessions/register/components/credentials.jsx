import React, { useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";

export default function Credentials({ form, setForm, setActiveItem }) {
  const [password, setPassword] = useState(true),
    [confirmPassword, setConfirmPassword] = useState(true);

  const handleSubmit = e => {
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
            <MDBInput
              type="text"
              label="Email"
              value={form.bop.region}
              onChange={e =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              required
              autoFocus
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <MDBInput
              type="email"
              label="Email"
              value={form.bop.province}
              onChange={e =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              required
              autoFocus
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <MDBInput
              type="email"
              label="Email"
              value={form.bop.municipality}
              onChange={e =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              required
              autoFocus
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <MDBInput
              type="email"
              label="Email"
              value={form.bop.brangay}
              onChange={e =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              required
              autoFocus
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <MDBInput
              type="email"
              label="Email"
              value={form.bop.street}
              onChange={e =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              required
              autoFocus
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <MDBInput
              type="email"
              label="Email"
              value={form.email}
              onChange={e =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              required
              autoFocus
            />
          </MDBCol>
        </MDBRow>

        <MDBRow className="my-3">
          <MDBCol>
            <div className="position-relative">
              <MDBInput
                type={password ? "password" : "text"}
                label="Password"
                value={form.password}
                onChange={e =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                minLength={8}
                required
              />
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
              <MDBInput
                type={confirmPassword ? "password" : "text"}
                label="Confirm Password"
                value={form.confirmPassword}
                onChange={e =>
                  setForm({
                    ...form,
                    confirmPassword: e.target.value,
                  })
                }
                minLength={8}
                required
              />
              <MDBIcon
                icon={confirmPassword ? "eye" : "eye-slash"}
                className="custom-register-eye cursor-pointer"
                onClick={() => setConfirmPassword(!confirmPassword)}
              />
            </div>
          </MDBCol>
        </MDBRow>

        <div className="d-flex justify-content-between">
          <MDBBtn
            onClick={() => setActiveItem("address")}
            type="button"
            color="light"
            className="shadow-0"
          >
            Previous
          </MDBBtn>
          <MDBBtn type="submit">Next</MDBBtn>
        </div>
      </form>
    </MDBContainer>
  );
}
