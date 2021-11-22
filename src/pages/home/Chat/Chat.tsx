import {Avatar, Divider, Grid, IconButton, InputAdornment, TextField, Typography} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, {useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import ChatMessageComponents from "../../../components/chatMessage/ChatMessageComponents";
import ImageIcon from '@mui/icons-material/Image';

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
    const [text, setText] = useState('')
    const classes = useStyles()
    const history = useHistory()
    let {id}: UrlParamsType = useParams()
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
                    <Avatar style={{width: 50, height: 50}}>
                        gg
                    </Avatar>
                    <Grid className={classes.header_user_info}>
                        <p className={classes.header_user_name}>
                            Egor Piros
                        </p>
                        <Typography className={classes.header_user_status}>
                            online
                            <div style={{
                                width: 7,
                                height: 7,
                                background: '#42FF00',
                                marginLeft: 10,
                                borderRadius: 100
                            }}></div>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Divider/>
            <Grid style={{paddingBottom: 100}}>
                <ChatMessageComponents/>
                <ChatMessageComponents/>
                <ChatMessageComponents/>
                <ChatMessageComponents/>
                <ChatMessageComponents/>
                <ChatMessageComponents/>
                <ChatMessageComponents/>
                <ChatMessageComponents/>
                <ChatMessageComponents/>
                <ChatMessageComponents/>
                <ChatMessageComponents/>
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
                           onChange={(e)=>{setText(e.target.value)}}
                           onKeyDown={(e)=>{
                               if(e.key === 'Enter'){
                                   console.log('value',text);
                               }
                           }}
                />
            </Grid>
        </Grid>
    )
}

export default Chat;
