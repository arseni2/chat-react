import { CircularProgress, Grid, Typography } from "@mui/material";
import React, { useState } from 'react';
import { useSelector } from "react-redux";
import FriendItemComponent from "../../../components/friendItem/FriendItemComponent";
import SearchInputComponent from "../../../components/searchInput/SearchInputComponent";
import { userType } from "../../../redux/reducers/authReducer";
import { UserLoginCondition } from "../../../redux/reducers/loginReducer";
import { getUsers, getUsersCondition } from "../../../redux/selectors/selectors";
import { useUsersSearchInfiniteScroll } from "../../../service/HOOKS/hooks";


const NewChats = () => {
    const [q, setQ] = useState('')
    const condition = useSelector(getUsersCondition)
    useUsersSearchInfiniteScroll(condition, q)
    let users = useSelector(getUsers)
    return (
        <Grid style={{ marginLeft: 240 }}>
            <SearchInputComponent 
            //@ts-ignore
            onDebouncingChange={(value) => {setQ(value)}} placeholder={'Search users...'} />
                {users.map((user: userType, i: number) => {
                    return <FriendItemComponent key={i} {...user} />
                })}
            {condition === UserLoginCondition.loading ? <CircularProgress /> : null}
            {users.length === 0 && condition === UserLoginCondition.success && <Typography>по вашему запросу ничего не найдено</Typography>}
        </Grid>
    );
};

export default NewChats