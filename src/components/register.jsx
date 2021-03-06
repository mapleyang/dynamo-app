import React, { Component } from 'react'
import './index.less'
import AjaxJson from "../utils/ajaxJson"
import classnames from "classnames";
import { Icon, List, InputItem, Button, Toast  } from 'antd-mobile';
import { createForm } from 'rc-form';
import md5 from "md5";
const Item = List.Item;
class Register extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      loginVisble: false
    }
  }

  componentDidMount () {
  }

  headerBackClick () {
    window.history.back()
  }

  registerClick () {
    const _this = this;
    this.props.form.validateFields((error, value) => {
      if(!error) {
        let url = "/api/register";  
        let timestamp = Date.now();
        let data = {
          mobile: value.mobile.replace(/\s+/g,""),
          email: value.email.trim(),
          password: md5(value.password),
        };
        AjaxJson.getResponse(url, data, "PUT").then((value) => {
           if(value.status === 2000) {
            window.history.back();
           }
           else {
              Toast.fail('注册请求失败！！！', 1);
           }
        }, (value) => {})
      }
      else {    //输入提示
        Toast.fail('请输入注册信息！！！', 1);
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
          <div className="header-content">注册</div>
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
               type="phone"
                {...getFieldProps('mobile', {
                  rules: [{ required: true, message: '请输入手机号' }],
                })}
                placeholder="请输入手机号"
              >
                <div style={{ backgroundImage: 'url(./static/Phone.svg)', backgroundSize: 'cover', height: '22px', width: '22px' }} />
              </InputItem>
              <InputItem
                type="password"
                {...getFieldProps('password', {
                  rules: [{ required: true, message: '请设置您的密码' }],
                })}
                placeholder="请设置您的密码"
              >
                <div style={{ backgroundImage: 'url(./static/password.svg)', backgroundSize: 'cover', height: '22px', width: '22px' }} />
              </InputItem>
            </List>
            <Button type="primary" size="small" className={classnames({
              "login-button": true,
              "login-button-disabel": this.state.loginVisble
            })} onClick={this.registerClick.bind(this)}>注册</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Register = createForm()(Register);