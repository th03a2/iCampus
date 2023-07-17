import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBSwitch,
  MDBTextArea,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RESET, UPDATE } from "../../../redux/slices/assets/persons/auth";
import { Philippines } from "../../../fakeDb";

export default function BasicForm({ visibility, setVisibility }) {
  const { theme, token, isSuccess, auth } = useSelector(({ auth }) => auth),
    [patron, setPatron] = useState({
      fullName: {
        fname: "",
        mname: "",
        lname: "",
      },
      isMale: false,
      address: {
        region: "",
        province: "",
        city: "",
        barangay: "",
        street: "",
      },
      bio: "",
    }),
    [provinces, setProvinces] = useState([]),
    [cities, setCities] = useState([]),
    [brgys, setBrgys] = useState([]),
    dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      setVisibility(false);
      dispatch(RESET());
    }
  }, [isSuccess]);

  useEffect(() => {
    if (auth._id) {
      setPatron(auth);
      if (auth.address) {
        const { region, province, city } = auth.address;
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
            Philippines.barangays.filter(
              (brgy) => brgy.mun_code === Number(code)
            )
          );
        }
      }
    }
  }, [auth]);
  const toggleShow = () => setVisibility(!visibility);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (JSON.stringify(auth) !== JSON.stringify(patron)) {
      dispatch(UPDATE({ patron: { form: patron }, id: patron._id, token }));
      setVisibility(!visibility);
    } else {
      toast.warn("No changes found!");
    }
  };

  const handleChange = (e) => {
    const { name, value, dataset } = e.target;
    const { subname } = dataset;
    var _patron = { ...patron[name] };

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
    console.log(_patron);
    setPatron({
      ...patron,
      [name]: _patron,
    });
  };

  return (
    <MDBModal
      show={visibility}
      staticBackdrop
      setShow={setVisibility}
      tabIndex="-1"
    >
      <MDBModalDialog size="lg">
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>Update Basic Information</MDBModalTitle>
          </MDBModalHeader>
          <form onSubmit={handleSubmit}>
            <MDBModalBody>
              <MDBRow>
                <MDBCol size={4}>
                  <MDBInput
                    name="fullName"
                    data-subname="fname"
                    label="First name"
                    value={patron.fullName?.fname}
                    onChange={handleChange}
                    contrast={theme.dark}
                    required
                  />
                </MDBCol>
                <MDBCol size={4}>
                  <MDBInput
                    name="fullName"
                    data-subname="mname"
                    label="Middle name"
                    value={patron.fullName?.mname}
                    onChange={handleChange}
                    contrast={theme.dark}
                  />
                </MDBCol>
                <MDBCol size={4}>
                  <MDBInput
                    name="fullName"
                    data-subname="lname"
                    label="Last name"
                    value={patron.fullName?.lname}
                    onChange={handleChange}
                    contrast={theme.dark}
                    required
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="my-3">
                <MDBCol size={9}>
                  <MDBInput
                    name="fullName"
                    data-subname="suffix"
                    label="Suffix / Name Extension"
                    value={patron.fullName?.suffix}
                    onChange={handleChange}
                    contrast={theme.dark}
                  />
                </MDBCol>
                <MDBCol size={3} className="d-flex align-items-center">
                  <MDBSwitch
                    name="isMale"
                    onChange={() =>
                      setPatron({
                        ...patron,
                        isMale: !patron.isMale,
                      })
                    }
                    id="isMale"
                    label={patron.isMale ? "Male" : "Female"}
                    checked={patron.isMale}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol size={6}>
                  <select
                    name="address"
                    data-subname="region"
                    value={patron.address?.region}
                    className={`patron-control ${theme.bg} ${theme.text}`}
                    onChange={handleChange}
                  >
                    <option>Region</option>
                    {Philippines.regions?.map(({ code, name }) => (
                      <option key={`region-${code}`} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </MDBCol>
                <MDBCol size={6} className="px-5">
                  <select
                    name="address"
                    data-subname="province"
                    value={patron.address?.province}
                    className={`patron-control ${theme.bg} ${theme.text}`}
                    onChange={handleChange}
                  >
                    <option>Province</option>
                    {provinces.map(({ code, name }) => (
                      <option key={`province-${code}`} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </MDBCol>
              </MDBRow>
              <MDBRow className="my-3">
                <MDBCol size={6}>
                  <select
                    name="address"
                    data-subname="city"
                    value={patron.address?.city}
                    className={`patron-control ${theme.bg} ${theme.text}`}
                    onChange={handleChange}
                  >
                    <option>City</option>
                    {cities?.map(({ name, code }) => (
                      <option key={`cities-${code}`} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </MDBCol>
                <MDBCol size={6}>
                  <select
                    name="address"
                    data-subname="barangay"
                    value={patron.address?.barangay}
                    className={`patron-control ${theme.bg} ${theme.text}`}
                    onChange={handleChange}
                  >
                    <option>Barangay</option>
                    {brgys?.map(({ name }, index) => (
                      <option key={`barangay-${index}`} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol size={12} className="mb-2">
                  <MDBInput
                    name="address"
                    data-subname="street"
                    label="Street"
                    value={patron.address?.street}
                    onChange={handleChange}
                    contrast={theme.dark}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol size={12}>
                  <MDBTextArea
                    name="bio"
                    rows={3}
                    value={patron.bio}
                    onChange={handleChange}
                    label="Biography"
                    contrast={theme.dark}
                  />
                </MDBCol>
              </MDBRow>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn
                type="button"
                color={theme.color}
                className="shadow-0"
                onClick={toggleShow}
              >
                Close
              </MDBBtn>
              <MDBBtn color="success">Save changes</MDBBtn>
            </MDBModalFooter>
          </form>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
