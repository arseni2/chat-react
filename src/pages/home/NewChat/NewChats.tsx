import { CircularProgress, Grid } from "@mui/material";
import React from 'react';
import { useSelector } from "react-redux";
import FriendItemComponent from "../../../components/friendItem/FriendItemComponent";
import SearchInputComponent from "../../../components/searchInput/SearchInputComponent";
import { UserLoginCondition } from "../../../redux/reducers/loginReducer";
import { getUsersCondition } from "../../../redux/selectors/selectors";
import { useUsersInfiniteScroll } from "../../../service/HOOKS/hooks";


const NewChats = () => {  
    const condition = useSelector(getUsersCondition)
    let users = useUsersInfiniteScroll(condition) 
    return (
        <Grid style={{ marginLeft: 240 }}>
            <SearchInputComponent placeholder={'Search users...'} />
            {users.length === 0 ? <CircularProgress /> :
                users.map((user, i) => {
                    return <FriendItemComponent key={i} {...user} />
                })}
                {condition === UserLoginCondition.loading && users.length !== 0 && <CircularProgress />}
        </Grid>
    );
};

export default NewChats