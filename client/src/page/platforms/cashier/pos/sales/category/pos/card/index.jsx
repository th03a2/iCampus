import React, { useState } from "react";
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
import Contract from "../../../../contracts";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE } from "../../../../../../../../redux/slices/commerce/sales";
import { sourceColors } from "../../../../../../../../assets/references";

export default function ResultCard({
  index,
  activeIndex,
  setActiveIndex,
  sale,
}) {
  const { token } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ physicians }) => physicians),
    [visibility, setVisibility] = useState(false),
    dispatch = useDispatch();

  const toggleShow = () => {
    setActiveIndex(activeIndex === index ? 0 : index);
  };

  const handleNewDoctor = async () => {
    //   const response = await axios.get("users/role?key=doctor", {
    //     headers: {
    //       Authorization: `QTracy ${token}`,
    //     },
    //   });
    //   const { data } = response;
    //   const _catalogs = data.filter(user => {
    //     const exist = catalogs.find(exst => exst._id === user._id);
    //     if (!exist) {
    //       return user;
    //     }
    //   });
    //   if (_catalogs.length > 0) {
    //     var inputOptions = {};
    //     _catalogs.map(
    //       doctor => (inputOptions[doctor._id] = nameFormatter(doctor.fullName))
    //     );
    //     const { value: doctor } = await Swal.fire({
    //       input: "select",
    //       inputOptions,
    //       inputPlaceholder: "Select a doctor",
    //       showCancelButton: true,
    //       inputValidator: value => {
    //         return new Promise(resolve => {
    //           if (!value) {
    //             resolve("You need to select something.");
    //           } else {
    //             resolve();
    //           }
    //         });
    //       },
    //     });
    //     if (doctor) {
    //       const newArr = [...catalogs];
    //       newArr.push(_catalogs.find(dctr => dctr._id === doctor));
    //       const newAffiliates = newArr.map(dctr => dctr._id);
    //       const res = await axios.put(
    //         `branches/${onDuty._id}/update`,
    //         { affiliated: newAffiliates },
    //         {
    //           headers: {
    //             Authorization: `QTracy ${token}`,
    //           },
    //         }
    //       );
    //       if (res) {
    //         toast.success("Added successfully");
    //         setcatalogs(newArr);
    //       }
    //     }
    //   } else {
    //     toast.warn("No more existing catalogs.");
    //   }
  };

  const { category, renderedBy, customerId, _id, physicianId, deals } = sale;

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
          <MDBBadge className="text-uppercase" color={sourceColors(category)}>
            {category}
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
            {catalogs?.map(({ user }) => (
              <option key={`doctor-${user._id}`} value={user._id}>
                {nameFormatter(user.fullName)}
              </option>
            ))}
            <option value="new">-- Add a doctor --</option>
          </select>
        </MDBInputGroup>
        <SaleTable deals={deals || []} />
        <div className="d-flex justify-content-start">
          <MDBBtn onClick={() => setVisibility(true)}>Add service</MDBBtn>
        </div>
      </MDBCollapse>
      <Contract
        user={customerId}
        visibility={visibility}
        setVisibility={setVisibility}
        usage="addons"
      />
    </MDBTypography>
  );
}
