import { Grid } from '@material-ui/core'
import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import {config, useClient, useMicrophoneAndCameraTracks, channelName, } from '../../VideoCallSettings'
import Controls from './Controls'
import Video from './Video'
import ClientNav from '../clientHomePageComponents/ClientNav'
import FreelancerNav from '../FreelancerNav'

function VideoCall(props: any) {
    console.log(window.location.href, '09')
    const [inCall, setInCall] = useState(true);
    const [users, setUsers]:any = useState([]);
    const [start, setStart] = useState(false);
    const client = useClient();
    const {ready, tracks} = useMicrophoneAndCameraTracks();
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
                    <Controls  tracks={tracks} setStart={setStart} setInCall={setInCall} />
                )
            }
        </Container>
        <Grid item style={{height: '95%'}}>
            {
                start && tracks && (
                    <Video tracks={tracks} users={users} />
                )
            }
        </Grid>
      </Grid>
    </>
  )
}

export default VideoCall
