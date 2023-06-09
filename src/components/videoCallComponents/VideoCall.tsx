import { Grid } from '@material-ui/core'
import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import {config, useClient, useMicrophoneAndCameraTracks, channelName, } from '../../VideoCallSettings'
import Controls from './Controls'
import Video from './Video'
import ClientNav from '../clientHomePageComponents/ClientNav'
import FreelancerNav from '../FreelancerNav'
import AgoraRTC from 'agora-rtc-sdk-ng';

function VideoCall(props: any) {
    console.log(window.location.href, '09')
    const [inCall, setInCall] = useState(true);
    const [users, setUsers]:any = useState([]);
    const [start, setStart] = useState(false);
    const [screenTrack, setScreenTrack]: any = useState()
    const client = useClient();
    const {ready, tracks}:any = useMicrophoneAndCameraTracks();
    console.log(inCall)
    useEffect(() => {
        const init = async (name: String|any) => {
            client.on('user-published',async (user:any, mediaType:any) => {
                await client.subscribe(user, mediaType)
                if(mediaType === 'video') {
                    setUsers((prev: any) => {
                        return [...prev, user]
                    })
                }
                if(mediaType === 'audio') {
                    user.audioTrack.play()
                }
            })

            client.on('user-unpublished', (user:any, mediaType: any) => {
                if(mediaType === 'audio') {
                    if(user.audioTrack) user.audioTrack.stop()
                }
                if(mediaType === 'video') {
                    setUsers((prev: any) => {
                        return prev.filter((User:any) => User.uid !== user.uid)
                    })
                }
            })
            client.on('user-left', (user) => {
                setUsers((prev: any) => {
                    return prev.filter((User:any) => User.uid !== user.uid)
                })
            })

            try {
                await client.join(config.appId, name, config.token, null)
            } catch (error: any) {
                toast.error(error.message)
            }

            if(tracks) await client.publish([tracks[0], tracks[1]]);
            setStart(true)
        }
        if(ready && tracks) {
            init(channelName)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [channelName, client, ready, tracks])

    async function startScreenSharing() {
        try {
            await client.unpublish([tracks[1]]);
          // Create a screen sharing video track
          const screenTrack: any = await AgoraRTC.createScreenVideoTrack({
            encoderConfig: '1080p_1', // Set the desired resolution, e.g., '1080p_1', '720p_1', etc.
          });
          console.log(screenTrack, '0990')
          // Publish the screen sharing video track
          await client.publish([screenTrack]);
      
          // Set the screen sharing track to the component's state
          setScreenTrack(screenTrack);
        } catch (error) {
          console.error('Failed to start screen sharing:', error);
        }
      }
      async function stopScreenSharing() {
        try {

            // Unpublish the screen sharing track
            await client.unpublish([screenTrack]);
      
            // Stop the screen sharing track
            screenTrack.stop();
          
      
          if (tracks) {
            // Publish the local video track
            await client.publish([tracks[1]]);
          }
      
          // Set the screen sharing track to null
          setScreenTrack(null);
        } catch (error) {
          console.error('Failed to stop screen sharing:', error);
        }
      }

    // const startScreenSharing = async () => {
    //     try {
    //       const screenTrack: any = await CreateScreenVideoTrack({ encoderConfig: '1080p_1' });
    //       setScreenTrack(screenTrack);
    //       await client.publish(screenTrack);
    //       setTrackState((prev: any) => ({ ...prev, screenShare: true }));
    //     } catch (error) {
    //       console.error('Failed to start screen sharing:', error);
    //     }
    //   };

    //   const stopScreenSharing = async () => {
    //     if (screenTrack) {
    //       await client.unpublish(screenTrack);
    //       screenTrack.stop();
    //       setScreenTrack(null);
    //       setTrackState((prev: any) => ({ ...prev, screenShare: false }));
    //     }
    //   };
      

  return (
    <>{
        window.location.href === 'https://hiverrr.netlify.app/freelancer/videoCall'?<FreelancerNav />:<ClientNav />
    }
          
      <Grid container direction='column' style={{height: '100%'}}>
        <Container style={{height: '5%'}}>
            {
                ready && tracks && (
                    <Controls stopScreenSharing={stopScreenSharing} startScreenSharing={startScreenSharing} tracks={tracks} setStart={setStart} setInCall={setInCall} />
                )
            }
        </Container>
        <Grid item style={{height: '95%'}}>
            {
                start && tracks && (
                    <Video screenTrack={screenTrack} tracks={tracks} users={users} />
                )
            }
        </Grid>
      </Grid>
    </>
  )
}

export default VideoCall
