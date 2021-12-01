import SearchIcon from "@mui/icons-material/Search";
import { Grid, InputAdornment, TextField } from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField/TextField";
import { makeStyles } from "@mui/styles";
import lodash from 'lodash';
import React, { useState } from 'react';
import { useQuery } from "../../service/HOOKS/hooks";

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
    const query = useQuery()
    const [value, setValue] = useState('')
    let setValueDebounced = lodash.debounce(setValue, 350)
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