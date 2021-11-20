import React, { useEffect, useState } from 'react'
import './Chat.css'
import ChatHeader from './ChatHeader'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard'
import GifIcon from '@material-ui/icons/Gif'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions'
import Message from './Message'
import { useSelector } from 'react-redux'
import { setChannelId, setChannelName } from '../features/appSlice'
import db from '../firebase'

// to convert timestamp to servertime stamp
import firebase from 'firebase'
import { selectUser } from '../features/userSlice'

function Chat() {
    // to pull user data to store along with message
    const user = useSelector(selectUser)


    // to pull data which is store in appSlice{channelId, channelName} from Redux-datalayer
    const ChannelId = useSelector(setChannelId)
    const ChannelName = useSelector(setChannelName)

    // to take input message from user in usestate
    const [input, setinput] = useState('')


    // to store messages in array
    const [messages, setmessages] = useState([]) //initially blank array


    console.log("ChannelId>>>", ChannelId)
    console.log("ChannelName>>>", ChannelName)


    // when the chat.js load we will PULL the DATA from DATABASE and store to messages array
    useEffect(() => {
        // under channels collection[DB]; under the channelName which we have clicked under messages sort by timestamp in desc... will return array and after pulling that data.... iterating save messages of db and appending it to messages => doc.data()
        if (ChannelId) {
            // as the flow in cloud firebase ~ https://console.firebase.google.com/u/0/project/discord-clone-de39b/firestore/data/~2Fchannels~2Fp9XkGbIYMdVdpx6oe6mr

            // channels -> channel_id -> messages

            // it will pull that messages data from database to messages array
            db.collection('channels').doc(ChannelId).collection('messages').orderBy('timestamp', 'desc').onSnapshot(
                (snapshot) => (
                    setmessages(
                        snapshot.docs.map(
                            (doc) => doc.data()
                        )
                    )
                )
            )
        }
    }, [ChannelId])


    // after hitting enter on types message, it will add message to database under particular channelId
    const sendMessage = (e) => {
        e.preventDefault()

        // as the flow in cloud firebase ~ https://console.firebase.google.com/u/0/project/discord-clone-de39b/firestore/data/~2Fchannels~2Fp9XkGbIYMdVdpx6oe6mr
        // channels -> channel_id -> messages

        // it will add message to database under particular channelId
        db.collection('channels').doc(ChannelId).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user,
            message: input
        })

        // after submitting the input, set input to blank
        setinput("")
    }

    console.log("MESSAGES >>>> ", messages)

    return (
        <div className="chat">
            {/* chatheader */}
            <ChatHeader ChannelId={ChannelId} ChannelName={ChannelName} />

            <div className="chat_messages">
                {/* iterating over all messages array */}

                {messages.map((message) => (
                    <Message key={message.timestamp}  timestamp={message.timestamp} message={message.message} user={message.user} />
                    // console.log("Message >>> ", message)
                ))}

            </div>

            <div className="chat_input">
                <AddCircleIcon fontSize="large" />
                <form>
                    <input disabled={!ChannelName} value={input} onChange={(e) => {
                        setinput(e.target.value)
                    }} placeholder={`Message #${ChannelName ? ChannelName : ''}`} />

                    {/* type is submit because we will hide the button and when user press enter then only message submit */}
                    <button onClick={sendMessage} className="chat_inputButton" disabled={!ChannelName} type="submit">Send Message</button>
                </form>

                <div className="chat_inputIcon">
                    <CardGiftcardIcon fontSize="large" />
                    <GifIcon fontSize="large" />
                    <EmojiEmotionsIcon fontSize="large" />
                </div>
            </div>
        </div>
    )
}

export default Chat
