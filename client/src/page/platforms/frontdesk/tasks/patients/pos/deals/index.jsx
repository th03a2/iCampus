import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInputGroup,
  MDBRow,
  MDBSwitch,
  MDBTypography,
} from "mdb-react-ui-kit";
import {
  arrayEquals,
  currencyFormatter,
  nameFormatter,
  getAge,
  memberships,
  payments,
  privileges,
  categories,
} from "../../../../../../../components/utilities";
import { useDispatch, useSelector } from "react-redux";
import DealTable from "./table";
import DetailsFooter from "./footer";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import {
  REVERT,
  SAVE,
  RECENT,
} from "../../../../../../../redux/slices/commerce/sales";
import { UPDATE } from "../../../../../../../redux/slices/assets/persons/users";
import EmployeeAuthorization from "../../../../../../../components/authorization";
import { browse } from "../../../../../../../redux/sqlbuilder";

export default function Deals({
  user,
  deals,
  source,
  setDeals,
  handleRemove,
  setSource,
  handleToggle,
}) {
  const { auth, theme, onDuty, token } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ menus }) => menus),
    { didSubmit, recent } = useSelector(({ sales }) => sales),
    [isPickup, setIsPickup] = useState(true),
    [doctors, setDoctors] = useState([]),
    [doctor, setDoctor] = useState(""),
    [privilege, setPrivilege] = useState(0),
    [gross, setGross] = useState(0),
    [net, setNet] = useState(0),
    [discount, setDiscount] = useState(0),
    [percentage, setPercentage] = useState(20),
    [payment, setPayment] = useState("cash"),
    [better, setBetter] = useState(0),
    [authorization, setAuthorization] = useState(false),
    [form, setForm] = useState({}),
    [isInvalid, setIsInvalid] = useState(false),
    dispatch = useDispatch();

  useEffect(() => {
    if (recent && recent._id) {
      localStorage.setItem("claim_stub", JSON.stringify(recent));
      window.open(
        "/stub/print",
        "Claim Stub",
        "top=100px,width=250px,height=650px"
      );
      dispatch(RECENT({}));
    }
  }, [recent]);

  useEffect(() => {
    if (didSubmit) {
      setPrivilege(0);
      setPercentage(20);
      setSource("opd");
      setIsPickup(true);
      setDoctor("");
      setPayment("cash");
      setDeals([]);
      dispatch(REVERT());
    }
  }, [
    didSubmit,
    setPrivilege,
    setPercentage,
    setSource,
    setIsPickup,
    setDoctor,
    setPayment,
    setDeals,
    dispatch,
  ]);

  useEffect(() => {
    if (onDuty._id) {
      const handleDoctors = async () =>
        setDoctors(await browse(`branches/${onDuty._id}/doctors`, "", token));

      handleDoctors();
    }
  }, [onDuty]);

  useEffect(() => {
    if (privilege === 4) {
      const handleMembership = async () => {
        const { value: type } = await Swal.fire({
          title: "Select a membership",
          input: "select",
          inputOptions: memberships,
          inputPlaceholder: "Select a membership",
        });
        if (type) {
          setPercentage(type);
        }
      };

      handleMembership();
    } else {
      setPercentage(20);
    }
  }, [privilege]);

  useEffect(() => {
    if (user.privilege) {
      setPrivilege(user.privilege);
    }
    return () => {
      setPrivilege(0);
      setSource("opd");
      setIsPickup(true);
      setDoctor("");
      setPayment("cash");
    };
  }, [user]);

  useEffect(() => {
    if (deals.length > 0) {
      var services = [],
        better = {};

      deals.map(detail =>
        detail.packages.map(srvc => {
          services.push(srvc);
        })
      );

      catalogs.map(catalog => {
        var a = [...catalog.packages],
          b = [...services];

        if (arrayEquals(a, b)) {
          better = catalog;
        }
      });

      const existing = deals.find(detail => detail._id === better._id);

      if (!existing) {
        setBetter(better);
      } else {
        setBetter({});
      }
    } else {
      setBetter({});
    }
  }, [deals, catalogs]);

  useEffect(() => {
    if (deals.length > 0) {
      var gross = 0,
        net = 0,
        discount = 0,
        invalid = false;

      deals.map(detail => {
        var amount = detail[source === "walkin" ? "opd" : source];

        if (amount > 0) {
          gross += amount;
          if (source === "walkin" || source === "opd") {
            if (detail.isPromo) {
              net += detail.promo;
              discount += amount - detail.promo;
            } else {
              if (privilege > 0 && detail.discountable) {
                net += amount * ((100 - percentage) / 100);
                discount += amount * ((100 - percentage) / 100);
              } else {
                net += amount;
              }
            }
          } else {
            if (privilege > 0 && detail.discountable) {
              net += amount * ((100 - percentage) / 100);
              discount += amount * ((100 - percentage) / 100);
            } else {
              net += amount;
            }
          }
        } else {
          invalid = true;
        }
      });

      if (invalid) {
        setIsInvalid(true);
      } else {
        setIsInvalid(false);
      }

      setGross(gross);
      setNet(net);
      setDiscount(discount);
    } else {
      setGross(0);
      setNet(0);
      setDiscount(0);
    }
  }, [deals, privilege, source, percentage]);

  const handleCheckout = () => {
    if (deals.length > 0) {
      if (!isInvalid) {
        if (privilege === 2) {
          const age = getAge(user.dob);
          if (age < 60) {
            toast.warn(`Cannot be a Senior Citizen at the age of ${age}`);
          } else {
            handleProcess();
          }
        } else {
          handleProcess();
        }
      } else {
        toast.warn("Cannot checkout invalid price!");
      }
    } else {
      toast.warn("Cannot checkout without transaction!");
    }
  };

  const handleProcess = async () => {
    var items = [];

    deals.map(detail => {
      var item = {
        menuId: detail._id,
        info: detail,
        up: 0,
        discountable: false,
        ip: 0,
      };

      var amount = detail[source === "walkin" ? "opd" : source];

      if (source === "walkin" || source === "opd") {
        if (detail.isPromo) {
          item.up = detail.promo;
        } else {
          if (privilege > 0 && detail.discountable) {
            item.up = amount * ((100 - percentage) / 100);
            item.ip = amount;
            item.discountable = true;
          } else {
            item.up = amount;
          }
        }
      } else {
        if (privilege > 0 && detail.discountable) {
          item.up = amount * ((100 - percentage) / 100);
          item.ip = amount;
          item.discountable = true;
        } else {
          item.up = amount;
        }
      }
      items.push(item);
    });

    var form = {
      branchId: onDuty._id,
      customerId: user._id,
      cashierId: auth._id,
      cashierInfo: auth,
      customerInfo: user,
      privilege,
      source,
      payment,
      cash: 0,
      amount: net,
      isPickup,
      items,
    };

    if (privilege > 0) {
      form.discount = percentage;
    }

    if (doctor) {
      form.physicianId = doctor;
    }

    if (payment !== "free") {
      const { value: cash } = await Swal.fire({
        title: `Total purchase: ${currencyFormatter(net)}`,
        input: "number",
        inputLabel: "Kindly ask the customer for payment.",
        inputPlaceholder: "Enter received amount.",
        inputValidator: value => {
          if (!value) {
            return "You haven't typed anything!";
          }

          if (net > Number(value)) {
            return "You received insufficient amount.";
          }
        },
      });

      if (cash) {
        const change = Number(cash) - net;
        if (change > 0) {
          Swal.fire(
            `Please return ${currencyFormatter(Number(cash) - net)}`,
            "Giving back change starts with you.",
            "info"
          ).then(handleToggle);
        } else {
          Swal.fire(
            `Always thank a customer for paying exact amount.`,
            "Appreciate the small things.",
            "info"
          ).then(handleToggle);
        }

        form.cash = Number(cash);
        if (privilege > 0 && privilege < 4) {
          if (user.privilege !== privilege) {
            dispatch(UPDATE({ token, id: user._id, data: { privilege } }));
          }
        }

        dispatch(RECENT(form));

        dispatch(SAVE({ token, form }));
      }
    } else {
      setForm(form);
      setAuthorization(true);
    }
  };

  const handleFree = user => {
    const newForm = { ...form };
    newForm.authorizedBy = user._id;

    if (user.privilege !== privilege) {
      dispatch(UPDATE({ token, id: user._id, data: { privilege } }));
    }

    dispatch(SAVE({ token, form: newForm }));
    setAuthorization(false);
    handleToggle();
  };

  return (
    <MDBContainer fluid>
      <MDBTypography
        tag="h4"
        className="mb-3 d-flex align-items-end justify-content-between"
      >
        <span>{nameFormatter(user?.fullName)}</span>
        <small>
          {getAge(user.dob, true)} - {user.isMale ? "Male" : "Female"}
        </small>
      </MDBTypography>
      <MDBRow>
        <MDBCol size={6}>
          <MDBInputGroup
            textBefore={<span className={theme.text}>Sources :</span>}
          >
            <select
              className={`form-control ${theme.bg} ${theme.text}`}
              onChange={e => {
                setPayment(payments[e.target.value][0]);
                setSource(e.target.value);
              }}
              value={source}
            >
              {categories.map((source, index) => (
                <option key={`source-${index}`} value={source.action}>
                  {source.value}
                </option>
              ))}
            </select>
          </MDBInputGroup>
        </MDBCol>
        <MDBCol size={6}>
          <MDBInputGroup
            textBefore={<span className={theme.text}>Privileges</span>}
          >
            <select
              className={`form-control ${theme.bg} ${theme.text}`}
              onChange={e => setPrivilege(Number(e.target.value))}
              disabled={user.privilege ? true : false}
              value={privilege}
            >
              {privileges.map((privilege, index) => (
                <option key={`privilege-${index}`} value={index}>
                  {privilege}
                </option>
              ))}
            </select>
          </MDBInputGroup>
        </MDBCol>
        <MDBCol size={6} className="mt-3">
          <MDBInputGroup
            textBefore={<span className={theme.text}>Physician</span>}
          >
            <select
              className={`form-control ${theme.bg} ${theme.text}`}
              onChange={e => setDoctor(e.target.value)}
              value={doctor}
            >
              <option value="" />
              {doctors?.map(doctor => (
                <option key={`doctor-${doctor._id}`} value={doctor._id}>
                  {nameFormatter(doctor.fullName)}
                </option>
              ))}
            </select>
          </MDBInputGroup>
        </MDBCol>
        <MDBCol size={6} className="mt-3 d-flex align-items-center">
          <MDBSwitch
            onChange={() => setIsPickup(!isPickup)}
            checked={isPickup}
            id="isPickup"
            label={isPickup ? "Pickup" : "Deliver"}
          />
        </MDBCol>
      </MDBRow>
      {better._id && (
        <MDBTypography
          note
          noteColor="info"
          className="text-dark mt-3 mb-0 d-flex align-items-center justify-content-between"
        >
          <span>
            <strong>Suggestion: </strong> your selected services suits&nbsp;
            <b>{better.name}</b>
            &nbsp;best.
          </span>
          <MDBIcon
            title="Close suggestion."
            onClick={() => setBetter({})}
            icon="times"
            className="me-2 cursor-pointer"
          />
        </MDBTypography>
      )}
      <DealTable
        deals={deals}
        percentage={percentage}
        source={source}
        privilege={privilege}
        handleRemove={handleRemove}
      />
      <DetailsFooter gross={gross} net={net} discount={discount} />
      <div className="mt-3 d-flex align-items-center justify-content-between">
        <MDBInputGroup
          className="w-50"
          textBefore={<span className={theme.text}>Payment</span>}
        >
          <select
            className={`form-control ${theme.bg} ${theme.text} text-capitalize`}
            onChange={e => setPayment(e.target.value)}
            value={payment}
          >
            {payments[source].map((payment, index) => (
              <option
                key={`payment-${index}`}
                value={payment}
                className="text-capitalize"
              >
                {payment}
              </option>
            ))}
          </select>
        </MDBInputGroup>
        <MDBBtn onClick={handleCheckout}>checkout</MDBBtn>
      </div>
      <EmployeeAuthorization
        visibility={authorization}
        setVisibility={setAuthorization}
        getResponse={handleFree}
      />
    </MDBContainer>
  );
}
