import React, { useState } from "react";
import axios from "axios";
import Camera from "./Camera";

import {
  FormControl,
  Button,
  ButtonGroup,
  Form,
  Stack,
  ToggleButton,
} from "react-bootstrap";

const inputOptions = [
  {
    name: "Image URL",
    value: "imageURL",
  },
  {
    name: "Upload Image",
    value: "uploadImage",
  },
];

export default function InputImage(props) {
  const { setOutputs, setImageToPredict } = props;
  const [inputOption, setInputOption] = useState("imageURL");
  const [imageUrl, setImageUrl] = useState(
    "https://samples.clarifai.com/dog2.jpeg"
  );
  const [fileObj, setFileObj] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);

  const handleChangeImageUrl = (e) => {
    setImageUrl(e.target.value);
  };

  const predictImage = () => {
    console.log(imageUrl);
    setOutputs([]);
    setImageToPredict(imageUrl);
    axios
      .post("/predict", {
        imageUrl: imageUrl,
      })
      .then((res) => {
        setOutputs(res.data.results);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const predictImageViaUpload = () => {
    setOutputs([]);
    const formData = new FormData();
    formData.append("file", fileObj);
    const reader = new FileReader();
    console.log("fileobj", fileObj);
    reader.addEventListener("load", function () {
      setImageToPredict(reader.result);
    });

    if (fileObj) {
      reader.readAsDataURL(fileObj);
    }

    console.log(formData);

    axios
      .post("/predict/upload", formData)
      .then((res) => {
        setOutputs(res.data.results);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleFileFormControlOnChange = (e) => {
    console.log(e);
    if (e.target.files.length) {
      setFileObj(e.target.files[0]);
    }
  };

  navigator.getUserMedia(
    { audio: true, video: true },
    function (stream) {
      stream.getTracks().forEach((x) => x.stop());
    },
    (err) => console.log(err)
  );

  return (
    <Stack>
      <div>
        <Form.Group controlId="file" className="mb-3">
          <Form.Control type="file" onChange={handleFileFormControlOnChange} />
          <Camera
            imageSrc={imgSrc}
            setImgSrc={setImgSrc}
            setFileObj={setFileObj}
          />
        </Form.Group>
        <Button onClick={predictImageViaUpload}>Submit</Button>
      </div>
    </Stack>
  );
}

{
  /*<Button onClick={predictImageViaUpload}>Submit</Button> ; */
}
