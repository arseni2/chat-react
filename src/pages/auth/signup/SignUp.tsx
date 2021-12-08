import React, {useState} from 'react';
import {Button, CircularProgress, Grid, ThemeProvider, Typography} from "@mui/material";
import {makeStyles} from '@mui/styles'
import {Formik} from 'formik';
import {NavLink} from 'react-router-dom';
import {theme} from "../../../theme";
import * as Yup from "yup";
import {errorFieldsType} from "../signin/SignIn";
import {registerThunk} from "../../../redux/reducers/registerReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, AppStateType} from "../../../redux/store";
import {UserLoginCondition} from "../../../redux/reducers/loginReducer";
import {useIsAuthRedirect} from "../../../service/HOOKS/hooks";
import {getAuthReducerCondition} from "../../../redux/selectors/selectors";
import FieldComponent from "../../../components/signUp/FieldComponent";
import {getErrorRegister, getConditionRegister} from '../../../redux/selectors/selectors'


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
        fontFamily: 'Robotot',
        fontWeight: 700
    },
    form_descr: {

    }
})
const SignUpSchemaValidation = Yup.object().shape({
    email: Yup.string().required('Required field email').email('почта введена не коректно'),
    pass: Yup.string().required('Required field pass').min(4, 'минимальная длина 4 символа'),
    confirmPass: Yup.string().required('Required field passConfirm').oneOf([Yup.ref('pass'), null], 'парли не совпадают').min(4, 'минимальная длина 4 символа'),
    lastName: Yup.string().required('Required field lastname').min(4, 'минимальная длина 4 символа'),
    name: Yup.string().required('Required field name').min(4, 'минимальная длина 4 символа'),

})
const SignUp = () => {
    const conditionAuth = useSelector(getAuthReducerCondition)
    const dispatch = useDispatch<AppDispatchType>()
    useIsAuthRedirect(dispatch)
    const [file, setFile] = useState<FileList | null>(null)
    const classes = useStyles()
    const condition = useSelector(getConditionRegister) //если будет ошибка то мб проблема тут
    const error = useSelector(getErrorRegister) //если будет ошибка то мб проблема тут
    if(conditionAuth === 'loading') {
        return <CircularProgress />
    }
    return (
        <Grid style={{textAlign: 'center'}}>
            <Grid>
                <h6 className={classes.signup_title}>
                    Sign Up
                </h6>
            </Grid>
            <Grid className={classes.signup_form}>
                <Formik
                    initialValues={{email: '', pass: '', confirmPass: '', name: '', lastName: ''}}
                    onSubmit={(values) => {
                        dispatch(registerThunk({...values, avatar: file}))
                    }}
                    validationSchema={SignUpSchemaValidation}
                >
                    {({handleSubmit, handleBlur, handleChange, errors, touched, values}) => {
                        const isErrorFieldName: errorFieldsType = errors.name && touched.name
                        const isErrorFieldPass: errorFieldsType = errors.pass && touched.pass
                        const isErrorFieldPassConfirm: errorFieldsType = errors.confirmPass && touched.confirmPass
                        const isErrorFieldLastName: errorFieldsType = errors.lastName && touched.lastName
                        const isErrorFieldEmail: errorFieldsType = errors.email && touched.email
                        const isEmptyFields: boolean = !(Boolean(values.pass) && Boolean(values.name) && Boolean(values.lastName) && Boolean(values.confirmPass) && Boolean(values.email))
                        const isDisabled = Boolean(isErrorFieldName) || Boolean(isErrorFieldPass) || isEmptyFields || Boolean(isErrorFieldLastName) || Boolean(isErrorFieldEmail)
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
                                error={Boolean(isErrorFieldLastName)}
                                name='lastName'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder={'enter lastname...'}
                                label={'lastname'}
                                errors={errors}
                                touched={touched}
                            />
                            <FieldComponent
                                error={Boolean(isErrorFieldEmail)}
                                name='email'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder={'enter email...'}
                                label={'email'}
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
                            <FieldComponent
                                error={Boolean(isErrorFieldPassConfirm)}
                                name='confirmPass'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder={'enter passConfirm...'}
                                label={'passConfirm'}
                                errors={errors}
                                touched={touched}
                            />
                                <Button style={{marginTop: 20}} color="secondary" variant="contained" component="label">
                                    <input
                                        style={{ display: 'none' }}
                                        name="file"
                                        type="file"
                                        onChange={(e)=>{
                                            console.log(e.target.files)
                                            setFile(e.target.files)
                                        }}
                                    />
                                    Upload button
                                </Button>{/*add dropzone*/}
                            <Grid style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: 20,
                            }}>
                                <ThemeProvider theme={theme}>
                                    <Button disabled={isDisabled} type='submit' style={{textTransform: 'initial'}} className={classes.form_button}>Sign Up</Button>
                                </ThemeProvider>
                            </Grid>
                        </form>
                    }}
                </Formik>
            </Grid>
            <Grid style={{display: 'flex', justifyContent: 'center'}}>
                <Typography className={classes.form_descr}>
                    if already account to go
                </Typography>
                <ThemeProvider theme={theme}>
                    <NavLink to={'/login'} style={{marginLeft: 4, color: '#1041EF', textDecoration: 'none'}}>
                        <ThemeProvider theme={theme}>
                            <Typography  style={{fontFamily: 'Robotot', fontWeight: 700}}>Log in</Typography>
                        </ThemeProvider>
                    </NavLink>
                </ThemeProvider>
            </Grid>
            <Grid style={{color: 'red', marginTop: 30}}>
                {condition === UserLoginCondition.error ? <p>{error}</p> : <></>}
                {condition === UserLoginCondition.loading ? <CircularProgress/> : <> </>}
            </Grid>
        </Grid>
    );
};

export default SignUp;