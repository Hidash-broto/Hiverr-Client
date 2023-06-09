import React, { useEffect, useState } from 'react'
import {AgoraVideoPlayer} from 'agora-rtc-react'
import { Grid } from '@material-ui/core'
import { Container } from '@mui/material'

function Video(props: any) {
    const {users, tracks} = props
    const [setGridSpacing]:Number|any = useState(12)

    useEffect(() => {
        setGridSpacing(Math.max(Math.floor(12/(users.length + 1)), 4))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [users, tracks])
    console.log(users)
  return (
    <>
      <Grid container style={{height: '600px'}}>
        <Container sx={{width: '300px', maxWidth: '2000px !important', height: '200px', position: 'absolute', ml: '20px', mt: '320px', zIndex: '99'}}>
            <AgoraVideoPlayer videoTrack={tracks[1]} style={{height: '100%', width: '100%'}} />
        </Container>
        {
            users.length > 0 && 
            // eslint-disable-next-line array-callback-return
            users.map((user: any) => {
                if(user.videoTrack) {
                    return         <div style={{maxWidth: '2000px !important', width: '100%', height: '100%', marginTop: '0px'}}>
                    <AgoraVideoPlayer videoTrack={user.videoTrack} key={user.uid} style={{height: '100%', width: '100%'}} />
                </div>
                }
            })
        }
      </Grid>
    </>
  )
}

export default Video
