import React, { useState, useEffect } from "react";
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBInputGroup,
  MDBTextArea,
} from "mdb-react-ui-kit";
import { validateContactNumber } from "../../../../../components/utilities";
import { Philippines } from "../../../../../fakeDb";

import { useSelector } from "react-redux";

export default function ModalForm() {
  const { theme } = useSelector(({ auth }) => auth),
    [rehiyon, setRehiyon] = useState([]),
    [probinsya, setProbinsya] = useState([]),
    [syudad, setSyudad] = useState([]),
    [baryo, setBaryo] = useState([]);

  const setRegion = regionCode =>
    setProbinsya(Philippines.getProvincesByRegion(regionCode));

  const setProvince = provinceCode =>
    setSyudad(Philippines.getCitiesByProvince(provinceCode));

  const setCity = cityCode => setBaryo(Philippines.getBarangayByMun(cityCode));

  useEffect(() => {
    setRehiyon(Philippines.regions);
  }, []);
  return (
    <MDBRow>
      <MDBCol md={12}>
        <MDBInput
          type="text"
          label="Name"
          name="name"
          contrast={theme.dark}
          required
        />
      </MDBCol>
      <MDBCol size={6} className="mt-3">
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
      <MDBCol size={6} className="mt-3">
        <MDBInput
          type="email"
          label="E-mail Address"
          name="email"
          contrast={theme.dark}
          required
        />
      </MDBCol>
      <MDBCol size={12} className="mt-3">
        <h6 className="text-start mb-0">Complete Address</h6>
        <MDBRow>
          <MDBCol md={3} size={6} className="mb-1 mb-md-3">
            <select
              className={`form-control ${theme.bg} ${theme.text}`}
              name="region"
              onChange={e => setRegion(e.target.value)}
              required
            >
              <option value="" />
              {rehiyon.map((item, index) => (
                <option key={`region-${index}`} value={item.reg_code}>
                  {item.name}
                </option>
              ))}
            </select>
          </MDBCol>
          <MDBCol md={3} size={6} className="mb-1 mb-md-3">
            <select
              className={`form-control ${theme.bg} ${theme.text}`}
              name="province"
              onChange={e => setProvince(e.target.value)}
              required
            >
              <option value="" />
              {probinsya?.map((item, index) => (
                <option key={`province-${index}`} value={item.prov_code}>
                  {item.name}
                </option>
              ))}
            </select>
          </MDBCol>
          <MDBCol md={3} size={6} className="mb-1 mb-md-3">
            <select
              className={`form-control ${theme.bg} ${theme.text}`}
              name="city"
              onChange={e => setCity(e.target.value)}
              required
            >
              <option value="" />
              {syudad?.map((item, index) => (
                <option key={`city-${index}`} value={item.mun_code}>
                  {item.name}
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
              {baryo?.map((item, index) => (
                <option key={`brgy-${index}`} value={item.code}>
                  {item.name}
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
      <MDBCol size={12} className="mt-3">
        <h6 className="text-start mb-0">Other Information (Optional)</h6>
        <MDBRow>
          <MDBCol size={12}>
            <MDBInput
              type="text"
              label="Taxpayer Identification Number"
              name="tin"
              contrast={theme.dark}
            />
          </MDBCol>
          <MDBCol size={6} className="my-3">
            <MDBInput
              type="number"
              label="Quota"
              name="quota"
              min={5000}
              onChange={e => {
                if (Number(e.target.value) < 5000) {
                  e.target.value = 5000;
                }
              }}
              contrast={theme.dark}
            />
          </MDBCol>
          <MDBCol md={6} className="my-3">
            <MDBInputGroup
              textBefore={<span className={theme.text}>Classification</span>}
            >
              <select
                className={`form-control ${theme.bg} ${theme.text}`}
                name="classification"
                required
                defaultValue="primary"
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="tertiary">Tertiary</option>
              </select>
            </MDBInputGroup>
          </MDBCol>
        </MDBRow>
      </MDBCol>
    </MDBRow>
  );
}
