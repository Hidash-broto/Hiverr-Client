import { Button, Divider, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { gigPageChange } from "../../redux/Gig";

function Discription() {
  const [value, setValue] = useState("");
  console.log(value);
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      if (value.length === 0) {
        return toast.error("You should Provide Discription");
      }
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/freelancer/gigCreation`,
        { value, number: 3 },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('freelancerToken')}`,
          },
        }
      );
      if (response.data.status) {
        dispatch(gigPageChange(3));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went Wrong");
    }
  };
  return (
    <>
      <Container
        sx={{
          width: "1200px",
          height: "600px",
          backgroundColor: "#cccccc",
          marginTop: "40px",
          position: "absolute",
          marginLeft: "50px",
        }}
      >
        <Typography variant="h2">Description</Typography>
        <Divider light sx={{ marginTop: "30px" }} />
        <Typography sx={{ marginTop: "30px" }} variant="h6">
          Briefly Describe Your Gig
        </Typography>
        <Container
          sx={{
            width: "1200px",
            height: "343px",
            backgroundColor: "white",
            marginTop: "30px",
            position: "absolute",
          }}
        >
          <ReactQuill
            modules={modules}
            theme="snow"
            value={value}
            onChange={setValue}
            placeholder="Content goes here..."
            className="gigCreationQuill"
          />
        </Container>
        <Button
          sx={{ width: "200px", marginLeft: "1000px", marginTop: "387px" }}
          color="success"
          variant="contained"
          size="large"
          onClick={handleSubmit}
        >
          Save & Continue
        </Button>
      </Container>
    </>
  );
}

export default Discription;
