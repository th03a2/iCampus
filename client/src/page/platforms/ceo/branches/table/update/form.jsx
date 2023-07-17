import React, { useState, useEffect } from "react";
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBInputGroup,
  MDBTextArea,
} from "mdb-react-ui-kit";
import { validateContactNumber } from "../../../../../../components/utilities";
import { Philippines } from "../../../../../../fakeDb";
import { useSelector } from "react-redux";

export default function ModalForm({ data }) {
  const { theme } = useSelector(({ auth }) => auth),
    [rehiyon, setRehiyon] = useState([]),
    [probinsya, setProbinsya] = useState([]),
    [syudad, setSyudad] = useState([]),
    [baryo, setBaryo] = useState([]),
    [regionCode, setRegionCode] = useState(""),
    [provinceCode, setProvinceCode] = useState(""),
    [cityCode, setCityCode] = useState(""),
    [brgyCode, setBrgyCode] = useState("");

  const setProvince = (code) => {
    setRegionCode(code);
    Philippines.getProvinceByCode(code).then(setProbinsya);
  };

  const setCity = (code) => {
    setProvinceCode(code);
    Philippines.getCityMunByProvince(code).then(setSyudad);
  };

  const setBarangay = (code) => {
    setCityCode(code);
    Philippines.getBarangayByMun(code).then(setBaryo);
  };

  useEffect(() => {
    Philippines.regions().then(setRehiyon);

    if (data.address) {
      Philippines.provinces(data.address.region).then((provs) => {
        setProbinsya(provs);
        Philippines.getCityMunByProvince(data.address.province).then((cits) => {
          setSyudad(cits);
          Philippines.getBarangayByMun(data.address.city).then(setBaryo);
        });
      });
    }
  }, [data]);

  return (
    <MDBRow>
      <MDBCol md={12}>
        <MDBInput
          type="text"
          label="Name"
          name="name"
          contrast={theme.dark}
          defaultValue={data.name}
          required
        />
      </MDBCol>
      <MDBCol size={6} className="mt-3">
        <MDBInput
          type="text"
          label="Contact Number (+63)"
          name="mobile"
          contrast={theme.dark}
          defaultValue={data.contacts?.mobile}
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
          defaultValue={data.contacts?.email}
          required
        />
      </MDBCol>
      <MDBCol size={12} className="mt-3">
        <h6 className="text-start mb-1">Complete Address</h6>
        <MDBRow>
          <MDBCol md={3} size={6} className="mb-1 mb-md-3">
            <select
              value={regionCode || data?.address?.region}
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
              value={provinceCode || data?.address?.province}
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
              value={cityCode || data?.address?.city}
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
              value={brgyCode || data?.address?.barangay}
              className={`form-control ${theme.bg} ${theme.text}`}
              name="barangay"
              required
              onChange={(e) => setBrgyCode(e.target.value)}
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
          defaultValue={data?.address?.street}
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
              defaultValue={data?.credentials?.tin}
            />
          </MDBCol>
          <MDBCol size={6} className="my-3">
            <MDBInput
              type="number"
              label="Quota"
              name="quota"
              min={5000}
              onChange={(e) => {
                if (Number(e.target.value) < 5000) {
                  e.target.value = 5000;
                }
              }}
              contrast={theme.dark}
              defaultValue={data?.credentials?.quota || ""}
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
                defaultValue={data?.credentials?.classification}
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
