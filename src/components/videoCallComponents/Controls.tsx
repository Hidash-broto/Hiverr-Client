import React, { useState } from 'react'
import {useClient} from '../../VideoCallSettings'
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@material-ui/icons/MicOff'
import VideocamIcon from '@material-ui/icons/Videocam'
import VideocamOffIcon from '@material-ui/icons/VideocamOff'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { Button, Grid } from '@material-ui/core'
import { useNavigate } from 'react-router-dom';

function Controls(props: any) {
    const navigate = useNavigate()
    const client = useClient();
    const [screenSharing, setScreenSharing]: Boolean|any = useState(true);
    const {tracks , setInCall, setStart, startScreenSharing, stopScreenSharing} = props;
    const [trackState, setTrackState] = useState({video: true, audio: true, screenShare: false})

    const leaveCall = async () => {
        await client.leave()
        client.removeAllListeners()
        tracks[0].close()
        tracks[1].close()
        setStart(false)
        setInCall(false)
        console.log(window.location.href)
        window.location.href === 'https://hiverrr.netlify.app/freelancer/videoCall'?navigate('/freelancer/chatPage'):navigate('/client/chatPage')
    }

    const mute = async (type: String|any) => {
        if(type === 'audio') {
            await tracks[0].setEnabled(!trackState.audio)
            setTrackState((prev: any) => {
                return {...prev, audio: !prev.audio}
            })
        } else if (type === 'video') {
            await tracks[1].setEnabled(!trackState.video)
            setTrackState((prev: any) => {
                return {...prev, video: !prev.video}
            })
        }
    }
    
  return (
    <>
      <Grid style={{position: 'absolute', zIndex: '99', marginLeft: '520px', marginTop: '450px'}} container alignItems='center' spacing={2} >
      <Grid item >
            <Button onClick={() => {
                setScreenSharing(!screenSharing)
                screenSharing?stopScreenSharing():startScreenSharing()
                }} variant='contained' color={screenSharing? 'secondary':'primary'}>
            {screenSharing? <ScreenShareIcon /> : <ScreenShareIcon />}
            </Button>
        </Grid>
        <Grid item >
            <Button onClick={() => mute('audio')} variant='contained' color={trackState.audio? 'primary':'secondary'}>
            {trackState.audio? <MicIcon /> : <MicOffIcon />}
            </Button>
        </Grid>
        <Grid item >
        <Button onClick={() => mute('video')} variant='contained' color={trackState.video? 'primary':'secondary'}>
            {trackState.video? <VideocamIcon /> : <VideocamOffIcon />}
            </Button>
        </Grid>
        <Grid item >
        <Button onClick={() => {
            leaveCall()
            }} variant='contained' color='default'>
            Leave
            <ExitToAppIcon />
            </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default Controls
