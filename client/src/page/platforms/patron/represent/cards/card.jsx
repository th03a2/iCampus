import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardSubTitle,
  MDBCardTitle,
  MDBCol,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { ENDPOINT, PresetUser } from "../../../../../components/utilities";
import {
  SAVE,
  UPDATE,
} from "../../../../../redux/slices/assets/persons/personnels";
import { toast } from "react-toastify";

export default function CompanyCard({ company }) {
  const { auth, token, theme } = useSelector(({ auth }) => auth),
    { record } = useSelector(({ petitions }) => petitions),
    [didHover, setDidHover] = useState(false),
    dispatch = useDispatch();

  const handleSelect = async () => {
    if (!record._id) {
      const { value: message } = await Swal.fire({
        icon: "info",
        title: "Are you sure?",
        html: `A request will be sent to <u>${company.name}</u>`,
        input: "textarea",
        inputLabel: "You can attach a message. (Optional)",
        confirmButtonText: "Send it!",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            dispatch(
              SAVE({
                form: {
                  userId: auth._id,
                  companyId: company._id,
                },
                token,
              })
            );
          }
        },
      });

      if (message) {
        dispatch(
          SAVE({
            form: {
              userId: auth._id,
              companyId: company._id,
              message,
            },
            token,
          })
        );
      }
    } else {
      switch (record.status) {
        case "approved":
          toast.info(
            `You are already approved as ${record.companyId?.name}'s representative.`
          );
          break;

        case "denied":
          const { value: message } = await Swal.fire({
            icon: "info",
            title: "Resend a request?",
            html: `A request will be sent to <u>${company.name}</u>`,
            input: "textarea",
            inputLabel: "You can attach a message. (Optional)",
            confirmButtonText: "Send it!",
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                dispatch(
                  UPDATE({
                    id: record._id,
                    token,
                    data: {
                      status: "pending",
                      companyId: company._id,
                      message: "",
                    },
                  })
                );
              }
            },
          });

          if (message) {
            dispatch(
              UPDATE({
                id: record._id,
                token,
                data: { status: "pending", companyId: company._id, message },
              })
            );
          }
          break;

        default:
          if (record.companyId?._id === company._id) {
            toast.info("You already sent a request to this company.");
          } else {
            toast.warn(
              `You already have a pending request with ${record.companyId?.name}.`
            );
          }
          break;
      }
    }
  };

  return (
    <MDBCol size={4} className="mb-4">
      <MDBCard
        onMouseOver={() => setDidHover(true)}
        onMouseOut={() => setDidHover(false)}
        onClick={handleSelect}
        className={`h-100 cursor-pointer ${theme.bg} ${theme.text} shadow-${
          didHover ? 5 : 1
        }`}
      >
        <MDBCardBody className="text-center">
          <MDBCardImage
            src={`${ENDPOINT}/assets/companies/${company.name}.jpg`}
            className="mb-3 img-thumbnail bg-transparent"
            style={{ height: 200, width: "auto" }}
            onError={(e) => (e.target.src = PresetUser)}
          />
          <MDBCardTitle>{company.name}</MDBCardTitle>
          <MDBCardSubTitle>{company.subName}</MDBCardSubTitle>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}
