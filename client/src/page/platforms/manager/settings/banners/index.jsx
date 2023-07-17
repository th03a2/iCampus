import React, { useState, useCallback, useEffect } from "react";
import BreadCrumb from "../../../../../components/breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { MDBContainer, MDBBtn } from "mdb-react-ui-kit";
import Cropper from "react-easy-crop";
import getCroppedImg from "./crop";
import { ENDPOINT } from "../../../../../components/utilities";
import BannerModal from "./modal";
import { UPLOAD } from "../../../../../redux/slices/assets/persons/auth";

const path = [
  {
    path: "Banners",
  },
];

const Banners = () => {
  const { onDuty, token } = useSelector(({ auth }) => auth),
    [crop, setCrop] = useState({ x: 0, y: 0 }),
    [rotation, setRotation] = useState(0),
    [zoom, setZoom] = useState(1),
    [croppedAreaPixels, setCroppedAreaPixels] = useState(null),
    [croppedImage, setCroppedImage] = useState(null),
    [visibility, setVisibility] = useState(false),
    [bannerUrl, setBannerUrl] = useState(null),
    [hasBanner, setHasBanner] = useState(false),
    dispatch = useDispatch();

  useEffect(() => {
    setBannerUrl(
      `${ENDPOINT}/public/credentials/${onDuty.company}/${onDuty.name}/banner.jpg`
    );
    var image = new Image();
    var url_image = `${ENDPOINT}/public/credentials/${onDuty.company}/${onDuty.name}/banner.jpg`;
    image.src = url_image;
    if (image.width == 0) {
      setHasBanner(true);
    } else {
      setHasBanner(false);
    }
  }, [onDuty]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        bannerUrl,
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

  const handleUpload = e => {
    const image = e.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      dispatch(
        UPLOAD({
          data: {
            path: `credentials/${onDuty.company}/${onDuty.name}`,
            base64: reader.result.split(",")[1],
            name: `banner.jpg`,
          },
          token,
        })
      );
    };
    reader.readAsDataURL(image);
  };

  // const onClose = useCallback(() => {
  //   setCroppedImage(null);
  // }, []);

  return (
    <>
      <BreadCrumb
        title="Banner"
        paths={path}
        visibility={visibility}
        setVisibility={setVisibility}
      />
      <MDBContainer className="py-5 mt-4">
        <MDBBtn
          onClick={() => document.getElementById("bannerInput").click()}
          variant="contained"
          color="primary"
        >
          Upload Banner
        </MDBBtn>

        <input
          type="file"
          onChange={handleUpload}
          id="bannerInput"
          className="d-none"
        />
        <div className="card" style={{ height: "45vh" }}>
          <div className="card-body">
            {hasBanner ? (
              <Cropper
                image={bannerUrl}
                crop={crop}
                zoom={zoom}
                aspect={4.49}
                onCropChange={setCrop}
                onRotationChange={setRotation}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            ) : (
              <center>
                {/* <img src={bannerUrl} width={817} height={182} alt="Banner" /> */}
                <img src={bannerUrl} width="100%" alt="Banner" />
              </center>
            )}
          </div>
          <div className="card-footer">
            <center>
              <MDBBtn
                onClick={showCroppedImage}
                variant="contained"
                color="primary"
              >
                Crop Image
              </MDBBtn>
            </center>
          </div>
        </div>
      </MDBContainer>
      <BannerModal
        visibility={visibility}
        setVisibility={setVisibility}
        croppedImage={croppedImage}
        uploadBanner={uploadBanner}
      />
    </>
  );
};

export default Banners;
