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
import { nameFormatter } from "../../../../../../../../components/utilities";
import SaleTable from "./table";
import Pos from "../../../../patients/pos";
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
    [visibility, setVisibility] = useState(false),
    dispatch = useDispatch();

  useEffect(() => {
    if (onDuty._id) {
      const handleDoctors = async () =>
        setDoctors(
          await browse(`branches/${onDuty._id}/doctors`, "", token)
        );

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

  const handleNewDoctor = async () => {
    const response = await axios.get("users/role?key=doctor", {
      headers: {
        Authorization: `QTracy ${token}`,
      },
    });

    const { data } = response;

    const _doctors = data.filter((user) => {
      const exist = doctors.find((exst) => exst._id === user._id);
      if (!exist) {
        return user;
      }
    });

    if (_doctors.length > 0) {
      var inputOptions = {};

      _doctors.map(
        (doctor) => (inputOptions[doctor._id] = nameFormatter(doctor.fullName))
      );

      const { value: doctor } = await Swal.fire({
        input: "select",
        inputOptions,
        inputPlaceholder: "Select a doctor",
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
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
        newArr.push(_doctors.find((dctr) => dctr._id === doctor));

        const newAffiliates = newArr.map((dctr) => dctr._id);

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

  const { source, renderedBy, customerId, _id, physicianId, services } = sale;
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
            onChange={(e) => {
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
            {doctors?.map((doctor) => (
              <option key={`doctor-${doctor._id}`} value={doctor._id}>
                {nameFormatter(doctor.fullName)}
              </option>
            ))}
          </select>
        </MDBInputGroup>
        <SaleTable deals={services || []} />
        <div className="d-flex justify-content-start">
          <MDBBtn onClick={() => setVisibility(true)}>Add service</MDBBtn>
        </div>
      </MDBCollapse>
      <Pos
        user={customerId}
        visibility={visibility}
        setVisibility={setVisibility}
        usage="addons"
      />
    </MDBTypography>
  );
}
