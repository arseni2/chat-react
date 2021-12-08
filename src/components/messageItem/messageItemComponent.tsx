import { Avatar, Divider, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from 'react';
import { NavLink } from 'react-router-dom';
import { dialogType } from '../../api/dialog';
import { DateOutputComponent } from "./dateOutputComponent";


const useStyles = makeStyles((theme) => ({
        message_text: {
            color: '#667182',
            textDecoration: 'none'
        },
        message_name: {
            fontWeight: 700,
            fontFamily: 'Robotot',
            margin: 0,
            textDecoration: 'none',
            color: '#000'
        },
        message_time: {
            color: '#667182',
            paddingRight: 15,
            paddingTop: 5,
            textDecoration: 'none'
        },
        container: {
            marginTop: 10,
            transition: 'background .3s',
            '&:hover': {
                background: '#eaeaea'
            },
            cursor: 'pointer',
        }
    }
))

const MessageItem = (props: dialogType) => {
    const classes = useStyles()
    return (
        <NavLink to={`/chats/${props._id}`}>
            <Grid className={classes.container}>
                <Divider style={{marginBottom: 5}}/>
                <Grid style={{display: 'flex'}}>
                    <Grid>
                        <Avatar style={{width: 50, height: 50}}>
                            gg
                        </Avatar>
                    </Grid>

                    <Grid style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                        <Grid marginLeft={1}>
                            <Typography>
                                <p className={classes.message_name}>
                                    {props.partner && props.partner.name}
                                </p>
                            </Typography>
                            <Typography className={classes.message_text}>
                                some message body
                            </Typography>
                        </Grid>

                        <Grid>
                            <Typography className={classes.message_time}>
                                <DateOutputComponent date={props.updatedAt} />
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider style={{marginTop: 5}}/>
            </Grid>
        </NavLink>
    );
};

export default MessageItem;