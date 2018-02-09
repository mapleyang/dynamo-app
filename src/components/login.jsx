import React, { Component } from 'react'
import './index.less'
import AjaxJson from "../utils/ajaxJson"     
import classnames from "classnames";
import { Icon, List, InputItem, Button, Toast  } from 'antd-mobile';
import { createForm } from 'rc-form';
import md5 from "md5";
const Item = List.Item;


class Login extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      data: ['', '', ''],
      loginVisble: false
    }
  }

  componentDidMount () {
  }

  headerBackClick () {
    window.history.back()
  }

  registerClick () {
    location.hash = "/register"
  }

  loginClick () {
    const _this = this;
    this.props.form.validateFields((error, value) => {
      if(!error) {
        let url = "/api/login";  
        let timestamp = Date.now();
        let data = {
          email: value.email,
          password: md5(value.password),
        };
        AjaxJson.getResponse(url, data, "POST").then((value) => {
          if(value.status === 2000) {
            if(value.data.token) {
              sessionStorage.setItem("user", value);
              location.hash = "/"
            }
          }
          else {
            Toast.fail('登陆失败！！！', 1);
          }
        }, (value) => {})
      }
      else {    //输入提示
        Toast.fail('请输入您的邮箱、密码', 1);
      }
    });
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className="login">
        <div className="header flow-header">
          <div className="header-back" onClick={this.headerBackClick.bind(this)}>
            <Icon type="left" size="lg" />
          </div>
          <div className="header-content">登录</div>
          <div className="register-content">
            <span onClick={this.registerClick.bind(this)}>我要注册</span>
          </div>
        </div>
        <div className="login-content tab-content">
          <div className="login-form">
            <List renderHeader={() => ''}>
               <InputItem
                {...getFieldProps('email', {
                    rules: [{ required: true, message: '请输入您的邮箱' }],
                  })}
                placeholder="请输入您的邮箱"
              >
                <div style={{ backgroundImage: 'url(./static/email.svg)', backgroundSize: 'cover', height: '22px', width: '22px' }} />
              </InputItem>
              <InputItem
                type="password"
                {...getFieldProps('password', {
                  rules: [{ required: true, message: '请输入您的密码' }],
                })}
                placeholder="请输入密码"
              >
                <div style={{ backgroundImage: 'url(./static/password.svg)', backgroundSize: 'cover', height: '22px', width: '22px' }} />
              </InputItem>
            </List>
            <Button type="primary" size="small" className={classnames({
              "login-button": true,
              "login-button-disabel": this.state.loginVisble
            })} onClick={this.loginClick.bind(this)}>登录</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login = createForm()(Login);