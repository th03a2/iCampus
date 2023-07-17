import React, { useState, useCallback, useEffect } from "react";
import BreadCrumb from "../../../../../components/breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { MDBContainer, MDBBtn } from "mdb-react-ui-kit";
import axios from "axios";
import Cropper from "react-easy-crop";
import getCroppedImg from "./crop";
import { ENDPOINT } from "../../../../../components/utilities";
import LogosModal from "./modal/";
import { UPLOAD } from "../../../../../redux/slices/assets/persons/auth";

const path = [
  {
    path: "Branch Logo",
  },
];

const Banners = () => {
  const { auth, onDuty, token } = useSelector(({ auth }) => auth),
    [crop, setCrop] = useState({ x: 0, y: 0 }),
    [rotation, setRotation] = useState(0),
    [zoom, setZoom] = useState(1),
    [croppedAreaPixels, setCroppedAreaPixels] = useState(null),
    [croppedImage, setCroppedImage] = useState(null),
    [visibility, setVisibility] = useState(false),
    [logoURL, setlogoURL] = useState(null),
    [hasBanner, setHasBanner] = useState(false),
    dispatch = useDispatch();

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  useEffect(() => {
    if (onDuty._id) {
      const url_image = `${ENDPOINT}/public/credentials/${onDuty.company}/${onDuty.name}/logo.jpg`;
      var image = new Image();
      image.src = url_image;
      setHasBanner(image.width == 0 ? true : false);
      setlogoURL(url_image);
    }
  }, [onDuty]);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        logoURL,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
    setVisibility(true);
  }, [croppedAreaPixels, rotation]);

  const uploadBanner = () => {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = croppedImage;
    a.download = "testdownload.jpg";
    a.click();
  };

  const handleUpload = (e) => {
    const image = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      dispatch(
        UPLOAD({
          data: {
            path: `credentials/${onDuty.company}/${onDuty.name}`,
            base64: reader.result.split(",")[1],
            name: `logo.jpg`,
          },
          token,
        })
      );
    };
    reader.readAsDataURL(image);
  };

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  return (
    <>
      <BreadCrumb
        title="Branch Logo"
        paths={path}
        visibility={visibility}
        setVisibility={setVisibility}
      />
      <MDBContainer className="py-5 mt-4">
        {hasBanner ? (
          <>
            <Cropper
              image={logoURL}
              crop={crop}
              zoom={zoom}
              cropShape="round"
              aspect={4 / 4}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
            <MDBBtn
              onClick={() => document.getElementById("bannerInput").click()}
              variant="contained"
              color="primary"
            >
              Upload Banner
            </MDBBtn>
            <MDBBtn
              onClick={showCroppedImage}
              variant="contained"
              color="primary"
            >
              Show Result
            </MDBBtn>
            <input
              type="file"
              onChange={handleUpload}
              id="bannerInput"
              className="d-none"
            />
          </>
        ) : (
          <center>
            <img src={logoURL} width={817} height={182} alt="Logo" />
          </center>
        )}
      </MDBContainer>
      <LogosModal
        visibility={visibility}
        setVisibility={setVisibility}
        croppedImage={croppedImage}
        uploadBanner={uploadBanner}
      />
    </>
  );
};

export default Banners;
