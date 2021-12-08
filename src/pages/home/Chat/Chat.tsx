import {Avatar, Divider, Grid, IconButton, InputAdornment, TextField, Typography} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, {useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import ChatMessageComponents from "../../../components/chatMessage/ChatMessageComponents";
import ImageIcon from '@mui/icons-material/Image';
import {io} from 'socket.io-client'
import {useDispatch, useSelector} from 'react-redux';
import {getDialogDetailThunk} from '../../../redux/reducers/dialogReducer';
import {AppDispatchType} from '../../../redux/store'
import {getDialogDetail, getMessageChat} from "../../../redux/selectors/selectors";
import {OnlineComponent} from "../../../components/online/OnlineComponent";
import {hasWhiteSpace} from "../../../components/friendItem/FriendItemComponent";
import {add_message, createMessageThunk, getMessagesThunk} from "../../../redux/reducers/chatReducer";
import {messageType} from "../../../api/message";

;


type UrlParamsType = {
    id: string
}
const useStyles = makeStyles({
    header: {
        height: 50,
        display: 'flex',
        marginTop: -7,
        marginBottom: 1
    },
    header_iconBack: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        marginLeft: 10
    },
    header_user: {
        width: '86%',
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
    },
    header_user_info: {
        marginLeft: 5
    },
    header_user_name: {
        fontFamily: 'Robotot',
        margin: 0,
        marginTop: 5,
        fontWeight: 700
    },
    header_user_status: {
        display: 'flex',
        alignItems: 'center',
        color: '#667182',
    },
    message_input: {
        position: 'fixed',
        marginTop: 'auto'
    }
})
export type imageInputType = FileList | null
const Chat = (props: any) => {
    let {id}: UrlParamsType = useParams()
    console.log('id = ', id)
    const dispatch = useDispatch<AppDispatchType>()
    React.useEffect(()=>{
        dispatch(getMessagesThunk({dialog_id: id}))
        dispatch(getDialogDetailThunk({id}))
    }, [])
    const messages = useSelector(getMessageChat)
    const dialog = useSelector(getDialogDetail)
    const [text, setText] = useState('')
    const classes = useStyles()
    const history = useHistory()
    React.useEffect(() => {
        const socket = io('http://localhost:8000', {
            withCredentials: true,
        })
        socket.on('add message', (data: { message: messageType }) => {
                dispatch(add_message(data.message))
        })
    }, [])
    return (
        <Grid style={{marginLeft: 232}}>
            <Grid className={classes.header}>
                <Grid className={classes.header_iconBack}>
                    <IconButton onClick={() => {
                        history.goBack()
                    }}>
                        <ArrowBackIcon sx={{width: 30, height: 30, color: '#000'}}/>
                    </IconButton>
                </Grid>
                <Grid className={classes.header_user}>
                    <Avatar
                        src={hasWhiteSpace(dialog && dialog.partner.avatar) ? 'default image' : `http://localhost:8000/uploads/userImages/${dialog && dialog.partner.avatar}`}
                        style={{
                            width: 50,
                            height: 50
                        }}/>
                    <Grid className={classes.header_user_info}>
                        <p className={classes.header_user_name}>
                            {dialog && dialog.partner.name}
                        </p>
                        <Typography className={classes.header_user_status}>
                            <OnlineComponent isOnline={dialog && dialog.partner.isOnline}/>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Divider/>
            <Grid style={{paddingBottom: 100}}>
                {messages.map((message, i) => {
                    return <ChatMessageComponents {...message} />
                })}
            </Grid>
            <Grid style={{marginTop: 50}} sx={{position: 'sticky'}}>

                <TextField style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 240,
                    width: '87.5%',
                    background: '#fff',
                    //height: 65
                }} placeholder={'enter message...'} className={classes.message_input} value={text}
                           InputProps={{
                               endAdornment: (
                                   <InputAdornment style={{cursor: 'pointer'}} position="end">
                                       <ImageIcon/>
                                   </InputAdornment>
                               ),
                           }}
                           onChange={(e) => {
                               setText(e.target.value)
                           }}
                           onKeyDown={(e) => {
                               if (e.key === 'Enter' &&  text) {
                                   console.log('enter')
                                   dispatch(createMessageThunk({text, dialog_id: id}))
                                   setText('')
                               }
                           }}
                />
            </Grid>
        </Grid>
    )
}

export default Chat;
