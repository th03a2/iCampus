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
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import Basic from "./components/basic";
import Parents from "./components/parents";
import Guardian from "./components/guardian";
import Siblings from "./components/siblings";
import Credentials from "./components/credentials";
import { toast } from "react-toastify";
import { SAVE } from "../../../../../redux/slices/query";
import { UPLOAD } from "../../../../../redux/slices/assets/persons/auth";
export default function Modal({ visibility, setVisibility, schoolId }) {
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
      units: "",
      level: "",
      phone: "",
      attachments: {
        sf10: "",
        goodmoral: "",
        nso: "",
      },
    });

  const [numberOfSiblings, setNumberOfSiblings] = useState(0);
  const [siblingsData, setSiblingsData] = useState([]);

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
    guardian: false,
    parents: false,
    siblings: false,
    credentials: false,
    success: false,
  });

  const [guardian, setGuardian] = useState({
    studentId: auth._id,
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
    relationShip: "",
  });

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
      title: "Informations",
      key: "basic",
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
              batch: schoolId,
              student: auth._id,
              attachments,
              status: "pending",
            },
            guardians:
              siblingsData.length > 0
                ? [
                    { ...guardian, studentId: auth._id },
                    { ...parents.father, studentId: auth._id },
                    { ...parents.mother, studentId: auth._id },
                    ...siblingsData.map((sibling) => ({
                      ...sibling,
                      studentId: auth._id,
                    })),
                  ]
                : [
                    { ...guardian, studentId: auth._id },
                    { ...parents.father, studentId: auth._id },
                    { ...parents.mother, studentId: auth._id },
                  ],
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
    schoolId,
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

      default:
        return (
          <Basic
            setForm={setForm}
            form={form}
            setActiveItem={setActiveItem}
            link={link}
            setLink={setLink}
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
                icon="user-graduate"
                style={{ width: "20px" }}
                color="warning"
              />
              Enrollment
            </MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={handleClose} />
          </MDBModalHeader>
          <MDBModalBody className={`${theme.bg} ${theme.text} gui-viewer`}>
            <MDBCard className="h-100">
              <MDBCardBody>
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
              </MDBCardBody>
            </MDBCard>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
