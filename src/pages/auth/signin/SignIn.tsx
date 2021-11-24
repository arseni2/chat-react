import React from 'react';
import {Button, CircularProgress, Grid, Typography} from "@mui/material";
import {Formik} from "formik";
import {NavLink} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import * as Yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType} from "../../../redux/store";
import {loginThunk, UserLoginCondition} from "../../../redux/reducers/loginReducer";
import {getAuthReducerCondition, getCondition, getError} from "../../../redux/selectors/selectors";
import {useIsAuthRedirect} from "../../../service/HOOKS/hooks";
import FieldComponent from "../../../components/signUp/FieldComponent";

const useStyles = makeStyles({
    signup_title: {
        fontFamily: 'Robotot',
        fontWeight: 700,
        fontSize: 46,
        textAlign: 'center',
        margin: '0px 0px 30px 0px'
    },
    signup_form: {
        display: 'flex',
        justifyContent: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    form_field: {
        marginTop: 20,
    },
    form_button: {
        width: '50%',
    },
})
const SignInSchemaValidation = Yup.object().shape({
    pass: Yup.string().required('Required field').min(4, 'минимальная длина 4 символа'),
    name: Yup.string().required('Required field').min(4, 'минимальная длина 4 символа'),
})
export type errorFieldsType = string | boolean | undefined

const SignIn = () => {
    const dispatch = useDispatch<AppDispatchType>()
    useIsAuthRedirect(dispatch)
    const classes = useStyles()
    const condition = useSelector(getCondition)
    const error = useSelector(getError)
    const conditionAuth = useSelector(getAuthReducerCondition)
    if(conditionAuth === 'loading') {
        return <CircularProgress />
    }
    return (
        <Grid style={{textAlign: 'center'}}>
            <Grid>
                <p className={classes.signup_title}>
                    Sign In
                </p>
            </Grid>
            <Grid className={classes.signup_form}>
                <Formik
                    initialValues={{pass: '', name: ''}}
                    onSubmit={(values) => {
                        dispatch(loginThunk(values))
                    }}
                    validationSchema={SignInSchemaValidation}
                >
                    {({handleSubmit, handleBlur, handleChange, errors, touched, values}) => {
                        const isErrorFieldName: errorFieldsType = errors.name && touched.name
                        const isErrorFieldPass: errorFieldsType = errors.pass && touched.pass
                        const isEmptyFields: boolean = !(Boolean(values.pass) && Boolean(values.name))
                        return <form onSubmit={handleSubmit} className={classes.form}>
                            <FieldComponent
                                error={Boolean(isErrorFieldName)}
                                name='name'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder={'enter name...'}
                                label={'name'}
                                errors={errors}
                                touched={touched}
                            />
                            <FieldComponent
                                error={Boolean(isErrorFieldPass)}
                                name='pass'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder={'enter pass...'}
                                label={'pass'}
                                errors={errors}
                                touched={touched}
                            />
                            <Grid style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: 20
                            }}>
                                <Button
                                    disabled={Boolean(isErrorFieldName) || Boolean(isErrorFieldPass) || isEmptyFields}
                                    type='submit' style={{textTransform: 'initial'}} className={classes.form_button}
                                    >Sign In</Button>
                            </Grid>
                        </form>
                    }}
                </Formik>
            </Grid>
            <Grid style={{display: 'flex', justifyContent: 'center'}}>
                <Typography>
                    if already account to go
                </Typography>
                <NavLink to={'/register'} style={{marginLeft: 4, color: '#1041EF', textDecoration: 'none'}}>
                    <Typography>Sign up</Typography>
                </NavLink>
            </Grid>
            <Grid style={{color: 'red', marginTop: 30}}>
                {condition === UserLoginCondition.error ? <p>{error}</p> : <></>}
                {condition === UserLoginCondition.loading ? <CircularProgress/> : <> </>}
            </Grid>
        </Grid>
    );
};

export default SignIn;