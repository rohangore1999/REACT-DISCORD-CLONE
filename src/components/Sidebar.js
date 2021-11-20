import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddIcon from '@material-ui/icons/Add'
import SidebarChannel from './SidebarChannel'
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import CallIcon from '@material-ui/icons/Call'
import MicIcon from '@material-ui/icons/Mic'
import HeadsetIcon from '@material-ui/icons/Headset'
import SettingsIcon from '@material-ui/icons/Settings'
import { Avatar } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import db, { auth } from '../firebase'

function Sidebar() {
    // to get data which is store in redux
    const user = useSelector(selectUser)
    const [channels, setChannels] = useState([]) //empty array; we will store list of channels


    useEffect(() => {
        // whenever there is change in db[delete,add,move.. etc]; snapshot will send all the document inside channel collection in realtime
        db.collection('channels').onSnapshot((snapshot) => {
            // as onSnapshot will return data in array; so to acess we will use map(); append it to channels array
            setChannels(
                snapshot.docs.map((doc) => (
                    {
                        id: doc.id,
                        channel: doc.data(), /* data.doc() is all the property/data which are associate with particular doc[document] */
                    })
                ))
        }
        )
    }, []);


    // in func it will ask user for prompt input; if user enter channelName then it will automatically create "channels" collection and add user entered data in channelName field
    const handleAddchannel = () => {
        const channelName = prompt("Enter Channel Name")

        if (channelName) {
            db.collection("channels").add({
                channelName: channelName
            })
        }
    }

    console.log("CHANNELS>>>", { channels })

    return (
        <div className="sidebar">
            <div className="sidebar_top">
                <h3>Clone World</h3>
                <ExpandMoreIcon />
            </div>

            <div className="sidebar_channels">
                <div className="sidebar_channelsheader">
                    <div className="sidebar_header">
                        <ExpandMoreIcon />
                        <h4>Text Channels</h4>
                    </div>

                    {/* when user click on add button; function calls */}
                    <AddIcon onClick={handleAddchannel} className="sidebar_addChannel" />
                </div>

                <div className="sidebar_channelsList">
                    {/* in each channel we have id and channel in json format */}
                    {/* so we destructure the channel into id and channel */}
                    {channels.map((channel) => (
                        // console.log("channel>>>", channel.id, channel.channel.channelName)
                        <SidebarChannel key={channel.id} id={channel.id} channelName={channel.channel.channelName} />
                    ))}

                </div>
            </div>

            <div className="sidebar_voice">
                <SignalCellularAltIcon className="sidebar_voiceIcon" fontSize="large" />

                <div className="sidebar_voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>

                <div className="sidebar_voiceIcons">
                    <InfoOutlinedIcon />
                    <CallIcon />
                </div>
            </div>

            <div className="sidebar_profile">
                {/* auth.signOut() >> with logout user from google site; so because of that user's value change then from App.js useEffect will run as and as there is no user then dispatch(logout()) [line:47] will run */}

                <Avatar onClick={() => { auth.signOut() }} src={user.photo} /> {/* user which we stored in redux data layer; from that we take photo */}
                <div className="sidebar_profileInfo">
                    <h3>{user.displayName}</h3>
                    <p>#{user.uid.substring(0, 5)}</p> {/* to get only 4 chars */}
                </div>

                <div className="sidebar_profileIcons">
                    <MicIcon />
                    <HeadsetIcon />
                    <SettingsIcon />
                </div>
            </div>


        </div>
    )
}

export default Sidebar
