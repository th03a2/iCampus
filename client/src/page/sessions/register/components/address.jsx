import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBInputGroup,
  MDBRow,
  MDBTextArea,
} from "mdb-react-ui-kit";
import { Philippines } from "../../../../fakeDb";
import { useSelector } from "react-redux";

export default function Address({ setActiveItem, setForm, form }) {
  const { theme } = useSelector(({ auth }) => auth);
  const [address, setAddress] = useState([]),
    [provinces, setProvinces] = useState([]),
    [cities, setCities] = useState([]),
    [brgys, setBrgys] = useState([]);

  useEffect(() => {
    if (form.address) {
      const { region, province, city } = form.address;
      if (region) {
        const { code } = Philippines.regions.find(
          ({ name }) => name === region
        );
        setProvinces(
          Philippines.provinces.filter(
            (province) => province.reg_code === Number(code)
          )
        );
      }
      if (province) {
        const { code } = Philippines.provinces.find(
          ({ name }) => name === province
        );
        setCities(
          Philippines.cities.filter((city) => city.prov_code === Number(code))
        );
      }

      if (city) {
        const { code } = Philippines.cities.find(({ name }) => name === city);
        setBrgys(
          Philippines.barangays.filter((brgy) => brgy.mun_code === Number(code))
        );
      }
    }
  }, [address]);

  const handleAddress = (e) => {
    const { name, value, dataset } = e.target;
    const { subname } = dataset;
    var _patron = { ...form[name] };
    if (name === "fullName") {
      _patron[subname] = value;
    } else if (name === "address") {
      if (subname === "region") {
        const { code } = Philippines.regions.find(({ name }) => name === value);
        setProvinces(
          Philippines.provinces.filter(
            (province) => province.reg_code === Number(code)
          )
        );
      } else if (subname === "province") {
        const { code } = Philippines.provinces.find(
          ({ name }) => name === value
        );
        setCities(
          Philippines.cities.filter((city) => city.prov_code === Number(code))
        );
      } else if (subname === "city") {
        const { code } = Philippines.cities.find(({ name }) => name === value);
        setBrgys(
          Philippines.barangays.filter((brgy) => brgy.mun_code === Number(code))
        );
      }
      _patron[subname] = value;
    } else {
      _patron = value;
    }
    setForm((prev) => ({ ...prev, [name]: _patron }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tabs = { ...form.tabs };

    tabs.credentials = true;

    setForm({
      ...form,
      tabs,
    });
    setActiveItem("credentials");
  };
  console.log(form);

  return (
    <MDBContainer className="mt-4">
      <form onSubmit={handleSubmit}>
        <MDBRow className="mt-4">
          <MDBCol md={6}>
            <MDBInputGroup textBefore="region">
              <select
                name="address"
                data-subname="region"
                value={form.address.region}
                className={`form-control ${theme.bg} ${theme.text}`}
                onChange={handleAddress}
                required
              >
                <option value={""}>Select Region</option>
                {Philippines.regions.map(({ code, name }) => (
                  <option key={`region-${code}`} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </MDBInputGroup>
          </MDBCol>
          <MDBCol md={6} size={6} className="mb-1 mb-md-3">
            <MDBInputGroup textBefore="Province">
              <select
                value={form.address.province}
                name="address"
                data-subname="province"
                className={`form-control ${theme.bg} ${theme.text}`}
                onChange={handleAddress}
                required
              >
                <option value={""} />
                {provinces.map(({ code, name }) => (
                  <option key={`province-${name}`} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </MDBInputGroup>
          </MDBCol>
        </MDBRow>
        <MDBRow className="mt-2">
          <MDBCol md={6} size={6} className="mb-1 mb-md-3">
            <MDBInputGroup textBefore="City">
              <select
                name="address"
                data-subname="city"
                value={form.address.city}
                className={`form-control ${theme.bg} ${theme.text}`}
                onChange={handleAddress}
                required
              >
                <option value={""} />
                {cities.map(({ code, name }) => (
                  <option key={`city-${code}`} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </MDBInputGroup>
          </MDBCol>
          <MDBCol md={6} size={6} className="mb-1 mb-md-3">
            <MDBInputGroup textBefore="Baranggay">
              <select
                name="address"
                data-subname="barangay"
                value={form.address?.barangay}
                className={`form-control ${theme.bg} ${theme.text}`}
                onChange={handleAddress}
                required
              >
                <option value={""} />
                {brgys.map(({ name }) => (
                  <option key={`brgy-${name}`} value={name.toUpperCase()}>
                    {name.toUpperCase()}
                  </option>
                ))}
              </select>
            </MDBInputGroup>
          </MDBCol>
        </MDBRow>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            position: "absolute",
            bottom: "23px",
            left: "10px",
            right: "25px",
          }}
        >
          <MDBBtn
            onClick={() => setActiveItem("parents")}
            type="button"
            color="light"
            className="shadow-0"
          >
            Previous
          </MDBBtn>
          <MDBBtn type="submit">Submit</MDBBtn>
        </div>
      </form>
    </MDBContainer>
  );
}
