import {createClient, createMicrophoneAndCameraTracks, createScreenVideoTrack} from 'agora-rtc-react'

const appId = '79fe03094ebd45408c2bdbec67de2879';
const token = '007eJxTYKhpnOfYf8xtSXHQy6tZHP8ybK/81hVkb+r9/d697Mk5lX4FBnPLtFQDYwNLk9SkFBNTEwOLZKOklKTUZDPzlFQjC3PLfyzNKQ2BjAxF0lNYGBkgEMRnYchNzMxjYAAAseQggg=='


export const config:any = {mode: 'rtc', codec: 'vp8', appId, token};
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = 'main';
export const CreateScreenVideoTrack = createScreenVideoTrack;
