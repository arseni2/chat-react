import React from 'react'

export const OnlineComponent = (props: { isOnline: boolean | null }) => {
    const {isOnline} = props
    if(isOnline) {
        return (
            <>
                online
                <div style={{ width: 7, height: 7, background: '#42FF00', marginLeft: 10, borderRadius: 100 }}></div>
            </>
        )
    } else {
        return (
            <>
            offline
            <div style={{ width: 7, height: 7, background: '#C4C4C4', marginLeft: 10, borderRadius: 100 }}></div>
            </>
        )
    }
}
