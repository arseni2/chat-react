import {useSelector} from "react-redux";
import {getAuth} from "../../redux/selectors/selectors";
import {useHistory} from "react-router-dom";
import {AppDispatchType} from "../../redux/store";
import {useEffect} from "react";
import {getAuthUserDataThunk} from "../../redux/reducers/authReducer";

export const useIsAuthRedirect = (dispatch: AppDispatchType) => {
    useEffect(()=>{
        dispatch(getAuthUserDataThunk())
        // eslint-disable-next-line
    }, [])
    const isAuth = useSelector(getAuth)
    const history = useHistory()
    isAuth && history.push('/profile')
}