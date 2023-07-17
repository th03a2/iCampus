import React, { useState, useEffect } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBInputGroup,
  MDBTypography,
} from "mdb-react-ui-kit";
import {
  nameFormatter,
  templates,
} from "../../../../../../../../components/utilities";
import SaleTable from "./table";
import { Services } from "../../../../../../../../fakeDb";
import { useSelector, useDispatch } from "react-redux";
import { browse, save } from "../../../../../../../../redux/sqlbuilder";
import { UPDATE } from "../../../../../../../../redux/slices/commerce/sales";
import { sourceColors } from "../../../../../../../../assets/references";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function ResultCard({
  index,
  activeIndex,
  setActiveIndex,
  sale,
}) {
  const { auth, token, onDuty } = useSelector(({ auth }) => auth),
    [doctors, setDoctors] = useState([]),
    dispatch = useDispatch();

  useEffect(() => {
    if (onDuty._id) {
      const handleDoctors = async () =>
        setDoctors(await browse(`branches/${onDuty._id}/doctors`, "", token));

      handleDoctors();
    }
  }, [onDuty, token]);

  const toggleShow = () => {
    if (activeIndex === index) {
      setActiveIndex(0);
    } else {
      setActiveIndex(index);
    }
  };

  const formHandlers = () => {
    var _services = sale.items?.map(deal =>
        Services.whereIn(deal.menuId.packages)
      ),
      _forms = [];

    _forms = _services.map(service =>
      service.map(
        ({ department, template }) =>
          templates.find(model => model.department === department).components[
            template
          ]
      )
    );
    var forms = [...new Set(_forms[0])];

    forms = Array.from(new Set(forms.map(test => test)));

    forms.map(form => {
      let packages = {};
      switch (form) {
        case "Chemistry":
        case "Serology":
          _services.filter(service =>
            service
              .filter(
                ({ department, template }) =>
                  templates.find(template => template.department === department)
                    .components[template] === form
              )
              .map(({ id }) => (packages[id] = ""))
          );
          break;
        case "Miscellaneous":
          // Solo form: Preg test (70), Dengue Duo (77), Blood Typing (66)
          packages = [];
          _services.filter(service =>
            service
              .filter(
                ({ department, template }) =>
                  templates.find(template => template.department === department)
                    .components[template] === form
              )
              .map(({ id }) => {
                switch (id) {
                  case 70:
                  case 77:
                  case 66:
                    break;
                    save(
                      `results/laboratory/${String(form).toLowerCase()}`,
                      {
                        packages,
                        _id: sale._id,
                        customerId: sale.customerId?._id,
                        branchId: onDuty._id,
                      },
                      token,
                      false
                    );
                  default:
                    packages.push(id);
                }
              })
          );
          if (packages.length > 0) {
          }
          break;
        case "Hematology":
          break;
        default:
          packages = [];
          _services.filter(service =>
            service
              .filter(
                ({ department, template }) =>
                  templates.find(template => template.department === department)
                    .components[template] === form
              )
              .map(({ id }) => packages.push(id))
          );
      }

      save(
        `results/laboratory/${String(form).toLowerCase()}`,
        {
          packages,
          _id: sale._id,
          customerId: sale.customerId?._id,
          branchId: onDuty._id,
        },
        token,
        false
      );
    });
    dispatch(
      UPDATE({
        data: {
          renderedBy: auth._id,
          renderedAt: new Date().toLocaleString(),
          hasResult: true,
        },
        id: sale._id,
        token,
      })
    );
    setActiveIndex(0);
  };

  const handleNewDoctor = async () => {
    const response = await axios.get("users/role?key=doctor", {
      headers: {
        Authorization: `QTracy ${token}`,
      },
    });

    const { data } = response;

    const _doctors = data.filter(user => {
      const exist = doctors.find(exst => exst._id === user._id);
      if (!exist) {
        return user;
      }
    });

    if (_doctors.length > 0) {
      var inputOptions = {};

      _doctors.map(
        doctor => (inputOptions[doctor._id] = nameFormatter(doctor.fullName))
      );

      const { value: doctor } = await Swal.fire({
        input: "select",
        inputOptions,
        inputPlaceholder: "Select a doctor",
        showCancelButton: true,
        inputValidator: value => {
          return new Promise(resolve => {
            if (!value) {
              resolve("You need to select something.");
            } else {
              resolve();
            }
          });
        },
      });

      if (doctor) {
        const newArr = [...doctors];
        newArr.push(_doctors.find(dctr => dctr._id === doctor));

        const newAffiliates = newArr.map(dctr => dctr._id);

        const res = await axios.put(
          `branches/${onDuty._id}/update`,
          { affiliated: newAffiliates },
          {
            headers: {
              Authorization: `QTracy ${token}`,
            },
          }
        );

        if (res) {
          toast.success("Added successfully");
          setDoctors(newArr);
        }
      }
    } else {
      toast.warn("No more existing doctors.");
    }
  };

  const { source, renderedBy, customerId, _id, physicianId, items } = sale;
  return (
    <MDBTypography
      note
      noteColor={renderedBy ? "primary" : "warning"}
      className="text-dark mb-2"
    >
      <MDBContainer className="d-flex align-items-center justify-content-between">
        <span>
          <strong>{index}.</strong>
          <span className="ms-2 me-3">
            {nameFormatter(customerId?.fullName, false)}
          </span>
          <MDBBadge className="text-uppercase" color={sourceColors(source)}>
            {source}
          </MDBBadge>
        </span>
        <MDBBtn onClick={toggleShow} size="sm" className="shadow-0">
          <MDBIcon
            icon={`caret-${index === activeIndex ? "down" : "left"}`}
            color="white"
          />
        </MDBBtn>
      </MDBContainer>
      <MDBCollapse show={index === activeIndex} className="px-4 mt-2">
        <MDBInputGroup textBefore="Physician" className="w-50">
          <select
            className="form-control"
            onChange={e => {
              if (e.target.value === "new") {
                handleNewDoctor();
              } else {
                dispatch(
                  UPDATE({
                    data: {
                      physicianId: e.target.value || null,
                    },
                    id: _id,
                    token,
                  })
                );
              }
            }}
            value={physicianId?._id || ""}
          >
            <option value="" />
            <option value="new">Add a doctor</option>
            {doctors?.map(doctor => (
              <option key={`doctor-${doctor._id}`} value={doctor._id}>
                {nameFormatter(doctor.fullName)}
              </option>
            ))}
          </select>
        </MDBInputGroup>
        <SaleTable deals={items || []} />
        <div className="d-flex justify-content-between">
          <MDBBtn>Add service</MDBBtn>
          <MDBBtn color="info" onClick={formHandlers}>
            Generate Tickets (Task)
          </MDBBtn>
        </div>
      </MDBCollapse>
    </MDBTypography>
  );
}
