import { Button, Container, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useStyle } from "../style";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import ReactLoading from "react-loading";

function AdminDashboard() {
  const [gigs, setGigs]: any = useState([]);
  const [loading, setLoading] = useState(true);
  const [emptyData, setEmptyData] = useState(false);
  const user = useSelector((state: any) => state.user);
  const letter = user.value.firstName ? user.value.firstName.charAt(0) : "H";
  console.log(letter);
  const classes = useStyle();
  useEffect(() => {
    const getAllPendingGig = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/admin/getAllPendingGigs`
      );
      setLoading(false);
      if (response.data.status) {
        if (response.data.gigs.length > 0) {
          setGigs(response.data.gigs);
        } else {
          setEmptyData(true);
        }
      } else {
        toast.error(response.data.message);
      }
    };
    getAllPendingGig();
  });

  const statusChange = async (status: Boolean, userId: String) => {
    try {
      console.log(userId);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/admin/gigStatusChange`,
        { status, userId }
      );
      if (response.data.status) {
        toast.success(`Gig ${response.data.data}ed Successfully`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went Wrong");
    }
  };

  return (
    <>
      <Container className={classes.contentContainer}>
        <Typography
          color="#cc3300"
          sx={{ marginTop: "30px", position: "absolute", marginLeft: "20px" }}
          variant="h3"
        >
          Dashboard
        </Typography>
        <Stack
          direction="column"
          spacing={3}
          sx={{ marginTop: "110px", marginLeft: "20px", position: "absolute" }}
        >
          {loading ? (
            <ReactLoading
              type="spinningBubbles"
              color="#0000FF"
              height={100}
              width={50}
              className={classes.listLoading}
            />
          ) : emptyData ? (
            <Stack
              sx={{
                width: "450px",
                height: "400px",
                marginLeft: "313px",
                marginTop: "0px",
              }}
              direction="column"
            >
              <img
                style={{ width: "300px", height: "300px" }}
                src="/img/folder.png"
                alt=""
              />
              <Typography
                variant="h3"
                color="#5e79ff"
                sx={{
                  fontFamily: "monospace",
                  filter: "drop-shadow(1px 1px 1px #000000)",
                }}
              >
                No Pending Gigs
              </Typography>
            </Stack>
          ) : (
            gigs.map((gig: any) => {
              console.log(gig.title, "==");
              return (
                <Box
                  sx={{
                    width: "980px",
                    height: "140px",
                    border: "solid 1px",
                    backgroundColor: "white",
                  }}
                >
                  <Stack direction="row">
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        marginTop: "20px",
                        marginLeft: "40px",
                        borderRadius: "5px",
                        border: "solid 1px",
                      }}
                      src={gig.images[0]}
                      alt=""
                    />
                    <Box
                      className="ml-10"
                      sx={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "100px",
                        backgroundColor: "#cccccc",
                        marginTop: "30px",
                      }}
                    >
                      <Typography
                        align="center"
                        sx={{ marginTop: "15px" }}
                        variant="h4"
                      >
                        {letter}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{ marginTop: "55px" }}
                      variant="h6"
                      className="ml-10"
                    >
                      {gig.title ? gig.title.slice(0, 30) : null}...
                    </Typography>
                    <Typography
                      color="#00fffb"
                      variant="h6"
                      sx={{ marginTop: "55px" }}
                      className="ml-10"
                    >
                      View More
                    </Typography>
                    <Button
                      onClick={() => {
                        Swal.fire({
                          title: "Are you Sure to Reject the Gig",
                          showDenyButton: true,
                          confirmButtonText: "Sure",
                        }).then((result) => {
                          /* Read more about isConfirmed, isDenied below */
                          if (result.isConfirmed) {
                            statusChange(false, gig.userId);
                          } else if (result.isDenied) {
                            Swal.fire("Changes are not saved", "", "info");
                          }
                        });
                      }}
                      variant="outlined"
                      size="small"
                      sx={{
                        marginTop: "55px",
                        height: "40px",
                        color: "#cc3300",
                      }}
                      className="ml-10"
                    >
                      Reject
                    </Button>
                    <Button
                      onClick={() => statusChange(true, gig.userId)}
                      variant="outlined"
                      size="small"
                      sx={{ marginTop: "55px", height: "40px" }}
                      className="ml-10"
                    >
                      Approve
                    </Button>
                  </Stack>
                </Box>
              );
            })
          )}
        </Stack>
      </Container>
    </>
  );
}

export default AdminDashboard;
