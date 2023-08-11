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
  MDBIcon,
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
import { nameFormatter } from "../../../../../components/utilities";
export default function Modal({
  visibility,
  setVisibility,
  schoolInformation,
}) {
  const { theme, token, auth, onDuty } = useSelector(({ auth }) => auth);

  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState("basic"),
    [nso, setNso] = useState(null),
    [sf10B, setSf10B] = useState(null),
    [goodmoral, setGoodMoral] = useState(null),
    [sf10A, setSf10A] = useState(null),
    [profileImage, setProfileImage] = useState(null),
    [profile, setProfile] = useState(null),
    [nsoImage, setNsoImage] = useState(null),
    [sf10AImage, setSf10AImage] = useState(null),
    [sf10BImage, setSf10BImage] = useState(null),
    [goodmoralImage, setGoodmoralImage] = useState(null),
    [form, setForm] = useState({
      mobile: "",
      attachments: {
        sf10A: "",
        sf10B: "",
        goodmoral: "",
        nso: "",
        profile: "",
      },
    }),
    [schoolInfo, setSchoolInfo] = useState({
      levelId: 0,
      units: "",
      specifications: "",
    });
  const [yourSiblings, setYourSiblings] = useState([]);
  const [changeNumber, setChangeNumber] = useState(false);
  const [changeAddress, setChangeAddress] = useState(false);
  const [levels, setLevels] = useState([]);
  const [category, setCategory] = useState("");
  const [hasGuardian, setHasGuardian] = useState(false);
  const [noSubmitted, setNoSubmitted] = useState(true);
  const [fatherSubmitted, setFatherSubmitted] = useState(false);

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
  const convertSf10AToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
        setSf10AImage(reader.result.split(",")[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  const convertSf10BToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
        setSf10BImage(reader.result.split(",")[1]);
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
  const handleSf10AChange = async (event) => {
    const file = event.target.files[0];
    const base64Image = await convertSf10AToBase64(file);
    setSf10A(base64Image);
  };
  const handleSf10BChange = async (event) => {
    const file = event.target.files[0];
    const base64Image = await convertSf10BToBase64(file);
    setSf10B(base64Image);
  };

  const convertProfileBToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
        setProfileImage(reader.result.split(",")[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleProfileChange = async (event) => {
    const file = event.target.files[0];
    const base64Image = await convertProfileBToBase64(file);
    setProfile(base64Image);
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
    address: {
      barangay: "",
      city: "",
      province: "",
      region: "",
    },
    isMale: true,
    mobile: "",
    dob: "",
    relationship: "",
  });

  const [parents, setParents] = useState({
    father: {
      id: "1",
      fullName: {
        fname: "",
        mname: "",
        lname: "",
        suffix: "",
      },
      address: {
        region: "",
        province: "",
        city: "",
        barangay: "",
      },
      mobile: "",
    },
    mother: {},
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
    if (auth.yourSiblings.length > 0) {
      setYourSiblings(auth.yourSiblings);
    } else {
      setYourSiblings([]);
    }
  }, [auth.yourSiblings]);

  useEffect(() => {
    const hasNoAttributes = Object.keys(auth.guardian).length === 0;
    if (hasNoAttributes) {
      setHasGuardian(false);
    } else {
      setHasGuardian(true);
      setGuardian((prevGuardian) => ({
        ...prevGuardian,
        ...auth.yourGuardian,
      }));
    }
  }, [auth.guardian, auth.yourGuardian, setGuardian, setHasGuardian]);

  let hasFather = Object.keys(auth.parents?.father).length > 0;

  useEffect(() => {
    if (hasFather) {
      setParents(auth.parents);
    } else {
      setParents((prevParents) => ({
        ...prevParents,
        mother: auth.parents?.mother,
      }));
    }
  }, [auth.parents, hasFather]);

  useEffect(() => {
    if (link.success) {
      const credentials = {
        nso: nsoImage,
        goodmoral: goodmoralImage,
        sf10A: sf10AImage,
        sf10B: sf10BImage,
        profile: profileImage,
      };
      Object.entries(credentials).map(([key, value]) => {
        if (value) {
          dispatch(
            UPLOAD({
              data: {
                path: `enrollment/batch/${onDuty._id}/${auth.email}`,
                base64: value,
                name: `${key}.png`,
              },
            })
          );
        }
        return null;
      });

      const attachments = {
        // para malaman kung anong credentials ba ang kaniyang inupload
        nso: nsoImage ? "nso" : "",
        sf10A: sf10AImage ? "sf10A" : "",
        sf10B: sf10BImage ? "sf10B" : "",
        goodmoral: goodmoralImage ? "goodmoral" : "",
        profile: profileImage ? "profile" : "",
      };

      const createSiblings = yourSiblings.map((data) => {
        // para makuha lahat ng mga inadd niya na siblings na hindi naka registered
        if (data._id === undefined) {
          return data;
        }
      });

      const oldSiblings = yourSiblings // para malaman kung nag delete ba siya sa mga existing niya na siblings
        .map((siblings) => siblings._id)
        .filter((id) => auth.siblings.includes(id));

      const newSiblings = yourSiblings // para makuha yung mniya na ga inadd sibling na naka registered na
        .map((sibling) => sibling._id)
        .filter((siblingId) => !auth.siblings.includes(siblingId));

      const currentFullname = { ...auth.yourGuardian?.fullName };
      const transferFullname = { ...guardian.fullName };

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
            guardians: {
              information: guardian,
              // para malaman kung nag palit ba siya nang guardian
              hasChange:
                nameFormatter(currentFullname) ===
                nameFormatter(transferFullname)
                  ? false
                  : true,
            },
            currentSiblings: [...oldSiblings, ...newSiblings],
            createSiblings,
            father: {
              isCreate: hasFather ? false : true, // para malaman kung nag palit ba siya ng father
              information: { ...parents.father },
            },
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
    sf10AImage,
    sf10BImage,
    token,
    auth.email,
    auth.siblings,
    auth.yourGuardian?.fullName,
    hasFather,
    onDuty._id,
    profileImage,
    schoolInfo.levelId,
    schoolInfo.specifications,
    schoolInfo.units,
    yourSiblings,
  ]);

  const handleActiveContent = (activeItem) => {
    switch (activeItem) {
      case "guardian":
        return (
          <Guardian
            guardian={guardian}
            setGuardian={setGuardian}
            setActiveItem={setActiveItem}
            hasFather={hasFather}
            parents={parents}
            link={link}
            setLink={setLink}
            hasGuardian={hasGuardian}
            noSubmitted={noSubmitted}
            setNoSubmitted={setNoSubmitted}
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
            hasFather={hasFather}
            fatherSubmitted={fatherSubmitted}
            setFatherSubmitted={setFatherSubmitted}
          />
        );

      case "siblings":
        return (
          <Siblings
            setForm={setForm}
            setActiveItem={setActiveItem}
            link={link}
            setLink={setLink}
            yourSiblings={yourSiblings}
            setYourSiblings={setYourSiblings}
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
            handleSf10AChange={handleSf10AChange}
            handleSf10BChange={handleSf10BChange}
            handleGoodmoralChange={handleGoodmoralChange}
            handleProfileChange={handleProfileChange}
            goodmoral={goodmoral}
            sf10A={sf10A}
            sf10B={sf10B}
            profile={profile}
            nsoImage={nsoImage}
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
            changeNumber={changeNumber}
            setChangeNumber={setChangeNumber}
            changeAddress={setChangeAddress}
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
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
