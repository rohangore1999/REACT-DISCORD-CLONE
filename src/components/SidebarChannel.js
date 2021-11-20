import React from 'react'
import { useDispatch } from 'react-redux'
import { setChannelInfo } from '../features/appSlice'
import './SidebarChannel.css'

function SidebarChannel({ id, channelName }) {
    // to store the channel data with the help of "setChannelInfo"
    const dispatch = useDispatch(setChannelInfo)


    return (
        // when I click on particular channel I want to store that channel i redux; so that I can see messages under those channelName
        <div className="sidebarChannel" onClick={() => {
            dispatch(
                setChannelInfo(
                    {
                        channelId: id,
                        channelName: channelName
                    }))
        }}>
            <h4><span className="sidebarChannel_hash">#</span>{channelName}</h4>
        </div>
    )
}

export default SidebarChannel
