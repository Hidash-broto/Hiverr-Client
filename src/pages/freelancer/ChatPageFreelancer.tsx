import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ChatInput from "../../components/chatComponents/ChatInput";
import UserFooter from "../../components/UserFooter";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import FreelancerNav from "../../components/FreelancerNav";

function ChatPageFreelancer() {
  const socket: any = useRef();
  const [activeMessenger, setActiveMessenger] = useState("");
  const [currentUserId, setCurrentUserId] = useState([]);
  const [allUsers, setAllUsers]: any = useState([]);
  const [messages, setMessages]: any = useState([]);
  const [arrivalMessage, setArrivalMessage]: any = useState(null);
  const scrollRef = useRef<null | HTMLElement>();
  let ind: number = allUsers.findIndex(
    (obj: any) => obj._id === activeMessenger
  );

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/freelancer/getAllMessengers`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("freelancerToken")}`,
        },
      }
    );
    console.log(response.data, "++");
    setCurrentUserId(response.data.userId);

    if (response.data.status) {
      setAllUsers(response.data.users);
    }
  };
  useEffect(() => {
    const recieveMessage = async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/getAllMessages`,
        {
          from: currentUserId,
          to: activeMessenger,
        }
      );
      console.log(response);
      setMessages(response.data.projectedMessages);
    };
    console.log(messages);
    recieveMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMessenger]);
  useEffect(() => {
    fetchData();
  },[]);
  useEffect(() => {
    if (currentUserId?.length > 0) {
      socket.current = io("https://hiverr-backend.onrender.com");
      socket.current.emit("add-user", currentUserId);
    }
  }, [currentUserId]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg: any) => {
        console.log("objectlplp");
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  });

  useEffect(() => {
    arrivalMessage && setMessages((prev: any) => [...prev, arrivalMessage]);
    console.log(messages, "messages");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrivalMessage]);

  const handleSendMsg = async (msg: string) => {
    var currentdate = new Date();
    var datetime =
      currentdate.getDay() +
      "/" +
      currentdate.getMonth() +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();

    socket.current.emit("send-msg", {
      to: activeMessenger,
      from: currentUserId,
      msg,
    });

    await axios.post(`${process.env.REACT_APP_BASE_URL}/userAddMessage`, {
      from: currentUserId,
      to: activeMessenger,
      messages: msg,
    });

    const msgs: any = [...messages];
    msgs.push({ fromSelf: true, message: msg, time: datetime });
    setMessages(msgs);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      <FreelancerNav />
      <div style={{ width: "1350px", height: "700px" }} className="djfkd">
        <Container
          sx={{
            backgroundColor: "#dbdbdb",
            width: "1200px",
            height: "500px",
            marginTop: "70px",
            position: "absolute",
            marginLeft: "70px",
            borderTopLeftRadius: "5px",
            borderBottomLeftRadius: "5px",
          }}
        >
          <Stack direction="column" spacing={1}>
            <Box
              sx={{
                width: "150px",
                height: "70px",
                backgroundColor: "#002D04",
                borderRadius: "5px",
                marginTop: "10px",
                ml: 6,
              }}
            >
              <Typography sx={{ mt: 1, ml: 1 }} color="white" variant="h3">
                Hiverr
              </Typography>
            </Box>
            {allUsers.map((user: any) => {
              return (
                <Box
                  onClick={() => {
                    setActiveMessenger(user._id);
                    fetchData();
                  }}
                  sx={{
                    width: "280px",
                    height: "70px",
                    backgroundColor: `${
                      activeMessenger === user._id ? "#002D04" : "white"
                    }`,
                    borderRadius: "5px",
                  }}
                  className="clientActiveMessenger"
                >
                  <Stack direction="row">
                    <Avatar
                      sx={{
                        bgcolor: "#5a5b7d",
                        marginTop: "15px",
                        marginLeft: "10px",
                      }}
                      alt={user.firstName.charAt(0)}
                      src="/static/images/avatar/1.jpg"
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#5a5b7d",
                        marginTop: "18px",
                        marginLeft: "10px",
                      }}
                    >
                      {user.firstName + " " + user.lastName}
                    </Typography>
                  </Stack>
                </Box>
              );
            })}
          </Stack>
        </Container>
        <Container
          sx={{
            position: "absolute",
            marginLeft: "395px",
            backgroundColor: "#002D04",
            width: "890px",
            height: "500px",
            marginTop: "70px",
            borderTopRightRadius: "5px",
            borderBottomRightRadius: "5px",
          }}
        >
          <Stack
            direction="row"
            sx={{
              borderBottom: "solid 2px white",
              width: "890px",
              height: "63px",
              marginLeft: "-24px",
            }}
          >
            {ind !== -1 ? (
              <>
                <Avatar
                  sx={{
                    bgcolor: "#5a5b7d",
                    marginTop: "12px",
                    marginLeft: "15px",
                  }}
                  alt={allUsers[ind].firstName.charAt(0)}
                  src="/static/images/avatar/1.jpg"
                />
                <Typography
                  sx={{ marginTop: "17px", marginLeft: "8px" }}
                  color="white"
                  variant="h5"
                >
                  {allUsers[ind].firstName}
                </Typography>
                <Divider sx={{ color: "#dbdbdb" }} />
              </>
            ) : (
              <></>
            )}
          </Stack>
          {activeMessenger.length === 0 ? (
            <>
              <Stack sx={{ marginLeft: "216px" }} direction="column">
                <img
                  style={{ width: "400px" }}
                  src="/gif/robot.gif"
                  alt="gif"
                />
                <Typography
                  color="white"
                  sx={{ marginTop: "-100px", marginLeft: "64px" }}
                  variant="h3"
                >
                  Welcome,Hidash
                </Typography>
                <Typography
                  color="white"
                  sx={{ marginLeft: "64px" }}
                  variant="h6"
                >
                  Please select a chat to Start Messaging
                </Typography>
              </Stack>
            </>
          ) : (
            <div>
              <Stack
                direction="column"
                sx={{ width: "840px", height: "355px", marginTop: "20px" }}
                className="clientChatContainer"
              >
                {messages.map((msg: any) => {
                  return (
                    <div
                      ref={scrollRef as any}
                      key={uuidv4 as any}
                      className="msgContainer"
                    >
                      <div
                        className={`${
                          msg.fromSelf
                            ? "sended message-blue"
                            : "recieved message-orange"
                        }`}
                      >
                        <p className="message-content">{msg.message}</p>
                        <div className="message-timestamp-left">{msg.time}</div>
                      </div>
                    </div>
                  );
                })}
              </Stack>
              <ChatInput handleSendMsg={handleSendMsg} />
            </div>
          )}
        </Container>
      </div>
      <UserFooter />
    </>
  );
}

export default ChatPageFreelancer;
