import React, { useState, useEffect } from "react";
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBInputGroup,
  MDBTextArea,
  MDBSwitch,
} from "mdb-react-ui-kit";
import {
  getAge,
  privileges,
  validateContactNumber,
} from "../../../../../../components/utilities";
import { Philippines } from "../../../../../../fakeDb";

import { useSelector } from "react-redux";

export default function ModalForm({ search, isMale, setIsMale }) {
  const { theme } = useSelector(({ auth }) => auth),
    [rehiyon, setRehiyon] = useState([]),
    [probinsya, setProbinsya] = useState([]),
    [syudad, setSyudad] = useState([]),
    [baryo, setBaryo] = useState([]),
    [age, setAge] = useState(""),
    [fname, setFname] = useState(""),
    [lname, setLname] = useState("");

  const setProvince = (code) =>
    Philippines.getProvinceByCode(code).then(setProbinsya);

  const setCity = (code) =>
    Philippines.getCityMunByProvince(code).then(setSyudad);

  const setBarangay = (code) =>
    Philippines.getBarangayByMun(code).then(setBaryo);

  useEffect(() => {
    Philippines.regions().then(setRehiyon);
  }, []);

  useEffect(() => {
    if (search) {
      setFname(search.split(", ")[1]);
      setLname(search.split(", ")[0]);
    } else {
      setFname("");
      setLname("");
    }
  }, [search]);

  return (
    <MDBRow>
      <MDBCol md={3}>
        <MDBInput
          type="text"
          label="First name"
          onChange={(e) => setFname(e.target.value)}
          name="fname"
          contrast={theme.dark}
          value={fname || ""}
          required
        />
      </MDBCol>
      <MDBCol md={3}>
        <MDBInput
          type="text"
          label="Middle name (Optional)"
          name="mname"
          contrast={theme.dark}
        />
      </MDBCol>
      <MDBCol md={3}>
        <MDBInput
          type="text"
          label="Last name"
          onChange={(e) => setLname(e.target.value)}
          name="lname"
          value={lname || ""}
          contrast={theme.dark}
          required
        />
      </MDBCol>
      <MDBCol md={3}>
        <MDBInputGroup textBefore={<span className={theme.text}>EXT</span>}>
          <select
            className={`form-control ${theme.bg} ${theme.text}`}
            name="suffix"
          >
            <option></option>
            <option value="JR">JR</option>
            <option value="SR">SR</option>
            <option value="III">III</option>
            <option value="IV">IV</option>
            <option value="V">V</option>
          </select>
        </MDBInputGroup>
      </MDBCol>
      <MDBCol size={3} className="mt-3">
        <MDBInput
          type="text"
          label="Contact Number (+63)"
          name="mobile"
          contrast={theme.dark}
          maxLength={10}
          onKeyDown={validateContactNumber}
          required
        />
      </MDBCol>
      <MDBCol size={3} className="mt-3">
        <MDBInput
          type="date"
          label={age ? `${age} years old` : "Birthday"}
          name="dob"
          contrast={theme.dark}
          onChange={(e) => setAge(getAge(e.target.value))}
          required
        />
      </MDBCol>
      <MDBCol md={3} className="mt-3">
        <MDBInputGroup
          textBefore={<span className={theme.text}>Privilege</span>}
        >
          <select
            className={`form-control ${theme.bg} ${theme.text}`}
            name="privilege"
          >
            {privileges.map((privilege, index) => (
              <option key={`privilege-${index}`} value={index}>
                {privilege}
              </option>
            ))}
          </select>
        </MDBInputGroup>
      </MDBCol>
      <MDBCol size={3} className="text-start d-flex align-items-center mt-3">
        <MDBSwitch
          onChange={() => setIsMale(!isMale)}
          id="isMale"
          label={isMale ? "Male" : "Female"}
        />
      </MDBCol>
      <MDBCol size={12} className="mt-3">
        <h6 className="text-start mb-0">Complete Address</h6>
        <MDBRow>
          <MDBCol md={3} size={6} className="mb-1 mb-md-3">
            <select
              className={`form-control ${theme.bg} ${theme.text}`}
              name="region"
              onChange={(e) => setProvince(e.target.value)}
              required
            >
              <option value="" />
              {rehiyon.map((item, index) => (
                <option key={`region-${index}`} value={item.region_code}>
                  {item.region_name}
                </option>
              ))}
            </select>
          </MDBCol>
          <MDBCol md={3} size={6} className="mb-1 mb-md-3">
            <select
              className={`form-control ${theme.bg} ${theme.text}`}
              name="province"
              onChange={(e) => setCity(e.target.value)}
              required
            >
              <option value="" />
              {probinsya.map((item, index) => (
                <option key={`province-${index}`} value={item.province_code}>
                  {item.province_name}
                </option>
              ))}
            </select>
          </MDBCol>
          <MDBCol md={3} size={6} className="mb-1 mb-md-3">
            <select
              className={`form-control ${theme.bg} ${theme.text}`}
              name="city"
              onChange={(e) => setBarangay(e.target.value)}
              required
            >
              <option value="" />
              {syudad.map((item, index) => (
                <option key={`city-${index}`} value={item.city_code}>
                  {item.city_name}
                </option>
              ))}
            </select>
          </MDBCol>
          <MDBCol md={3} size={6} className="mb-1 mb-md-3">
            <select
              className={`form-control ${theme.bg} ${theme.text}`}
              name="barangay"
              required
            >
              <option value="" />
              {baryo.map((item, index) => (
                <option key={`brgy-${index}`} value={item.brgy_code}>
                  {item.brgy_name}
                </option>
              ))}
            </select>
          </MDBCol>
        </MDBRow>
      </MDBCol>
      <MDBCol size={12}>
        <MDBTextArea
          label="Street (Optional)"
          name="street"
          contrast={theme.dark}
        />
      </MDBCol>
    </MDBRow>
  );
}
