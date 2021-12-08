import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getAuthUserDataThunk } from "../../redux/reducers/authReducer";
import { UserLoginCondition } from "../../redux/reducers/loginReducer";
import { set_user, usersPaginationSearchThunk } from "../../redux/reducers/usersReducer";
import { getAuth, getUsersLength, getUsersPaginationTotalCount } from "../../redux/selectors/selectors";
import { AppDispatchType } from "../../redux/store";

export const useIsAuthRedirect = (dispatch: AppDispatchType) => {
    useEffect(() => {
        dispatch(getAuthUserDataThunk())
        // eslint-disable-next-line
    }, [])
    const isAuth = useSelector(getAuth)
    const history = useHistory()
    isAuth && history.push('/profile')
}

export const useUsersSearchInfiniteScroll = (condition: UserLoginCondition, q: string) => {
    if(!q) q = ' '
    const totalCount = useSelector(getUsersPaginationTotalCount)
    const usersLength = useSelector(getUsersLength)
    const dispatch = useDispatch<AppDispatchType>()
    const [fetching, setFetching] = useState(false)
    const [page, setPage] = useState(1)
    const scrollHandler = (e: any) => {
        if (e.target.documentElement.scrollHeight - (window.innerHeight + e.target.documentElement.scrollTop) < 1500 && usersLength < totalCount && condition !== UserLoginCondition.loading) {
            setFetching(true)
        }
    }
    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return () => {
            document.removeEventListener('scroll', scrollHandler)
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalCount, condition, usersLength])
    useEffect(() => {
        setPage(prevState => prevState + 1)
        setFetching(false)
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetching])
    useEffect(()=>{
        if(page <= 1 && q) {

        } else {
            dispatch(usersPaginationSearchThunk({page, q}))
        }
    }, [page])
    useEffect(()=>{
        if(q) {
            dispatch(set_user())
            if(page > 1) { 
                setPage(1)
            }
            dispatch(usersPaginationSearchThunk({page: 1, q}))
        }
    }, [q])
    //eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => () => { dispatch(set_user()) }, [])
}
export const useQuery = () => {
    const { search } = useLocation()
    return useMemo(() => new URLSearchParams(search), [search])
  }
