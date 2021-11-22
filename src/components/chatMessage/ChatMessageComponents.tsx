import {Avatar, Grid, Typography} from '@mui/material';
import React from 'react';
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    message: {
        display: 'flex',
        marginTop: 20,
        marginLeft: 10
    },
    message_user: {
        display: 'flex',
        width: '100%'
    },
    message_user_name: {
        margin: 0,
        fontFamily: 'Robotot',
        fontWeight: 700,
        marginRight: 30
    },
    message_time: {
        color: '#667182',
    },
    message_item_container: {
        width: 400
    },
    message_item_container_text: {
        wordWrap: 'break-word',
        fontSize: '16px',
        fontFamily: 'Robotot',
        fontWeight: 'normal',
        margin: 0,
        marginTop: 2
    }
})

const ChatMessageComponents = (props: any) => {
    const classes = useStyles()
    return (
        <Grid className={classes.message}>
            <Grid>
                <Avatar sx={{width: 50, height: 50}}>
                    gg
                </Avatar>
            </Grid>
            <Grid style={{marginLeft: 10, width: 400}}>
                <Grid className={classes.message_user}>
                    <p className={classes.message_user_name}>
                        Egor Piros
                    </p>
                    <Typography className={classes.message_time}>
                        00:00
                    </Typography>
                </Grid>
                <p className={classes.message_item_container_text}>
                    gello ggg hahahahha gello ggg hahahahha gello ggg hahahahha gello ggg hahahahha gello ggg hahahahha gello ggg hahahahha gello ggg hahahahha gello ggg hahahahha gello ggg hahahahha gello ggg hahahahha gello ggg hahahahha gello ggg hahahahha
                </p>
            </Grid>
        </Grid>
    )
}

export default ChatMessageComponents;