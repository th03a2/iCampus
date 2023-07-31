import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBTabsContent,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBCard,
  MDBIcon,
  MDBCardBody,
  MDBContainer,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import Basic from "./components/basic";
import Parents from "./components/parents";
import Guardian from "./components/guardian";
import Siblings from "./components/siblings";
import Credentials from "./components/credentials";
import Personnel from "./components/personnel";
import { toast } from "react-toastify";
import { SAVE } from "../../../../../redux/slices/query";
import { UPLOAD } from "../../../../../redux/slices/assets/persons/auth";
export default function Modal({
  visibility,
  setVisibility,
  schoolInformation,
}) {
  const { theme, token, auth } = useSelector(({ auth }) => auth);

  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState("basic"),
    [nso, setNso] = useState(null),
    [sf10, setSf10] = useState(null),
    [goodmoral, setGoodMoral] = useState(null),
    [nsoImage, setNsoImage] = useState(null),
    [sf10Image, setSf10Image] = useState(null),
    [goodmoralImage, setGoodmoralImage] = useState(null),
    [form, setForm] = useState({
      phone: "",
      attachments: {
        sf10: "",
        goodmoral: "",
        nso: "",
      },
    }),
    [schoolInfo, setSchoolInfo] = useState({
      levelId: 0,
      units: "",
      specifications: "",
    });

  const [numberOfSiblings, setNumberOfSiblings] = useState(0);
  const [siblingsData, setSiblingsData] = useState([]);
  const [levels, setLevels] = useState([]);
  const [category, setCategory] = useState("");

  const handleInputChange = (index, property, value) => {
    setSiblingsData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = { ...updatedData[index], [property]: value };
      return updatedData;
    });
  };

  const handleNumberOfSiblingsChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setNumberOfSiblings(count || 0);
    setSiblingsData(new Array(count).fill({}));
  };

  const convertNsoToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
        setNsoImage(reader.result.split(",")[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  const convertSf10ToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
        setSf10Image(reader.result.split(",")[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  const convertGoodmoralToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
        setGoodmoralImage(reader.result.split(",")[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  const handleNsoChange = async (event) => {
    const file = event.target.files[0];
    const base64Image = await convertNsoToBase64(file);
    setNso(base64Image);
  };
  const handleSf10Change = async (event) => {
    const file = event.target.files[0];
    const base64Image = await convertSf10ToBase64(file);
    setSf10(base64Image);
  };
  const handleGoodmoralChange = async (event) => {
    const file = event.target.files[0];
    const base64Image = await convertGoodmoralToBase64(file);
    setGoodMoral(base64Image);
  };
  const [link, setLink] = useState({
    basic: true,
    personnel: false,
    guardian: false,
    parents: false,
    siblings: false,
    credentials: false,
    success: false,
  });

  const [guardian, setGuardian] = useState({
    id: "",
    fullName: {
      fname: "",
      mname: "",
      lname: "",
      suffix: "",
    },
    isMale: true,
    mobile: "",
    dob: "",
    relationship: "",
  });
  console.log(guardian);

  const [parents, setParents] = useState({
    father: {
      fname: "",
      mname: "",
      lname: "",
      suffix: "",
      isMale: "",
      phone: "",
      street: "",
      brgy: "",
      occupation: "",
      muni: "",
      province: "",
    },
    mother: {
      fname: "",
      mname: "",
      lname: "",
      suffix: "",
      isMale: "",
      phone: "",
      street: "",
      brgy: "",
      occupation: "",
      muni: "",
      province: "",
    },
  });

  const tabs = [
    {
      title: "School",
      key: "basic",
    },
    {
      title: "Personnal",
      key: "personnel",
    },
    {
      title: "Guardian",
      key: "guardian",
    },
    {
      title: "Parents",
      key: "parents",
    },
    {
      title: "Siblings",
      key: "siblings",
    },
    {
      title: "Credentials",
      key: "credentials",
    },
  ];

  useEffect(() => {
    if (link.success) {
      const credentials = {
        nso: nsoImage,
        goodmoral: goodmoralImage,
        sf10: sf10Image,
      };
      Object.entries(credentials).map(([key, value]) => {
        if (value) {
          dispatch(
            UPLOAD({
              data: {
                path: `enrollment/credentials/${auth.email}`,
                base64: value,
                name: `${key}.png`,
              },
            })
          );
          return true;
        }
      });
      const attachments = {
        nso: nsoImage ? "nso" : "",
        sf10: sf10Image ? "sf10" : "",
        goodmoral: goodmoralImage ? "goodmoral" : "",
      };

      dispatch(
        SAVE({
          entity: "assets/enrollment",
          data: {
            enrollee: {
              ...form,
              batch: schoolInformation._id,
              student: auth._id,
              attachments,
              categorization: schoolInfo.units,
              levelId: schoolInfo.levelId,
              specifications: schoolInfo.specifications,
              status: "pending",
            },
            guardians: guardian,
          },
          token,
        })
      );
    }
  }, [
    link,
    parents.mother,
    parents.father,
    guardian,
    dispatch,
    auth._id,
    auth.fullName,
    form,
    goodmoralImage,
    nsoImage,
    schoolInformation,
    sf10Image,
    siblingsData,
    token,
  ]);

  const handleActiveContent = (activeItem) => {
    switch (activeItem) {
      case "guardian":
        return (
          <Guardian
            guardian={guardian}
            setGuardian={setGuardian}
            setActiveItem={setActiveItem}
            link={link}
            setLink={setLink}
          />
        );

      case "parents":
        return (
          <Parents
            setParents={setParents}
            parents={parents}
            setActiveItem={setActiveItem}
            link={link}
            setLink={setLink}
          />
        );

      case "siblings":
        return (
          <Siblings
            setForm={setForm}
            handleInputChange={handleInputChange}
            setActiveItem={setActiveItem}
            link={link}
            setLink={setLink}
            handleNumberOfSiblingsChange={handleNumberOfSiblingsChange}
            numberOfSiblings={numberOfSiblings}
            siblingsData={siblingsData}
          />
        );

      case "credentials":
        return (
          <Credentials
            setForm={setForm}
            handleNsoChange={handleNsoChange}
            form={form}
            setActiveItem={setActiveItem}
            link={link}
            setLink={setLink}
            nso={nso}
            handleSf10Change={handleSf10Change}
            handleGoodmoralChange={handleGoodmoralChange}
            goodmoral={goodmoral}
            sf10={sf10}
          />
        );

      case "personnel":
        return (
          <Personnel
            setForm={setForm}
            form={form}
            setActiveItem={setActiveItem}
            link={link}
            setLink={setLink}
          />
        );

      default:
        return (
          <Basic
            levels={levels}
            setLevels={setLevels}
            schoolInfo={schoolInfo}
            setSchoolInfo={setSchoolInfo}
            setActiveItem={setActiveItem}
            link={link}
            setLink={setLink}
            setCategory={setCategory}
            category={category}
          />
        );
    }
  };
  const handleClose = () => {
    setVisibility(false);
  };

  return (
    <MDBModal show={visibility} setShow={setVisibility} staticBackdrop>
      <MDBModalDialog size="fullscreen">
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>
              <MDBIcon
                fas
                icon="info-circle"
                style={{ width: "30px" }}
                color="warning"
              />
              <strong>Information</strong>
            </MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={handleClose} />
          </MDBModalHeader>
          <MDBModalBody className={`${theme.bg} ${theme.text} gui-viewer `}>
            {/* <MDBCard className="h-100">
              <MDBCardBody> */}
            <MDBContainer className="shadow-4">
              <MDBTabs justify fill>
                {tabs.map((tab, index) => (
                  <MDBTabsItem key={`registration-${index}`}>
                    <MDBTabsLink
                      onClick={() => {
                        if (link[tab.key]) {
                          setActiveItem(tab.key);
                        } else {
                          toast.warn("Complete the previous tab first.");
                        }
                      }}
                      active={activeItem === tab.key}
                    >
                      {tab.title}
                    </MDBTabsLink>
                  </MDBTabsItem>
                ))}
              </MDBTabs>
              <MDBTabsContent activeItem={activeItem}>
                {handleActiveContent(activeItem)}
              </MDBTabsContent>
            </MDBContainer>
            {/* </MDBCardBody>
            </MDBCard> */}
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
