import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBBtn,
  MDBSpinner,
  MDBTypography,
  MDBCardTitle,
  MDBRow,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import Company from "../../../fakeDb/company";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { register, validateContactNumber } from "../../../components/utilities";
import { SAVE, RESET } from "../../../redux/slices/assets/persons/surnames";

const Register = () => {
  const [show, setShow] = useState({ pass: false, cpass: false }),
    [isLoading, setIsLoading] = useState(false),
    [rubric, setRubric] = useState({
      name: "",
    }),
    [role, setRole] = useState(2),
    { catalogs, isSuccess } = useSelector(({ surnames }) => surnames),
    { auth, onDuty } = useSelector(({ auth }) => auth),
    [isAdmin, setIsAdmin] = useState(false),
    [newRoles, setNewRoles] = useState([]),
    [inputOptions, setInputOptions] = useState({}),
    [roleOptions, setRoleOptions] = useState({}),
    navigate = useNavigate(),
    dispatch = useDispatch();

  useEffect(() => {
    document.title = `${Company.name} | Register`;
  }, []);

  useEffect(() => {
    if (auth && (onDuty.id === 14 || onDuty.id === 18)) {
      setIsAdmin(true);
    }
  }, [auth, onDuty]);

  useEffect(() => {
    if (isSuccess) {
      if (auth && !isAdmin) {
        toast.info("The item you added is pending for approval.");
      }
      dispatch(RESET());
    }
  }, [isSuccess, auth, isAdmin]);

  useEffect(() => {
    if (catalogs.length > 0) {
      let newObj = {},
        roleObj = {};
      catalogs.map((catalog, index) => (newObj[index] = catalog.name));
      const _newRoles = [...Company.employees];

      _newRoles.splice(0, 1);
      setNewRoles(_newRoles);
      _newRoles.map((role) => (roleObj[role.id] = role?.display_name));
      setInputOptions(newObj);
      setRoleOptions(roleObj);
    }
  }, [catalogs]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    const { fname, mobile, email, pass, cpass } = e.target;
    if (isAdmin) {
      const form = {
        fullName: {
          fname: fname.value,
          lname: rubric._id,
        },
        role: {
          roleId: onDuty._id,
          branch: onDuty.branch,
          company: onDuty.company,
        },
        mobile: mobile.value,
        email: email.value,
        password: "password",
      };
      register(form)
        .then((res) => {
          if (res) {
            toast.success(`Registered ${fname.value} successfully!`);
            setTimeout(window.close, 2500);
          }
        })
        .catch((err) => toast.error(err.message));
    } else {
      if (pass.value === cpass.value) {
        const form = {
          fullName: {
            fname: fname.value,
            lname: rubric._id,
          },
          mobile: mobile.value,
          email: email.value,
          password: pass.value,
        };
        register(form)
          .then((res) => {
            if (res) {
              navigate("/login");
              toast.success(`Welcome aboard ${fname.value}!`);
            }
          })
          .catch((err) => toast.error(err.message));
      } else {
        toast.warn("Passwords does not match!");
      }
    }
    setIsLoading(false);
  };

  const handleRubric = async () => {
    document.getElementById("email").focus();
    const { value: _rubric } = await Swal.fire({
      title: "Choose a rubric",
      text: "If you cant find yours, click the icon beside the Last name",
      input: "select",
      inputOptions,
    });

    if (_rubric) {
      setRubric(catalogs[Number(_rubric)]);
    }
  };

  const handleRole = async () => {
    document.getElementById("email").focus();
    const { value: _role } = await Swal.fire({
      title: "Choose a role",
      input: "select",
      inputOptions: roleOptions,
    });

    if (_role) {
      setRole(Number(_role));
    }
  };

  const handleNew = async () => {
    const { value: _new } = await Swal.fire({
      title: "Add a new rubric",
      input: "text",
    });

    if (_new) {
      if (auth) {
        if (isAdmin) {
          dispatch(
            SAVE({ form: { name: _new.toUpperCase(), approved: true } })
          );
        } else {
          dispatch(SAVE({ form: { name: _new.toUpperCase() } }));
        }
      } else {
        dispatch(SAVE({ form: { name: _new.toUpperCase() } }));
      }
    }
  };

  return (
    <MDBContainer fluid style={{ backgroundColor: "#f6e7d8", height: "100vh" }}>
      <MDBCol size={10} className="offset-1 text-center">
        <img
          src={Company.logo}
          style={{ maxWidth: 200 }}
          className="my-2 w-100"
          alt="Company logo"
        />
        <MDBCard>
          <MDBCardBody>
            <form onSubmit={handleSubmit}>
              <MDBCardTitle>Basic Information</MDBCardTitle>
              <MDBRow className="mb-2">
                <MDBCol md={4} className="mb-2 mb-md-0">
                  <MDBInput
                    type="text"
                    label="First name"
                    name="fname"
                    onChange={(e) =>
                      (e.target.value = String(e.target.value).toUpperCase())
                    }
                    onInvalid={(e) =>
                      e.target.setCustomValidity(
                        "Please input your First name."
                      )
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                    required
                    autoFocus
                  />
                </MDBCol>

                <MDBCol md={4}>
                  <div className="position-relative">
                    <MDBInput
                      type="text"
                      label="Middle name"
                      value={rubric.name}
                      onFocus={handleRubric}
                      required
                    />
                    <MDBIcon
                      title="Click here to add a rubric"
                      icon="info-circle"
                      className="custom-register-eye cursor-pointer"
                      onClick={handleNew}
                    />
                  </div>
                </MDBCol>

                <MDBCol md={4}>
                  <div className="position-relative">
                    <MDBInput
                      type="text"
                      label="Last name"
                      value={rubric.name}
                      onFocus={handleRubric}
                      required
                    />
                    <MDBIcon
                      title="Click here to add a rubric"
                      icon="info-circle"
                      className="custom-register-eye cursor-pointer"
                      onClick={handleNew}
                    />
                  </div>
                </MDBCol>
              </MDBRow>
              <MDBRow className="mb-2">
                <MDBCol md={4} className="mb-2 mb-md-0">
                  <MDBInput
                    type="text"
                    label="Suffix"
                    name="suffix"
                    onChange={(e) =>
                      (e.target.value = String(e.target.value).toUpperCase())
                    }
                    onInvalid={(e) =>
                      e.target.setCustomValidity(
                        "Please input your First name."
                      )
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                    required
                    autoFocus
                  />
                </MDBCol>

                <MDBCol md={4}>
                  <div className="position-relative">
                    <MDBInput
                      type="date"
                      label="Date of Birth"
                      name="dob"
                      onInvalid={(e) =>
                        e.target.setCustomValidity(
                          "Provide the date of your birthday ."
                        )
                      }
                      onInput={(e) => e.target.setCustomValidity("")}
                      required
                    />
                  </div>
                </MDBCol>

                <MDBCol md={4} className="mt-2 mt-md-0">
                  <MDBInput
                    type="text"
                    label="Mobile (+63)"
                    name="mobile"
                    onInvalid={(e) =>
                      e.target.setCustomValidity(
                        "This can also be used for logging in."
                      )
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                    onKeyDown={validateContactNumber}
                    maxLength={10}
                    required
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md={4} className="mb-2 mb-md-0">
                  <MDBInput
                    type="text"
                    label="Allias"
                    name="allias"
                    onChange={(e) =>
                      (e.target.value = String(e.target.value).toUpperCase())
                    }
                  />
                </MDBCol>

                <MDBCol md={4}>
                  <div className="position-relative">
                    <select
                      name="isMale"
                      data-subname="isMale"
                      className={`form-control`}
                      onChange={(e) =>
                        (e.target.value = String(e.target.value))
                      }
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </MDBCol>

                {/* <MDBCol md={4} className="mt-2 mt-md-0">
                  <MDBInput
                    type="number"
                    label="Heart rate"
                    name="rate"
                    onChange={(e) => (e.target.value = String(e.target.value))}
                  />
                </MDBCol> */}
              </MDBRow>

              <MDBCardTitle className="mt-3">Credentials</MDBCardTitle>
              <MDBRow>
                <MDBCol md={isAdmin ? 6 : 4} className="mb-2 mb-md-0">
                  <MDBInput
                    type="email"
                    label="E-mail Address"
                    name="email"
                    id="email"
                    onInvalid={(e) =>
                      e.target.setCustomValidity(
                        "Provide a valid E-mail Address."
                      )
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                    required
                  />
                </MDBCol>

                {isAdmin ? (
                  <MDBCol md={6}>
                    <MDBInput
                      type="text"
                      label="Mobile (+63)"
                      name="mobile"
                      onInvalid={(e) =>
                        e.target.setCustomValidity(
                          "This can also be used for logging in."
                        )
                      }
                      onInput={(e) => e.target.setCustomValidity("")}
                      onKeyDown={validateContactNumber}
                      maxLength={10}
                      required
                    />
                  </MDBCol>
                ) : (
                  <>
                    <MDBCol md={4}>
                      <div className="position-relative">
                        <MDBInput
                          type={!show.pass ? "password" : "text"}
                          label="Password"
                          name="pass"
                          minLength={8}
                          onInvalid={(e) =>
                            e.target.setCustomValidity(
                              "Password is used for validation."
                            )
                          }
                          onInput={(e) => e.target.setCustomValidity("")}
                          required
                        />
                        <MDBIcon
                          icon={show.pass ? "eye" : "eye-slash"}
                          className="custom-register-eye cursor-pointer"
                          onClick={() => setShow({ ...show, pass: !show.pass })}
                        />
                      </div>
                    </MDBCol>
                    <MDBCol md={4} className="mt-2 mt-md-0">
                      <div className="position-relative">
                        <MDBInput
                          type={!show.cpass ? "password" : "text"}
                          label="Confirm Password"
                          name="cpass"
                          minLength={8}
                          onInvalid={(e) =>
                            e.target.setCustomValidity("Confirm your Password.")
                          }
                          onInput={(e) => e.target.setCustomValidity("")}
                          required
                        />
                        <MDBIcon
                          icon={show.cpass ? "eye" : "eye-slash"}
                          className="custom-register-eye cursor-pointer"
                          onClick={() =>
                            setShow({ ...show, cpass: !show.cpass })
                          }
                        />
                      </div>
                    </MDBCol>
                  </>
                )}
              </MDBRow>

              <MDBBtn
                className="w-100 mt-3"
                color="success"
                disabled={isLoading}
              >
                {isLoading ? <MDBSpinner grow size="sm" /> : "Register"}
              </MDBBtn>
            </form>
          </MDBCardBody>
        </MDBCard>
        {!isAdmin && (
          <MDBCard className="mt-2">
            <MDBCardBody>
              <MDBTypography className="mb-0">
                Already have an account?&nbsp;
                <span
                  onClick={() => navigate("/login")}
                  className="cursor-pointer text-primary hover-line"
                >
                  Log in
                </span>
                .
              </MDBTypography>
            </MDBCardBody>
          </MDBCard>
        )}
      </MDBCol>
    </MDBContainer>
  );
};

export default Register;
