import React from 'react';
import {Grid, InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {makeStyles} from "@mui/styles";
import {TextFieldProps} from "@mui/material/TextField/TextField";

const useStyles = makeStyles({
    message_input: {
        background: '#E8EAEE',
        width: 1000,
        display: 'flex',
        justifyContent: 'center',
        '&::placeholder': {
            color: '#000000',
        },
    }
})

const SearchInputComponent = (props: TextFieldProps) => {
    const classes = useStyles()
    return (
        <Grid style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <TextField
                placeholder={'Search message...'}
                {...props}
                className={classes.message_input}
                inputProps={{
                    className: classes.message_input,
                    style: {
                        color: '#000000',
                        opacity: 1,
                        fontWeight: 700,
                        fontFamily: 'Robotot',
                    },

                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </Grid>
    );
};

export default SearchInputComponent;