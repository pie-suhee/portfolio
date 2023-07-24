import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'

import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Button, Input, Typography } from 'antd'

import '../../../css/layout.css'

const { Title } = Typography

function LoginPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
        .then(response => {
            if (response.payload.loginSuccess) {
                navigate('/')
            } else {
                alert('Error˝')
            }
        })
    }

    return (
        <div className='layout UserLayout'>
            <Title level={2}>Log In</Title>

            <form className='form' onSubmit={onSubmitHandler}>
                <ul>
                    <li>
                        <Input
                            className='input'
                            prefix={<UserOutlined />}
                            placeholder="Enter your email"
                            type="email"
                            value={Email}
                            onChange={onEmailHandler}
                        />
                    </li>
                    <li>
                        <Input
                            className='input'
                            prefix={<LockOutlined />}
                            placeholder="Enter your password"
                            type="password"
                            value={Password}
                            onChange={onPasswordHandler}
                        />
                    </li>
                    <li>
                        <Button type="primary" size="large" htmlType="submit">
                            Log in
                        </Button>
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default LoginPage
