import {createClient, createMicrophoneAndCameraTracks, createScreenVideoTrack} from 'agora-rtc-react'

const appId = '79fe03094ebd45408c2bdbec67de2879';
const token = '007eJxTYFhVYK2rJlkymWdi51tviVO+6bbbFtlz75z7o/NcRnaLFYsCg7llWqqBsYGlSWpSiompiYFFslFSSlJqspl5SqqRhbkl29rGlIZARobzS00ZGKEQxGdhyE3MzGNgAACyWB2o'


export const config:any = {mode: 'rtc', codec: 'vp8', appId, token};
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = 'main';
export const CreateScreenVideoTrack = createScreenVideoTrack;
