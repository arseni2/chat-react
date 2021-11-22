import React from 'react';
import {TextField, Typography} from "@mui/material";

const FieldComponent = (props: any) => {
    return (<>
        <TextField
            {...props}
            style={{marginTop: 20}}
            type={'text'}
        />
        {
            props.errors[props.name] && props.touched[props.name] ?
                <Typography style={{color: 'red'}}>{props.errors[props.name]}</Typography>
                : null
        }
    </>)
}

export default FieldComponent;