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

export default function ModalForm({ search, isMale, setIsMale, model }) {
  const { theme, auth } = useSelector(({ auth }) => auth),
    [age, setAge] = useState(""),
    [dob, setDob] = useState(""),
    [phone, setPhone] = useState(),
    [gender, setGender] = useState(),
    [fullName, setFullName] = useState({
      fname: "",
      mname: "",
      lname: "",
      suffix: "",
    }),
    [address, setAddress] = useState([]),
    [provinces, setProvinces] = useState([]),
    [cities, setCities] = useState([]),
    [barangays, setBarangays] = useState([]);
  const handleName = e => {
    const { name, value } = e.target;
    setFullName({ ...fullName, [name]: value.toUpperCase() });
  };

  const handleAddress = e => {
    const { name, value } = e.target;
    switch (name) {
      case "region":
        setAddress({ ...address, region: value });
        const code = Philippines.regions.find(
          ({ name }) => name === value
        ).code;
        setProvinces(
          Philippines.provinces.filter(
            ({ reg_code }) => reg_code === Number(code)
          )
        );
        break;
      case "province":
        setAddress({ ...address, province: value });
        const province = Philippines.provinces.find(
          ({ name }) => name === value
        ).code;
        setCities(
          Philippines.cities.filter(
            ({ prov_code }) => prov_code === Number(province)
          )
        );
        break;
      default:
        setAddress({ ...address, city: value });
        const cities = Philippines.cities.find(
          ({ name }) => name === value
        ).code;
        setBarangays(
          Philippines.barangays.filter(
            ({ mun_code }) => mun_code === Number(cities)
          )
        );
    }
  };

  useEffect(() => {
    const attri = search.split(",");
    if (attri.length > 1) {
      setFullName({
        fname: attri[1].trim().toUpperCase(),
        lname: attri[0].trim().toUpperCase(),
      });
    } else {
      setFullName({
        fname: "",
        lname: search.toUpperCase(),
      });
    }
  }, [search]);
  useEffect(() => {
    if (model._id) {
      setFullName({
        fname: model.fullName.fname,
        mname: model.fullName.mname,
        lname: model.fullName.lname,
        suffix: model.fullName.suffix,
      });
      setPhone(model.mobile);
      setAge(getAge(model.dob));
      setDob(model.dob);
      setGender(model.isMale);
      setAddress(model.address);
    } else {
      auth?.address &&
        setAddress({
          region: auth?.address?.region,
          province: auth.address.province,
          city: auth.address.city,
        });
      if (auth.address?.region) {
        const code = Philippines.regions.find(
          ({ name }) => name === auth?.address?.region
        )?.code;
        setProvinces(
          Philippines.provinces.filter(
            ({ reg_code }) => reg_code === Number(code)
          )
        );
      }
      if (auth.address?.province) {
        const province = Philippines.provinces.find(
          ({ name }) => name === auth?.address?.province
        )?.code;
        setCities(
          Philippines.cities.filter(
            ({ prov_code }) => prov_code === Number(province)
          )
        );
      }
      if (auth.address?.city) {
        const city = Philippines.cities.find(
          ({ name }) => name === auth?.address?.city
        )?.code;

        setBarangays(
          Philippines.barangays.filter(({ mun_code }) => mun_code === city)
        );
      }
      setGender(model.isMale);
    }
  }, [model, auth]);
  return (
    <MDBRow>
      <MDBCol md={3}>
        <MDBInput
          name="fname"
          type="text"
          label="First name"
          onChange={e => handleName(e)}
          contrast={theme.dark}
          value={fullName.fname}
          required
        />
      </MDBCol>
      <MDBCol md={3}>
        <MDBInput
          name="mname"
          type="text"
          label="Middle name (Optional)"
          onChange={e => handleName(e)}
          value={fullName.mname}
          contrast={theme.dark}
        />
      </MDBCol>
      <MDBCol md={3}>
        <MDBInput
          name="lname"
          type="text"
          label="Last name"
          onChange={e => handleName(e)}
          value={fullName.lname}
          contrast={theme.dark}
          required
        />
      </MDBCol>
      <MDBCol md={3}>
        <MDBInputGroup textBefore={<span className={theme.text}>EXT</span>}>
          <select
            name="suffix"
            className={`form-control ${theme.bg} ${theme.text}`}
            onChange={e => handleName(e)}
            value={fullName.suffix}
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
          maxLength={11}
          onChange={e => setPhone(e.target.value)}
          value={phone}
          // onKeyDown={validateContactNumber}
        />
      </MDBCol>
      <MDBCol size={3} className="mt-3">
        <MDBInput
          name="dob"
          type="date"
          label={age ? `${age} years old` : "Birthday"}
          contrast={theme.dark}
          onChange={e => {
            setAge(getAge(e.target.value));
            setDob(e.target.value);
          }}
          value={dob}
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
          onChange={() => {
            setIsMale(!isMale);
            setGender(!isMale);
          }}
          id="isMale"
          name="isMale"
          label={
            model ? (gender ? "Male" : "Female") : isMale ? "Male" : "Female"
          }
        />
      </MDBCol>
      <MDBCol size={12} className="mt-3">
        <h6 className="text-start mb-0">Complete Address</h6>
        <MDBRow>
          <MDBCol md={3} size={6} className="mb-1 mb-md-3">
            <select
              name="region"
              value={address.region}
              className={`form-control ${theme.bg} ${theme.text}`}
              onChange={handleAddress}
              required
            >
              <option>Select Region</option>
              {Philippines.regions.map(({ code, name }) => (
                <option key={`region-${code}`} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </MDBCol>
          <MDBCol md={3} size={6} className="mb-1 mb-md-3">
            <select
              name="province"
              value={address.province}
              className={`form-control ${theme.bg} ${theme.text}`}
              onChange={handleAddress}
              required
            >
              <option />
              {provinces.map(({ code, name }) => (
                <option key={`province-${code}`} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </MDBCol>
          <MDBCol md={3} size={6} className="mb-1 mb-md-3">
            <select
              name="city"
              value={address.city}
              className={`form-control ${theme.bg} ${theme.text}`}
              onChange={handleAddress}
              required
            >
              <option />
              {cities.map(({ code, name }) => (
                <option key={`city-${code}`} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </MDBCol>
          <MDBCol md={3} size={6} className="mb-1 mb-md-3">
            <select
              name="barangay"
              value={address?.barangay}
              className={`form-control ${theme.bg} ${theme.text}`}
              required
            >
              <option />
              {barangays.map(({ name }) => (
                <option key={`brgy-${name}`} value={name.toUpperCase()}>
                  {name.toUpperCase()}
                </option>
              ))}
            </select>
          </MDBCol>
        </MDBRow>
      </MDBCol>
      <MDBCol size={12}>
        <MDBTextArea
          name="street"
          value={address?.street}
          label="Street (Optional)"
          contrast={theme.dark}
        />
      </MDBCol>
    </MDBRow>
  );
}
