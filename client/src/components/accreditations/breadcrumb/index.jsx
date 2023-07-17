import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInputGroup,
  MDBRow,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { Laboratory } from "../../../fakeDb";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { UPLOAD } from "../../../redux/slices/assets/persons/auth";
import { SAVE, BROWSE } from "../../../redux/slices/accreditations/areas";

const BreadCrumb = ({ parameter, setFile, title = "" }) => {
  const { theme, onDuty, token, auth } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ areas }) => areas),
    [parameters, setParameters] = useState([]),
    [criteria, setCriteria] = useState(""),
    [indicators, setIndicators] = useState([]),
    [indicator, setIndicator] = useState(0),
    dispatch = useDispatch();

  useEffect(() => {
    onDuty._id &&
      dispatch(BROWSE({ data: { branchId: onDuty._id, tools: title }, token }));
  }, [onDuty]);

  useEffect(() => {
    !!parameter && setParameters(Laboratory.find(parameter).parameters);
  }, [parameter]);

  const handleIndicators = (e) => {
    const { value } = e.target;
    setCriteria(value);
    setIndicators(parameters.find(({ id }) => id === Number(value)).indicators);
    setIndicator(0);
  };

  const fileUpload = (file, extension) => {
    const reader = new FileReader();
    reader.onload = () => {
      dispatch(
        UPLOAD({
          data: {
            path: `credentials/${onDuty.company}/${onDuty.name}/accreditations/${title}/${criteria}`,
            base64: reader.result.split(",")[1],
            name: `${indicator}${extension}`,
          },
          token,
          willRefresh: false,
        })
      );
      //put db save here
      const form = {
        branchId: onDuty._id,
        userId: auth._id,
        tools: title,
        criteria: criteria,
        indicator: `${indicator}${extension}`,
      };
      console.log(form);
      dispatch(SAVE({ form, token }));
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = (e) => {
    const _file = e.target.files[0];

    // console.log(criteria);
    // console.log(indicator);

    Swal.fire({
      title: "Are you sure?",
      html: "This will override existing image.",
      showCancelButton: true,
      confirmButtonText: "Proceed",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const fileType = _file.type;
        let isValid = false;
        let extension = ".jpg";

        switch (fileType) {
          case "image/jpeg":
          case "image/jpg":
          case "image/png":
            setFile({
              isImage: true,
              value: _file,
              preview: URL.createObjectURL(_file),
            });
            isValid = true;

            break;

          case "application/pdf":
            setFile({
              isImage: false,
              value: _file,
              preview: URL.createObjectURL(_file),
            });
            isValid = true;
            extension = ".pdf";
            break;

          default:
            toast.warn("Please upload an image or pdf only");
            break;
        }

        if (isValid) {
          fileUpload(_file, extension);
        }
      }
    });
  };

  return (
    <MDBContainer
      fluid
      style={{ width: "90%" }}
      className={`custom-sticky-bread transition-all ${theme.skin} font-poppins`}
    >
      <MDBRow>
        <MDBCol md={2} size={2}>
          {title}
        </MDBCol>
        <MDBCol md={7} size={7} className="d-flex align-items-center p-0">
          <MDBInputGroup textBefore="CRITERIA" className="me-3 w-50">
            <select
              onChange={handleIndicators}
              value={criteria}
              className="form-control"
            >
              <option></option>
              {parameters.map(({ criteria, id }, index) => (
                <option key={`${index}-criteria`} value={id}>
                  {criteria}
                </option>
              ))}
            </select>
          </MDBInputGroup>
          <MDBInputGroup textBefore="INDICATOR" className="ms-3 w-50">
            <select
              onChange={(e) => setIndicator(e.target.value)}
              className="form-control"
            >
              {indicators.map((indicator, index) => (
                <option key={`${index}-indicator`} value={index}>
                  {indicator}
                </option>
              ))}
            </select>
          </MDBInputGroup>
        </MDBCol>
        <MDBCol size={2} className="text-end">
          <label htmlFor="uploadFile" className="btn btn-primary">
            <MDBIcon icon="upload" /> Upload File
          </label>
          <input
            disabled={criteria ? false : true}
            onChange={handleUpload}
            type="file"
            id="uploadFile"
            className="d-none"
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default BreadCrumb;
