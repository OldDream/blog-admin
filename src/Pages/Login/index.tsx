import React, { useState } from 'react';
import { Button, Card, Input, Icon, Spin } from 'antd';
import './login.scss'

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleUsernameInput(e: any) {
    setUserName(e.target.value)
    console.log(e.target.value);
  }
  function handlePasswordInput(e: any) {
    setPassword(e.target.value)
    console.log(e.target.value);
  }
  function checkLogin(e: any) {
    console.log({userName,password});
    setIsLoading(true)
    setTimeout(() => {
    setIsLoading(false)
    }, 3000);
  }

  return (
    <div className="login-div">
      <Spin tip="Loading..." spinning={isLoading} wrapperClassName="spin-div">
        <Card title="HYN's Blog Admin Page" bordered={true} className="login-card">
          <Input
            // onChange={(e)=> {console.log(e.target.value);}}
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
          <br /><br />
          <Button type="primary" size="large" block onClick={checkLogin}>
            提交
          </Button>
        </Card>
      </Spin>
    </div>
  );
}

export default Login;
