/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const [Beforecurrent, setBeforeCurrent] = useState('')
  const [Aftercurrent, setAfterCurrent] = useState('')

  const onClickHandler = () => {
    axios.get(`/api/users/logout`)
        .then(response => {
            if (response.data.success) {
                navigate('/login')
            } else {
                alert('로그아웃 하는데 실패 했습니다.')
            }
        })
  }

  const Beforeitems = [
    {
      label: (
        <a href="/login">Log in</a>
      ),
      key: 'mail',
    },
    {
      label: (
        <a href="/register">Sign up</a>
      ),
      key: 'app',
    },
  ]
  
  const Afteritems = [
    {
      label: (
        <a href="/video/upload">Upload</a>
      ),
      key: 'create',
    },
    {
      label: (
        <a onClick={onClickHandler}>Logout</a>
      ),
      key: 'logout',
    },
  ]

  const onBeforeClick = (e) => {
    console.log('click ', e);
    setBeforeCurrent(e.key);
  };

  const onAfterClick = (e) => {
    console.log('click ', e);
    setAfterCurrent(e.key);
  };


  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu onClick={onBeforeClick} selectedKeys={[Beforecurrent]} mode="horizontal" items={Beforeitems} />
    )
  } else {
    return (
      <Menu onClick={onAfterClick} selectedKeys={[Aftercurrent]} mode="horizontal" items={Afteritems} />
    )
  }
}

export default RightMenu