import React from 'react';
import { CircularProgress, Divider, Grid, Typography } from "@mui/material";
import MessageItem from "../../../components/messageItem/messageItemComponent";
import SearchInputComponent from "../../../components/searchInput/SearchInputComponent";
import { useDispatch, useSelector } from "react-redux"
import { AppDispatchType } from '../../../redux/store';
import { getDialogsThunk, set_redirect } from '../../../redux/reducers/dialogReducer';
import { getConditionDialog, getDialogsDialog } from '../../../redux/selectors/selectors';


const Messages = () => {
    const dispatch = useDispatch<AppDispatchType>()
    React.useEffect(() => {
        dispatch(set_redirect(false))
        dispatch(getDialogsThunk())
    }, [])
    const condition = useSelector(getConditionDialog)
    const dialogs = useSelector(getDialogsDialog)
    return (
        <Grid style={{ marginLeft: 240 }}>
            <SearchInputComponent placeholder='Search messages...' />
            <Divider sx={{ marginTop: 1 }} />
            {condition === "loading" && <CircularProgress />}
            {condition === "success" && Array.from(dialogs).map((item, i)=>{
                return <MessageItem {...item} />
            })}
            {condition === "error" && <Typography>что-то пошло не так</Typography>}
        </Grid>
    );
};

export default Messages;