import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import {
  arrayEquals,
  currencyFormatter,
  getAge,
} from "./../../../../../../components/utilities";
import { useDispatch, useSelector } from "react-redux";
import DealTable from "./table";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import {
  REVERT,
  CHECKOUT,
  CLAIMSTUB,
} from "./../../../../../../redux/slices/commerce/sales";
import EmployeeAuthorization from "./../../../../../../components/authorization";
import {
  Header,
  Category,
  Source,
  Privileges,
  Payments,
  Physicians,
  Pickup,
  Footer,
} from "../widgets";

export default function Deals({ handleToggle }) {
  const { auth, onDuty, token } = useSelector(({ auth }) => auth),
    { cart, patron, category, privilege, percentage } = useSelector(
      ({ pos }) => pos
    ),
    { catalogs } = useSelector(({ menus }) => menus),
    { didSubmit, claimstub } = useSelector(({ sales }) => sales),
    [net, setNet] = useState(0),
    [better, setBetter] = useState(0),
    [authorization, setAuthorization] = useState(false),
    [form, setForm] = useState({}),
    [isInvalid, setIsInvalid] = useState(false),
    dispatch = useDispatch();

  useEffect(() => {
    if (claimstub.branchId) {
      localStorage.setItem("claim_stub", JSON.stringify(claimstub));
      window.open(
        "frontdesk/stub/print",
        "Claim Stub",
        "top=100px,width=250px,height=650px"
      );
      dispatch(CLAIMSTUB({}));
    }
  }, [claimstub]);

  useEffect(() => {
    if (didSubmit) {
      dispatch(REVERT());
    }
  }, [didSubmit, dispatch]);

  useEffect(() => {
    if (cart.length > 0) {
      var services = [],
        better = {};

      cart.map((detail) =>
        detail.packages.map((srvc) => {
          services.push(srvc);
        })
      );

      catalogs.map((catalog) => {
        var a = [...catalog.packages],
          b = [...services];

        if (arrayEquals(a, b)) {
          better = catalog;
        }
      });

      const existing = cart.find((detail) => detail._id === better._id);

      if (!existing) {
        setBetter(better);
      } else {
        setBetter({});
      }
    } else {
      setBetter({});
    }
  }, [cart, catalogs]);

  useEffect(() => {
    if (cart.length > 0) {
      var gross = 0,
        net = 0,
        discount = 0,
        invalid = false;

      cart.map((detail) => {
        var amount = detail[category === "walkin" ? "opd" : category];
        if (amount > 0) {
          gross += amount;
          if (category === "walkin" || category === "opd") {
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

      setIsInvalid(invalid);
      setNet(net);
    } else {
      setNet(0);
    }
  }, [cart, category]);

  const handleValidation = () => {
    if (cart.length > 0) {
      if (!isInvalid) {
        if (privilege === 2) {
          const age = getAge(patron.dob);
          if (age < 60) {
            toast.warn(`Cannot be a Senior Citizen at the age of ${age}`);
          } else {
            handleCheckout();
          }
        } else {
          handleCheckout();
        }
      } else {
        toast.warn("Cannot checkout invalid price!");
      }
    } else {
      toast.warn("Cannot checkout without transaction!");
    }
  };

  const handleCheckout = async () => {
    var items = [];

    cart.map((detail) => {
      var item = {
        menuId: detail._id,
        info: detail,
        up: 0,
        discountable: false,
        ip: 0,
      };

      var amount = detail[category === "walkin" ? "opd" : category];

      if (category === "walkin" || category === "opd") {
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
      customerId: patron._id,
      cashierId: auth._id,
      cashierInfo: auth,
      customerInfo: patron,
      category,
      cash: 0,
      amount: net,
      items,
    };

    if ("payment" !== "free") {
      const { value: cash } = await Swal.fire({
        title: `Total purchase: ${currencyFormatter(net)}`,
        input: "number",
        inputLabel: "Kindly ask the customer for payment.",
        inputPlaceholder: "Enter received amount.",
        inputValidator: (value) => {
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
        // if (privilege > 0 && privilege < 4) {
        //   if (patron.privilege !== privilege) {
        //     dispatch(UPDATE({ token, id: patron._id, data: { privilege } }));
        //   }
        // }
        dispatch(CHECKOUT({ token, form }));
        localStorage.setItem("claim_stub", JSON.stringify(form));
        window.open(
          "/printout/stub",
          "Claim Stub",
          "top=100px,width=250px,height=650px"
        );
      }
    } else {
      setForm(form);
      setAuthorization(true);
    }
  };

  const handleFree = (user) => {
    const newForm = { ...form };
    newForm.authorizedBy = user._id;

    // if (user.privilege !== privilege) {
    //   dispatch(UPDATE({ token, id: user._id, data: { privilege } }));
    // }

    dispatch(CHECKOUT({ token, form: newForm }));
    setAuthorization(false);
    handleToggle();
  };

  return (
    <MDBContainer fluid>
      <Header />
      <MDBRow>
        <MDBCol size={6}>
          <Category />
        </MDBCol>
        <MDBCol size={6}>
          <Privileges />
        </MDBCol>
        <MDBCol size={6} className="mt-2 d-flex">
          <Source />
        </MDBCol>
        <MDBCol size={6} className="mt-2 d-flex">
          <Physicians />
        </MDBCol>
        <MDBCol size={6} className="mt-3 d-flex align-items-center">
          <Pickup />
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
      <DealTable />
      <Footer />
      <div className="mt-3 d-flex align-items-center justify-content-between">
        <Payments />
        <MDBBtn onClick={handleValidation}>checkout</MDBBtn>
      </div>
      <EmployeeAuthorization
        visibility={authorization}
        setVisibility={setAuthorization}
        getResponse={handleFree}
      />
    </MDBContainer>
  );
}
