import React, {useEffect, useState} from 'react';
import {CircularProgress, Grid} from "@mui/material";
import SearchInputComponent from "../../../components/searchInput/SearchInputComponent";
import FriendItemComponent from "../../../components/friendItem/FriendItemComponent";
import {usersPaginationThunk} from "../../../redux/reducers/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType} from "../../../redux/store";
import {getUsers, getUsersCondition, getUsersPaginationTotalCount} from "../../../redux/selectors/selectors";
import {UserLoginCondition} from "../../../redux/reducers/loginReducer";

const NewChats = () => {
    const totalCount = useSelector(getUsersPaginationTotalCount)
    const condition = useSelector(getUsersCondition)
    const users = useSelector(getUsers)
    const dispatch = useDispatch<AppDispatchType>()
    const [fetching, setFetching] = useState(false)
    const [page, setPage] = useState(1)
    const scrollHandler = (e: any) => {
        if (e.target.documentElement.scrollHeight - (window.innerHeight + e.target.documentElement.scrollTop) < 200 && users.length < totalCount && condition !== UserLoginCondition.loading ) {
            setFetching(true)
        }
    }
    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return () => {
            document.removeEventListener('scroll', scrollHandler)
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalCount, users, condition])
    useEffect(() => {
        dispatch(usersPaginationThunk({page: page}))
        setPage((prevState => prevState + 1))
        setFetching(false)
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetching])
    return (
        <Grid style={{marginLeft: 240}} onScroll={(e) => {
        }}>
            <SearchInputComponent placeholder={'Search users...'}/>
            {users.map((user, i) => {
                return <FriendItemComponent key={i} {...user} />
            })}
            {condition === UserLoginCondition.loading && <CircularProgress />}
        </Grid>
    );
};

export default NewChats