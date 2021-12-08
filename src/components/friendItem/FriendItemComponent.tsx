import { Avatar, Divider, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from 'react';
import { useDispatch } from 'react-redux';
import { userType } from "../../redux/reducers/authReducer";
import { createDialogsThunk } from '../../redux/reducers/dialogReducer';
import { AppDispatchType } from '../../redux/store';
import { OnlineComponent } from '../online/OnlineComponent';


const useStyles = makeStyles((theme) => ({
    message_text: {
        color: '#667182',
        display: 'flex',
        alignItems: 'center'
    },
    message_name: {
        fontWeight: 700,
        fontFamily: 'Robotot',
        margin: 0,
    },
    message_time: {
        color: '#667182',
        paddingRight: 15,
        paddingTop: 5
    },
    container: {
        marginTop: 10,
        transition: 'background .3s',
        '&:hover': {
            background: '#eaeaea'
        },
        cursor: 'pointer',
    },
}
))
export function hasWhiteSpace(s: null | string ) {
    if(s) {
        return s.indexOf(' ') >= 0;
    } else {
        return false
    }
}// вынести куда-нибудь
const FriendItemComponent = (props: userType) => {
    const dispatch = useDispatch<AppDispatchType>()
    const classes = useStyles()
    return (
        <Grid className={classes.container}>
            <Divider style={{ marginBottom: 5 }} />
            <Grid style={{ display: 'flex' }} onClick={()=>{dispatch(createDialogsThunk({user_id: props._id}))}}>
                <Grid>
                    <Avatar src={hasWhiteSpace(props.avatar) ? 'default image' : `http://localhost:8000/uploads/userImages/${props.avatar}`} style={{ width: 50, height: 50 }}>

                    </Avatar>
                </Grid>

                <Grid>
                    <Grid marginLeft={1}>
                        <Typography>
                            <p className={classes.message_name}>
                                {props.name}
                            </p>
                        </Typography>
                        <Typography className={classes.message_text}>
                            <OnlineComponent isOnline={props.isOnline} />
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Divider style={{ marginTop: 5 }} />
        </Grid >
    );
};

export default FriendItemComponent;
