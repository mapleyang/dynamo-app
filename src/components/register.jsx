import React, { Component } from 'react'
import './index.less'
import AjaxJson from "../utils/ajaxJson"
import classnames from "classnames";
import { Icon, List, InputItem, Button  } from 'antd-mobile';
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
          mobile: value.mobile,
          password: md5(value.password),
          timestamp: timestamp,
          verfiyCode: "",
          sig: md5(value.mobile + value.password + timestamp)
        };
        AjaxJson.getResponse(url, data, "PUT").then((value) => {
          window.history.back();
        }, (value) => {})
      }
      else {    //输入提示

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
               type="phone"
                {...getFieldProps('mobile', {
                  rules: [{ required: true, message: '请输入手机号' }],
                })}
                placeholder="请输入手机号"
              >
                <div style={{ backgroundImage: 'url(./user.svg)', backgroundSize: 'cover', height: '22px', width: '22px' }} />
              </InputItem>
              <InputItem
                type="password"
                {...getFieldProps('password', {
                  rules: [{ required: true, message: '请设置您的密码' }],
                })}
                placeholder="请设置您的密码"
              >
                <div style={{ backgroundImage: 'url(./password.svg)', backgroundSize: 'cover', height: '22px', width: '22px' }} />
              </InputItem>
            </List>
            <Button type="ghost" className={classnames({
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