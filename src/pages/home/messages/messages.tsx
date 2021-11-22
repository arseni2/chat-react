import React from 'react';
import {Divider, Grid} from "@mui/material";
import MessageItem from "../../../components/messageItem/messageItemComponent";
import SearchInputComponent from "../../../components/searchInput/SearchInputComponent";


const Messages = () => {
    return (
        <Grid style={{marginLeft: 240}}>
            <SearchInputComponent onChange={(e)=>{
                console.log(e.target.value)
            }}/>
            <Divider sx={{marginTop: 1}} />
            <MessageItem />
            <MessageItem />
            <MessageItem />
        </Grid>
    );
};

export default Messages;