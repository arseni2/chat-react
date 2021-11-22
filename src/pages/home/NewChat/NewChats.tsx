import React from 'react';
import {Grid} from "@mui/material";
import SearchInputComponent from "../../../components/searchInput/SearchInputComponent";
import FriendItemComponent from "../../../components/friendItem/FriendItemComponent";

const NewChats = () => {
    return (
        <Grid style={{marginLeft: 240}}>
            <SearchInputComponent placeholder={'Search users...'} />
            <FriendItemComponent />
            <FriendItemComponent />
        </Grid>
    );
};

export default NewChats