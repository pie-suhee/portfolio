import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action'

import { Button, Input, Typography } from 'antd'

import '../../../css/layout.css'

const { Title } = Typography

function RegisterPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")


    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (Password !== ConfirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }

        let body = {
            email: Email,
            password: Password,
            name: Name
        }

        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    navigate('/login')
                } else {
                    alert('Error˝')
                }
            })
    }



    return (
        <div className='layout UserLayout'>
            <Title level={2}>Sign Up</Title>
            <form className='form' onSubmit={onSubmitHandler}>
                <ul>
                    <li>
                        <label>Name</label>
                        <Input
                            placeholder="Enter your name"
                            type="text"
                            value={Name}
                            onChange={onNameHandler}
                        />
                    </li>
                    
                    <li>
                        <label>Email</label>
                        <Input
                            placeholder="Enter your email"
                            type="email"
                            value={Email}
                            onChange={onEmailHandler}
                        />
                    </li>
                    <li>
                        <label>Password</label>
                        <Input
                            placeholder="Enter your password"
                            type="password"
                            value={Password}
                            onChange={onPasswordHandler}
                        />
                    </li>
                    <li>
                        <label>Confirm</label>
                        <Input
                            placeholder="Enter your confirmPassword"
                            type="password"
                            value={ConfirmPassword}
                            onChange={onConfirmPasswordHandler}
                        />
                    </li>
                    <li>
                        <Button type="primary" size="large" htmlType="submit">
                            Sign up
                        </Button>
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default RegisterPage
