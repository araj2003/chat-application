import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { avatarRoute } from '../utils/url';
import axios from 'axios';
import { Buffer } from 'buffer';
import styled from 'styled-components';
import { useContext } from 'react'
import { userContext } from '../context/userContext'

const SetAvatar = () => {
    const { user, isLogin } = useContext(userContext)
    const api = 'https://api.multiavatar.com'
    const navigate = useNavigate()
    const [avatars, setAvatars] = useState([])
    const [selectedAvatar, setselectedAvatar] = useState(undefined)
    const toastOptions = {
        position: 'bottom-right',
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    };

    useEffect(async() => {
        if(!isLogin){
            navigate('/login')
        }
    },[isLogin])

    const setProfilePicture = async () => {
        if(selectedAvatar === undefined){
            toast.error(
                'Please select an avatar',
                toastOptions
            )
        }
        else{
            
            const {data} = await axios.post(`${avatarRoute}/${user._id}`,
                {image:avatars[selectedAvatar]}
            )
            if(data.isSet){
                user.is_avatar = true;
                user.profile_pic = data.image
            }
            else{
                toast.error(
                    'Error setting avatar please try again',
                    toastOptions
                )
            }
        }
        
    }

    useEffect(async () => {
        const data = [];
        for (let i = 0; i < 4; i++) {
            const image = await axios.get(
                `${api}/${Math.round(Math.random() * 1000)}`
            )
            const buffer = new Buffer(image.data)
            data.push(buffer.toString('base64'))
        }
        setAvatars(data)
    }, [])
    return (
        <>
            <Container>
                <div>Pick an avatar as your profile picture</div>
                <div className='avatar'>
                    {
                        avatars.map((avatar,index) => {
                            return (
                                <div
                                    className={`avatar ${
                                        selectedAvatar === index ? "selected":""
                                    }`}
                                    key = {index}
                                >   
                                    <img 
                                        src={`data:image/svg+xml;base64,${avatar}`} 
                                        alt="avatar" 
                                        onClick={() => setselectedAvatar(index)}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <button className = 'button' onClick={setProfilePicture}>set as profile picture</button>
            </Container>
            <ToastContainer />
        </>
    )
}

const Container = styled.div`
display:flex
justify-content:center;
align-items:center;

.avatar{
    display:flex;
    border:0.4rem solid transparent;
    gap:4rem;
    img{
        height:6rem;
        background:black
    }
    .selected{
        background:blue
        
    }
}
.button{
    display:flex;
    background:yellow;
    text:white;
    border-radius:0.3rem;
    border-color:purple;
    padding:4px;
}

`;

export default SetAvatar