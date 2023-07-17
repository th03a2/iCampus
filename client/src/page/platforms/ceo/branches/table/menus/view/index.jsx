import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBBtnGroup,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBSwitch,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import Services from "../../../../../../../fakeDb";
import Swal from "sweetalert2";
import {
  UPDATE,
  REVERT,
} from "../../../../../../../redux/slices/commerce/menus";
import { toast } from "react-toastify";
import { arrayEquals } from "../../../../../../../components/utilities";

export default function MenuView({
  setDuplicate,
  duplicate,
  handleDelete,
  didEdit,
  setDidEdit,
  menu,
  setMenu,
}) {
  const { theme, token } = useSelector(({ auth }) => auth),
    { didSubmit, catalogs } = useSelector(({ packages }) => packages),
    [dupe, setDupe] = useState({}),
    dispatch = useDispatch();

  useEffect(() => {
    if (catalogs.length > 0 && menu.packages.length > 0) {
      var dupe = {};

      catalogs.map(catalog => {
        var a = [...catalog.packages],
          b = [...menu.packages];

        if (arrayEquals(a, b) && catalog._id !== menu._id) {
          dupe = catalog;
        }

        return catalog;
      });

      setDupe(dupe);
    }
  }, [menu, catalogs]);

  useEffect(() => {
    if (didSubmit && didEdit) {
      dispatch(REVERT());
      setDuplicate(0);
      setDidEdit(false);
    }
  }, [didSubmit]);

  const handleChange = (name, value) => {
    if (!didEdit) {
      setDidEdit(true);
    }
    setMenu({
      ...menu,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (menu.packages.length > 0) {
      if (menu.opd < menu.capital) {
        toast.warn("Normal price cannot be lower than your capital.");
      } else {
        dispatch(
          UPDATE({
            data: menu,
            id: menu._id,
            token,
          })
        );
      }
    } else {
      toast.warn("Cannot construct a menu without a service!");
    }
  };

  return (
    <MDBContainer>
      <div className="d-flex align-items-center justify-content-between ">
        <MDBTypography tag="h4" className="mb-0">
          {didEdit ? "Editing" : "Viewing"} {menu.name}
        </MDBTypography>
        <MDBBtnGroup>
          {!didEdit && (
            <MDBBtn
              onClick={() => setDidEdit(true)}
              size="sm"
              color="info"
              title="Edit information."
            >
              <MDBIcon icon="pen" />
            </MDBBtn>
          )}
          <MDBBtn
            onClick={() => {
              setDidEdit(false);
              setMenu({});
            }}
            size="sm"
          >
            <MDBIcon icon="times" />
          </MDBBtn>
        </MDBBtnGroup>
      </div>
      <MDBRow className="mt-3">
        <MDBCol size={12}>
          <MDBInput
            type="text"
            label="Name"
            onChange={e => handleChange("name", e.target.value)}
            value={menu?.name}
            contrast={theme.dark}
          />
        </MDBCol>
        <MDBCol size={12} className="mt-2">
          {menu?.packages?.map((fk, index) => {
            const { id, name, abbreviation, preparation } = Services.find(fk);
            return (
              <MDBBtnGroup key={`${index}-view-`} className="m-1">
                <MDBBtn
                  color={duplicate === id && "warning"}
                  onClick={() => Swal.fire(name, preparation, "info")}
                  type="button"
                  size="sm"
                  className="px-2"
                >
                  {abbreviation}
                </MDBBtn>
                {didEdit && (
                  <MDBBtn
                    color={duplicate === id && "warning"}
                    onClick={() => handleDelete(index)}
                    type="button"
                    size="sm"
                    className="px-2"
                  >
                    <MDBIcon icon="times" />
                  </MDBBtn>
                )}
              </MDBBtnGroup>
            );
          })}
          {menu?.packages.length < 1 && (
            <MDBBtn type="button" size="sm" className="px-2 m-1">
              Selected service will show here.
            </MDBBtn>
          )}
        </MDBCol>
        <MDBCol size={4} className="mb-3 mt-2">
          <MDBSwitch
            onChange={() => handleChange("discountable", !menu.discountable)}
            checked={menu.discountable}
            id="discountable"
            label="Discountable"
          />
        </MDBCol>
        <MDBCol size={4} className="mb-3 mt-2">
          <MDBSwitch
            onChange={() => handleChange("hasReseco", !menu.hasReseco)}
            checked={menu.hasReseco}
            id="hasReseco"
            label="Benefits referrals"
          />
        </MDBCol>
        <MDBCol size={4} className="mb-3 mt-2">
          <MDBSwitch checked={menu.isProfile} disabled label="Package" />
        </MDBCol>
        <MDBCol size={6}>
          <MDBInput
            type="number"
            value={String(menu.capital)}
            onChange={e => handleChange("capital", Number(e.target.value))}
            label="Capital"
            contrast={theme.dark}
          />
        </MDBCol>
        <MDBCol size={6}>
          <MDBInput
            value={String(menu.refund)}
            type="number"
            onChange={e => handleChange("refund", Number(e.target.value))}
            label="Refund"
            contrast={theme.dark}
          />
        </MDBCol>
        <MDBCol size={6} className="mt-3">
          <MDBInput
            value={String(menu.opd)}
            type="number"
            onChange={e => handleChange("opd", Number(e.target.value))}
            label="Walkin/OPD"
            contrast={theme.dark}
          />
        </MDBCol>
        <MDBCol size={6} className="mt-3">
          <MDBInput
            value={String(menu.hmo)}
            label="Health Maintenance Organization"
            type="number"
            onChange={e => handleChange("hmo", Number(e.target.value))}
            contrast={theme.dark}
          />
        </MDBCol>
        <MDBCol size={6} className="mt-3">
          <MDBInput
            value={String(menu.cw)}
            type="number"
            onChange={e => handleChange("cw", Number(e.target.value))}
            label="Charity Ward"
            contrast={theme.dark}
          />
        </MDBCol>
        <MDBCol size={6} className="mt-3">
          <MDBInput
            value={String(menu.pw)}
            type="number"
            onChange={e => handleChange("pw", Number(e.target.value))}
            label="Private Ward"
            contrast={theme.dark}
          />
        </MDBCol>
        <MDBCol size={6} className="mt-3">
          <MDBInput
            value={String(menu.er)}
            type="number"
            onChange={e => handleChange("er", Number(e.target.value))}
            label="Emergency Room"
            contrast={theme.dark}
          />
        </MDBCol>
        <MDBCol size={6} className="mt-3">
          <MDBInput
            value={String(menu.promo)}
            label="Promo"
            type="number"
            onChange={e => handleChange("promo", Number(e.target.value))}
            contrast={theme.dark}
          />
        </MDBCol>
      </MDBRow>
      {dupe.name && (
        <MDBTypography
          note
          noteColor="warning"
          className="mt-3 text-dark text-center mb-0"
        >
          <strong>Duplicate menu:</strong> the existing menu is named&nbsp;
          {dupe.name}
        </MDBTypography>
      )}
      {didEdit && (
        <div className="text-end mt-3">
          <MDBBtn disabled={dupe.name} onClick={handleSubmit} color="info">
            update
          </MDBBtn>
        </div>
      )}
    </MDBContainer>
  );
}
