import {makeStyles} from '@material-ui/core/styles'


export const useStyle = makeStyles((theme) => ({
    containerLogin: {
        background: '#FCAF26',
        marginTop: '100px',
        position: 'absolute',
        marginLeft:'80px'
    },
    containerLogin2: {
        background: '#2c2e30',
        marginTop: '3px',
    },
    heading: {
        marginLeft:'30px',
        marginTop:'15px',
        // fontFamily:''
    },
    ContainerSelector: {
        width:'661px',
        height:'400px',
        marginTop:'114px',
        backgroundColor:'rgba(255, 255, 255, 0.7)',
        borderRadius:'10px',
        position:'absolute',
        marginLeft:'359px'
    },
    imageContainer: {
        position:'absolute',
        backgroundImage:'url(https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)',
        width: '100%',
        height: '642px',
        backgroundSize:'1357px 698px',
        backgroundRepeat: 'no-repeat',
    },
    selectBox: {
        width:'285px',
        height:'184px',
        backgroundColor:'rgba(255, 255, 255, 1)',
        marginTop:'55px',
        borderRadius:'10px',
        maxWidth:'100%'
    },
    applyButton: {

        marginTop:'30px'
    },
    clientSignupContainer: {
        width:'527px',
        height: '575px',
        backgroundColor: '#ffffff',
        borderStyle:'solid',
        borderColor: 'black',
        marginTop: '30px',
        borderRadius:'10px'
    },
    floatingLabelFocusStyle: {
        color:'#ffffff',
        fontSize:'20px'
    },
    adminLayout: {
        width: '307px',
        backgroundColor: '#ffffff',
        marginLeft:'0',
        marginRight:'0'
    },
    contentContainer: {
        width:'1050px',
        height:'550px',
        marginTop:'40px',
        backgroundColor:'#ebebeb',
        marginLeft: '-25px'
    },
    clientSignupContainer2: {
        width:'527px',
        height: '380px',
        backgroundColor: '#ffffff',
        borderStyle:'solid',
        borderColor: 'black',
        borderRadius:'10px',
        marginTop: '130px'
    }
}))