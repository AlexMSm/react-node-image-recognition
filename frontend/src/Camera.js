import React, { useCallback } from "react";
import Webcam from "react-webcam";

export default function Camera({ imgSrc, setImgSrc, setFileObj }) {
  const webcamRef = React.useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(() => {
      setImgSrc(imageSrc);
      console.log(imageSrc);
    });
    let file = dataURLtoFile(imageSrc, "camImage.jpeg");
    console.log(file);
    setFileObj(() => setFileObj(file));
  }, [webcamRef, setImgSrc]);

  const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        download="test-cam-image.jpeg"
      />
      <button onClick={capture}>Capture photo</button>
      {imgSrc && <img src={imgSrc} />}
    </>
  );
}

//ReactDOM.render(<WebcamCapture />, document.getElementById("root"));
