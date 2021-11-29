import React, { useState } from 'react';
import {Grid, InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {makeStyles} from "@mui/styles";
import {TextFieldProps} from "@mui/material/TextField/TextField";
import _ from 'lodash';

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
    const [value, setValue] = useState('')
    let setValueDebounced = _.debounce(setValue, 500)
    //@ts-ignore
    props.onDebouncingChange && props.onDebouncingChange(value)
    const classes = useStyles()
    return (
        <Grid style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <TextField
                placeholder={props.placeholder}
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
                onChange={(e)=>{setValueDebounced(e.target.value)}}
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