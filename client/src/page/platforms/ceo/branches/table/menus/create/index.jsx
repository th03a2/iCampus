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
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import {
  REVERT,
  SAVE,
  UPDATE,
} from "../../../../../../../redux/slices/commerce/menus";
import { arrayEquals } from "../../../../../components/utilities";

export default function MenuCreate({
  services,
  handleDelete,
  branchId,
  setSelectedServices,
  editService,
}) {
  const { theme, token } = useSelector(({ auth }) => auth),
    { didSubmit, catalogs } = useSelector(({ packages }) => packages),
    [isProfile, setIsProfile] = useState(false),
    [duplicate, setDuplicate] = useState({}),
    [form, setForm] = useState({
      discountable: false,
      hasReseco: false,
      capital: 0,
      refund: 0,
      opd: 0,
      hmo: 0,
      cw: 0,
      pw: 0,
      er: 0,
      promo: 0,
    }),
    dispatch = useDispatch();

  useEffect(() => {
    if (didSubmit) {
      setIsProfile(false);
      setForm({
        discountable: false,
        hasReseco: false,
        capital: 0,
        refund: 0,
        opd: 0,
        hmo: 0,
        cw: 0,
        pw: 0,
        er: 0,
        promo: 0,
      });
      dispatch(REVERT());
      setSelectedServices([]);
    }
  }, [didSubmit]);

  useEffect(() => {
    setIsProfile(services.length > 1);
    if (catalogs.length > 0 && services.length > 0) {
      var duplicate = {};

      catalogs.map(catalog => {
        var a = [...catalog.services],
          b = [...services];

        if (arrayEquals(a, b)) {
          duplicate = catalog;
        }
      });

      if (editService._id) {
        if (duplicate._id !== editService._id) {
          setDuplicate(duplicate);
        } else {
          setDuplicate({});
        }
      } else {
        setDuplicate(duplicate);
      }
    } else {
      setDuplicate({});
    }
  }, [services, catalogs, editService]);

  useEffect(() => {
    if (editService._id) {
      setForm(editService);
    }
  }, [editService]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "name" ? String(value).toUpperCase() : Number(value),
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (services.length > 0) {
      if (Number(form.opd) < Number(form.capital)) {
        toast.warn("Normal price cannot be lower than your capital.");
      } else {
        const serviceIds = services.map(service => service.id),
          newObj = { ...form };

        newObj.isProfile = isProfile;
        newObj.branchId = branchId;
        newObj.services = serviceIds.sort();

        if (newObj._id) {
          dispatch(UPDATE({ data: newObj, id: newObj._id, token }));
        } else {
          dispatch(SAVE({ form: newObj, token }));
        }
      }
    } else {
      toast.warn("Cannot construct a menu without a service!");
    }
  };

  return (
    <MDBContainer>
      <MDBTypography note noteColor="info" className="text-dark text-center">
        <strong>Note:</strong> click the <MDBIcon icon="share-square" /> at
        service list to transfer services and create a menu/package.
      </MDBTypography>
      <form className="mt-4" onSubmit={handleSubmit}>
        <MDBRow>
          <MDBCol size={12}>
            <MDBInput
              type="text"
              label="Name"
              name="name"
              contrast={theme.dark}
              value={form.name || ""}
              onChange={handleChange}
              required
            />
          </MDBCol>
          <MDBCol size={12} className="mt-2">
            {services?.map((service, index) => (
              <MDBBtnGroup key={`${index}-create-`} className="m-1">
                <MDBBtn
                  onClick={() =>
                    Swal.fire(service.name, service.preparation, "info")
                  }
                  type="button"
                  size="sm"
                  className="px-2"
                >
                  {service.abbreviation || service.name}
                </MDBBtn>
                <MDBBtn
                  onClick={() => handleDelete(index)}
                  type="button"
                  size="sm"
                  className="px-2"
                >
                  <MDBIcon icon="times" />
                </MDBBtn>
              </MDBBtnGroup>
            ))}
            {services.length < 1 && (
              <MDBBtn
                disabled
                type="button"
                color="info"
                size="sm"
                className="px-2 m-1"
              >
                Selected service will show here.
              </MDBBtn>
            )}
          </MDBCol>
          <MDBCol size={4} className="mb-3 mt-2">
            <MDBSwitch
              onChange={() =>
                setForm({ ...form, discountable: !form.discountable })
              }
              checked={form.discountable}
              id="discountable"
              label="Discountable"
            />
          </MDBCol>
          <MDBCol size={4} className="mb-3 mt-2">
            <MDBSwitch
              onChange={() => setForm({ ...form, hasReseco: !form.hasReseco })}
              checked={form.hasReseco}
              id="hasReseco"
              label="Benefit referrals"
            />
          </MDBCol>
          <MDBCol size={4} className="mb-3 mt-2">
            <MDBSwitch checked={isProfile} disabled label="Package" />
          </MDBCol>
          <MDBCol size={6}>
            <MDBInput
              type="number"
              label="Capital"
              name="capital"
              contrast={theme.dark}
              value={String(form.capital) || ""}
              onChange={handleChange}
              required
            />
          </MDBCol>
          <MDBCol size={6}>
            <MDBInput
              type="number"
              label="Refund"
              name="refund"
              contrast={theme.dark}
              value={String(form.refund) || ""}
              onChange={handleChange}
              required
            />
          </MDBCol>
          <MDBCol size={6} className="mt-3">
            <MDBInput
              type="number"
              label="Walkin/OPD"
              name="opd"
              contrast={theme.dark}
              value={String(form.opd) || ""}
              onChange={handleChange}
              required
            />
          </MDBCol>
          <MDBCol size={6} className="mt-3">
            <MDBInput
              type="number"
              label="Health Maintenance Organization"
              name="hmo"
              contrast={theme.dark}
              value={String(form.hmo) || ""}
              onChange={handleChange}
            />
          </MDBCol>
          <MDBCol size={6} className="mt-3">
            <MDBInput
              type="number"
              label="Charity Ward"
              name="cw"
              contrast={theme.dark}
              value={String(form.cw) || ""}
              onChange={handleChange}
            />
          </MDBCol>
          <MDBCol size={6} className="mt-3">
            <MDBInput
              type="number"
              label="Private Ward"
              name="pw"
              contrast={theme.dark}
              value={String(form.pw) || ""}
              onChange={handleChange}
            />
          </MDBCol>
          <MDBCol size={6} className="mt-3">
            <MDBInput
              type="number"
              label="Emergency Room"
              name="er"
              contrast={theme.dark}
              value={String(form.er) || ""}
              onChange={handleChange}
            />
          </MDBCol>
          <MDBCol size={6} className="mt-3">
            <MDBInput
              type="number"
              label="Promo"
              name="promo"
              contrast={theme.dark}
              value={String(form.promo) || ""}
              onChange={handleChange}
            />
          </MDBCol>
        </MDBRow>
        {duplicate.name && (
          <MDBTypography
            note
            noteColor="warning"
            className="mt-3 text-dark text-center mb-0"
          >
            <strong>Duplicate menu:</strong> the existing menu is named&nbsp;
            <strong>{duplicate.name}</strong>
          </MDBTypography>
        )}
        <div className="text-end">
          <MDBBtn
            disabled={duplicate.name}
            color={form._id ? "info" : "primary"}
            type="submit"
            className="mt-3"
          >
            {form._id ? "Edit" : "Submit"}
          </MDBBtn>
        </div>
      </form>
    </MDBContainer>
  );
}
