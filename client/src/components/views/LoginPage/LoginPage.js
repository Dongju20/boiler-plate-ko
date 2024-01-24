import React, { useState } from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import Axios from 'axios'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';

function LoginPage(){
  const dispatch = useDispatch();

  const onFinish = (values) =>{
      let body = {
        email: values.Email,
        password: values.Password
      }
      console.log(loginUser(body));
      dispatch(loginUser(body))
    

     
  }
    return(
        <div  style={{display: 'flex', justifyContent: 'center', alignItems: 'center'
        , width: '100%', height: '100vh'
        }}>
        <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    autoComplete="off"
    onFinish={onFinish}
  >
    <Form.Item
      label="Email"
      name="Email"
      rules={[
        {
          type: 'email',
          required: true,
          message: 'Please input your email!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="Password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  </div>
    )
}

export default LoginPage