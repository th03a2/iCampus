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
  deal,
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
    var _services = deal.services.map((deal) =>
        Services.whereIn(deal.menuId.packages)
      ),
      _forms = [];

    _forms = _services.map((service) =>
      service.map(
        ({ department, template }) =>
          templates.find((model) => model.department === department).components[
            template
          ]
      )
    );
    var forms = [...new Set(_forms[0])];

    forms = Array.from(new Set(forms.map((test) => test)));

    forms.map((form) => {
      let packages = {};
      switch (form) {
        case "Chemistry":
        case "Serology":
          _services.filter((service) =>
            service
              .filter(
                ({ department, template }) =>
                  templates.find(
                    (template) => template.department === department
                  ).components[template] === form
              )
              .map(({ id }) => (packages[id] = ""))
          );
          break;
        case "Miscellaneous":
          // Solo form: Preg test (70), Dengue Duo (77), Blood Typing (66)
          packages = [];
          _services.filter((service) =>
            service
              .filter(
                ({ department, template }) =>
                  templates.find(
                    (template) => template.department === department
                  ).components[template] === form
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
                        _id: deal._id,
                        customerId: deal.customerId?._id,
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
          _services.filter((service) =>
            service
              .filter(
                ({ department, template }) =>
                  templates.find(
                    (template) => template.department === department
                  ).components[template] === form
              )
              .map(({ id }) => packages.push(id))
          );
      }

      save(
        `results/laboratory/${String(form).toLowerCase()}`,
        {
          packages,
          _id: deal._id,
          customerId: deal.customerId?._id,
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
        id: deal._id,
        token,
      })
    );
    setActiveIndex(0);
  };

  const { source, renderedBy, customerId, _id, physicianId, services } = deal;
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
        <SaleTable deals={services || []} />
        <div className="d-flex justify-content-end">
          <MDBBtn color="info" onClick={formHandlers}>
            Generate Tickets (Task)
          </MDBBtn>
        </div>
      </MDBCollapse>
    </MDBTypography>
  );
}
