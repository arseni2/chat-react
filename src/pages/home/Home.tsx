import React from 'react';
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {List} from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {NavLink} from "react-router-dom";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    link: {
        textDecoration: 'none',
        display: 'flex',
        color: 'black',
        alignItems: 'center'
    }
})

const Home = () => {
    const classes = useStyles()
    return (
        <Drawer
            sx={{
                width: 240,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: 240,
                    boxSizing: "border-box"
                }
            }}
            variant="permanent"
            anchor="left"
        >
            <List>
                <NavLink to={'/chats'} className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <ChatIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Chats'}/>
                    </ListItem>
                </NavLink>
                <NavLink to={'/new_chat'} className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <ChatIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'New Chat'}/>
                    </ListItem>
                </NavLink>
                <NavLink to={'/profile'} className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <AccountCircleIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Profile'}/>
                    </ListItem>
                </NavLink>
            </List>
            <Divider/>
            <List>
                <NavLink to={'/settings'} className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <SettingsIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Settings'}/>
                    </ListItem>
                </NavLink>
                <NavLink to={'/logout'} className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <ExitToAppIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Log out'}/>
                    </ListItem>
                </NavLink>
            </List>
        </Drawer>
    )
        ;
};

export default Home;