import React from 'react';
import {Avatar, Divider, Grid, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";


const useStyles = makeStyles((theme)=>({
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
        }
    }
))
const FriendItemComponent = () => {
    const classes = useStyles()
    return (
        <Grid className={classes.container}>
            <Divider style={{marginBottom: 5}}/>
            <Grid style={{display: 'flex'}}>
                <Grid>
                    <Avatar style={{width: 50, height: 50}}>
                        gg
                    </Avatar>
                </Grid>

                <Grid>
                    <Grid marginLeft={1}>
                        <Typography>
                            <p className={classes.message_name}>
                                Egor Piros
                            </p>
                        </Typography>
                        <Typography className={classes.message_text}>
                            online
                            <div style={{width: 7, height: 7, background: '#42FF00', marginLeft: 10, borderRadius: 100}}>
                            </div>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Divider style={{marginTop: 5}}/>
        </Grid>
    );
};

export default FriendItemComponent;
