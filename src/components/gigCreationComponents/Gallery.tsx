import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import ArticleIcon from "@mui/icons-material/Article";
import { toast } from "react-hot-toast";
import { Delete } from "@mui/icons-material";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config";
import { v4 } from "uuid";
import { useDispatch } from "react-redux";
import { gigPageChange } from "../../redux/Gig";

function Gallery() {
  const [imageUrls]: any = useState([]);
  const [videoUrls, setVideoUrls]: any = useState("");
  const [documentUrls, setDocumentUrls] = useState('');
  const [video, setVideo]: any = useState({
    file: [],
    filePreview: null,
  });
  const [image1, setImage]: any = useState({
    file: [],
    filePreview: null,
  });
  const [document, setDocument]: any = useState({
    file: [],
    filePreview: null,
  });

  console.log(video, document, image1);


  const handleInputChange1 = (event: any) => {
    if (event.target.files[0].type === "image/png") {
      setImage({
        file: event.target.files[0],
        filePreview: URL.createObjectURL(event.target.files[0]),
      });
    } else {
      toast.error("Only jpeg/png format Allowed");
    }
  };

  const [image2, setImage2]: any = useState({
    file: [],
    filePreview: null,
  });

  const handleInputChange2 = (event: any) => {
    if (event.target.files[0].type === "image/png") {
      setImage2({
        file: event.target.files[0],
        filePreview: URL.createObjectURL(event.target.files[0]),
      });
    } else {
      toast.error("Only jpeg/png format Allowed");
    }
  };

  const [image3, setImage3]: any = useState({
    file: [],
    filePreview: null,
  });

  const handleInputChange3 = (event: any) => {
    if (event.target.files[0].type === "image/png") {
      setImage3({
        file: event.target.files[0],
        filePreview: URL.createObjectURL(event.target.files[0]),
      });
    } else {
      toast.error("Only jpeg/png format Allowed");
    }
  };

  const upload = () => {
      if (image1 == null) return;
      const sample = [];
      sample[0] = ref(storage, `gigImages/${image1.file.name + v4()}`);
      sample[1] = ref(storage, `gigImages/${image2.file.name + v4()}`);
      sample[2] = ref(storage, `gigImages/${image3.file.name + v4()}`);
      let img: any;
  
      sample.map((imageRef, index) => {
        if (index === 0) {
          img = image1.file;
        } else if (index === 1) {
          img = image2.file;
        } else if (index === 2) {
          img = image3.file;
        }
  
        uploadBytes(imageRef, img).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            console.log(url);
            imageUrls.push(url);
            console.log(imageUrls);
          });
        });
      });
  };

  const uploadVideo = () => {
    const videoRef = ref(storage, `gigVideo/${video.file.name + v4()}`);
    console.log(video.name)
    uploadBytes(videoRef, video).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
        setVideoUrls(url);        
      });
    });
  };

  const dispatch = useDispatch()


 const  uploadDoc = () => {
    const documentRef = ref(storage, `gigDocument/${document.name + v4()}`)
    uploadBytes(documentRef, document).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async(url) => {
        setDocumentUrls(url)
        // const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/freelancer/gigCreation`,{imageUrls, videoUrls, documentUrls, number: 5}, {
        //   headers: {
        //     Authorization :  `Bearer ${localStorage.getItem('token')}`
        //   }
        // })
    //  if(response.data.status) {
    //   toast.success('set')
    //   // dispatch(gigPageChange(6))
    //  }
        console.log(url)
      })
    })
  }




  return (
    <>
      <Container
        className="galleryContainer"
        sx={{
          width: "1200px",
          paddingBottom: "50px",
          backgroundColor: "#cccccc",
        }}
      >
        <Container>
          <Stack direction="column">
            <Stack direction="column" spacing={1}>
              <Typography variant="h4" className="mt-10">
                Showcase Your Services In A Gig Gallery
              </Typography>
              <Typography color="#828282">
                Encourage buyers to choose your Gig by featuring a variety of
                your work.
              </Typography>
            </Stack>
            <Divider sx={{ marginTop: "30px" }} />
            <Stack direction="column">
              <Stack direction="column" spacing={1}>
                <Typography variant="h6" className="mt-10">
                  Images (up to 3)
                </Typography>
                <Typography color="#828282">
                  Get noticed by the right buyers with visual examples of your
                  services.
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2} sx={{ marginTop: "50px" }}>
                <Box
                  sx={{
                    width: "250px",
                    height: "200px",
                    backgroundColor: "white",
                  }}
                >
                  {image1.filePreview != null ? (
                    <>
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={image1.filePreview}
                        alt="Upload Image"
                      />
                      <Delete
                        onClick={() => {
                          setImage({
                            file: [],
                            filePreview: null,
                          });
                        }}
                        sx={{
                          position: "absolute",
                          marginTop: "155px",
                          marginLeft: "-45px",
                          backgroundColor: "#bf0d00",
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <InsertPhotoIcon
                        sx={{
                          width: "130px",
                          height: "130px",
                          marginLeft: "50px",
                          marginTop: "20px",
                        }}
                      />
                      <input
                        onChange={handleInputChange1}
                        style={{
                          width: "130px",
                          height: "130px",
                          marginLeft: "50px",
                        }}
                        type="file"
                        name="image"
                      />
                    </>
                  )}
                </Box>
                <Box
                  sx={{
                    width: "250px",
                    height: "200px",
                    backgroundColor: "white",
                  }}
                >
                  {image2.filePreview != null ? (
                    <>
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={image2.filePreview}
                        alt="Upload Image"
                      />
                      <Delete
                        onClick={() => {
                          setImage2({
                            file: [],
                            filePreview: null,
                          });
                        }}
                        sx={{
                          position: "absolute",
                          marginTop: "155px",
                          marginLeft: "-45px",
                          backgroundColor: "#bf0d00",
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <InsertPhotoIcon
                        sx={{
                          width: "130px",
                          height: "130px",
                          marginLeft: "50px",
                          marginTop: "20px",
                        }}
                      />
                      <input
                        onChange={handleInputChange2}
                        style={{
                          width: "130px",
                          height: "130px",
                          marginLeft: "50px",
                        }}
                        type="file"
                        name="image"
                      />
                    </>
                  )}
                </Box>
                <Box
                  sx={{
                    width: "250px",
                    height: "200px",
                    backgroundColor: "white",
                  }}
                >
                  {image3.filePreview != null ? (
                    <>
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={image3.filePreview}
                        alt="Upload Image"
                      />
                      <Delete
                        onClick={() => {
                          setImage3({
                            file: [],
                            filePreview: null,
                          });
                        }}
                        sx={{
                          position: "absolute",
                          marginTop: "155px",
                          marginLeft: "-45px",
                          backgroundColor: "#bf0d00",
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <InsertPhotoIcon
                        sx={{
                          width: "130px",
                          height: "130px",
                          marginLeft: "50px",
                          marginTop: "20px",
                        }}
                      />
                      <input
                        onChange={handleInputChange3}
                        style={{
                          width: "130px",
                          height: "130px",
                          marginLeft: "50px",
                        }}
                        type="file"
                        name="image"
                      />
                    </>
                  )}
                </Box>
              </Stack>
            </Stack>
            <Divider sx={{ marginTop: "50px" }} />
            <Stack direction="column">
              <Stack direction="column" spacing={1}>
                <Typography variant="h6" className="mt-10">
                  Video (one only)
                </Typography>
                <Typography color="#828282">
                  Capture buyers' attention with a video that showcases your
                  service. Please choose a video shorter than 75 seconds and
                  smaller than 50MB
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2} sx={{ marginTop: "50px" }}>
                <Box
                  sx={{
                    width: "250px",
                    height: "200px",
                    backgroundColor: "white",
                  }}
                >
                  {video.filePreview != null ? (
                    <>
                      <iframe
                        src={video.filePreview}
                        style={{ width: "100%", height: "100%" }}
                      ></iframe>
                      <Delete
                        onClick={() => {
                          setVideo({
                            file: [],
                            filePreview: null,
                          });
                        }}
                        sx={{
                          position: "absolute",
                          marginTop: "-48px",
                          marginLeft: "195px",
                          backgroundColor: "#bf0d00",
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <VideoCallIcon
                        sx={{
                          width: "130px",
                          height: "130px",
                          marginLeft: "50px",
                          marginTop: "20px",
                        }}
                      />
                      <input
                        onChange={(event: any) => {
                          if (event.target.files[0].size / 1000000 <= 50) {
                            if (event.target.files[0].type === "video/mp4") {
                              console.log(event.target.files[0]);
                              setVideo({
                                file: event.target.files[0],
                                filePreview: URL.createObjectURL(
                                  event.target.files[0]
                                ),
                              });
                            } else {
                              toast.error(
                                "You can only upload mp4 format vidoes"
                              );
                            }
                          } else {
                            toast.error(
                              "You can only Upload video below 50 mb"
                            );
                          }
                        }}
                        style={{
                          width: "130px",
                          height: "130px",
                          marginLeft: "50px",
                        }}
                        type="file"
                        name="video"
                      />
                    </>
                  )}
                </Box>
              </Stack>
            </Stack>
            <Divider sx={{ marginTop: "50px" }} />
            <Stack direction="column">
              <Stack direction="column" spacing={1}>
                <Typography variant="h6" className="mt-10">
                  Documents (up to 2)
                </Typography>
                <Typography color="#828282">
                  Show some of the best work you created in a document (PDFs
                  only).
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2} sx={{ marginTop: "50px" }}>
                <Box
                  sx={{
                    width: "250px",
                    height: "200px",
                    backgroundColor: "white",
                  }}
                >
                  {document.filePreview != null ? (
                    <>
                      <iframe
                        src={document.filePreview}
                        style={{ width: "100%", height: "100%" }}
                      ></iframe>
                      <Delete
                        onClick={() => {
                          setDocument({
                            file: [],
                            filePreview: null,
                          });
                        }}
                        sx={{
                          position: "absolute",
                          marginTop: "-48px",
                          marginLeft: "195px",
                          backgroundColor: "#bf0d00",
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <ArticleIcon
                        sx={{
                          width: "130px",
                          height: "130px",
                          marginLeft: "50px",
                          marginTop: "20px",
                        }}
                      />
                      <input
                        style={{
                          width: "130px",
                          height: "130px",
                          marginLeft: "50px",
                        }}
                        type="file"
                        name="image"
                        onChange={(e: any) => {
                          console.log(e.target.files[0].type);
                          if (e.target.files[0].type === "application/pdf") {
                            setDocument({
                              file: e.target.files[0],
                              filePreview: URL.createObjectURL(
                                e.target.files[0]
                              ),
                            });
                          } else {
                            toast.error("Upload pdf File");
                          }
                        }}
                      />
                    </>
                  )}
                </Box>
              </Stack>
            </Stack>
            <Divider sx={{ marginTop: "50px" }} />
          </Stack>
          <Button
            type="submit"
            sx={{ width: "200px", marginLeft: "1060px", marginTop: "50px" }}
            color="success"
            variant="contained"
            size="large"
            onClick={() => {
              uploadVideo()
            }}
          >
            Save & Continue
          </Button>
        </Container>
      </Container>
    </>
  );
}

export default Gallery;
