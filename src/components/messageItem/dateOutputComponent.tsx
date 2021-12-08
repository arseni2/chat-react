import { Typography } from '@mui/material'
import React from 'react'
import moment from 'moment'
import 'moment/locale/ru';
moment().format('LT')

export const DateOutputComponent = (props: { date: Date }) => {
    let a = moment(new Date())
    let b = props.date    
    let time;
    if(a.diff(b, 'days', true) <= 1) {
        time = 'вчера'
        //return day
    } if (a.diff(b, 'days', true) <= 0.5) {
        time = moment(b).format('LT')
        //return time
    } if(a.diff(b, 'days', true) > 1) {
        time = moment(b).locale('ru').format('DD/MM/YYYY')
        //return date 
    }
    return (
        <Typography>
            {time}
        </Typography>
    )
}
