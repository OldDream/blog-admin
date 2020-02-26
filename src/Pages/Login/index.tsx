import React, { useState } from 'react';
import { Button, Card, Input, Icon, Spin, message } from 'antd';
import axios from '../../utils/axios';
import './login.scss';

function Login(props: any) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleUsernameInput(e: any) {
    setUserName(e.target.value);
    console.log(e.target.value);
  }
  function handlePasswordInput(e: any) {
    setPassword(e.target.value);
    console.log(e.target.value);
  }
  function checkLogin(e: any) {
    setIsLoading(true);
    if (!userName) {
      message.error('用户名不能为空！');
      setIsLoading(false);
      return false;
    } else if (!password) {
      message.error('密码不能为空！');
      setIsLoading(false);
      return false;
    }
    axios
      .post('/admin/checkLogin', {
        userName,
        password
      })
      .then(res => {
        console.log(res);
        let data = res.data;
        setIsLoading(false);
        if (data.success === true) {
          sessionStorage.setItem('openId', data.openId);
          props.history.push('/index');
        } else {
          message.error('用户名或密码错误！');
        }
      })
      .catch(err => {
        console.log('error!');
        console.log(err);
        setIsLoading(false);
      });
  }

  return (
    <div className="login-div">
      <Spin tip="Loading..." spinning={isLoading} wrapperClassName="spin-div">
        <Card
          title="HYN's Blog Admin Page"
          bordered={true}
          className="login-card"
        >
          <Input
            onChange={handleUsernameInput}
            id="userName"
            size="large"
            value={userName}
            placeholder="请输入用户名"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
          <br />
          <br />
          <Input.Password
            onChange={handlePasswordInput}
            id="password"
            size="large"
            value={password}
            placeholder="请输入密码"
            prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
          <br />
          <br />
          <Button type="primary" size="large" block onClick={checkLogin}>
            提交
          </Button>
        </Card>
      </Spin>
    </div>
  );
}

export default Login;
