import {useDispatch, useSelector} from "react-redux";
import {getAuth, getUsers, getUsersPaginationTotalCount} from "../../redux/selectors/selectors";
import {useHistory} from "react-router-dom";
import {AppDispatchType} from "../../redux/store";
import {useEffect, useState} from "react";
import {getAuthUserDataThunk, userType} from "../../redux/reducers/authReducer";
import {UserLoginCondition} from "../../redux/reducers/loginReducer";
import {set_user, usersPaginationThunk} from "../../redux/reducers/usersReducer";

export const useIsAuthRedirect = (dispatch: AppDispatchType) => {
    useEffect(()=>{
        dispatch(getAuthUserDataThunk())
        // eslint-disable-next-line
    }, [])
    const isAuth = useSelector(getAuth)
    const history = useHistory()
    isAuth && history.push('/profile')
}

export const useUsersInfiniteScroll = (condition: UserLoginCondition): Array<userType> => {
    const totalCount = useSelector(getUsersPaginationTotalCount)
    const users = useSelector(getUsers)
    const dispatch = useDispatch<AppDispatchType>()
    const [fetching, setFetching] = useState(false)
    const [page, setPage] = useState(1)
    const scrollHandler = (e: any) => {
        if (e.target.documentElement.scrollHeight - (window.innerHeight + e.target.documentElement.scrollTop) < 700 && users.length < totalCount && condition !== UserLoginCondition.loading ) {
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
    //eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=> ()=>{dispatch(set_user())}, [])
    return users
}