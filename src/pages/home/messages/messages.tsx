import React from 'react';
import {Divider, Grid} from "@mui/material";
import MessageItem from "../../../components/messageItem/messageItemComponent";
import SearchInputComponent from "../../../components/searchInput/SearchInputComponent";


const Messages = () => {
    return (
        <Grid style={{marginLeft: 240}}>
            <SearchInputComponent placeholder='Search messages...' />
            <Divider sx={{marginTop: 1}} />
            <MessageItem />
            <MessageItem />
            <MessageItem />
        </Grid>
    );
};

export default Messages;