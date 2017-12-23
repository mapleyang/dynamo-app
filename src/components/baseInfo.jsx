import React, { Component } from 'react'
import './index.less'
import classnames from "classnames";
import AjaxJson from "../utils/ajaxJson"
import { Icon, List, InputItem, Button, Toast  } from 'antd-mobile';
import { createForm } from 'rc-form';
const Item = List.Item;


class BaseInfo extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      data: ['', '', ''],
      base: ""
    }
  }

  componentWillMount () {
    let policy = JSON.parse(sessionStorage.getItem("policy"));
    if(policy.base) {
      this.setState({
        base: policy.base
      })
    }
  }

  headerBackClick () {
    window.history.back()
  }

  saveClick () {
    const _this = this;
    this.props.form.validateFields((error, value) => {
      if(!error) {
        let url = "/api/policies";  
        let base = value;
        let data = {
          base
        };
        let policy = JSON.parse(sessionStorage.getItem("policy"))
        policy.base = value;
        sessionStorage.setItem("policy", JSON.stringify(policy))
        window.history.back()
        // AjaxJson.getResponse(url, data, "PUT").then((value) => {
        //   if(value.status = 2000) {
        //   }
        // }, (value) => {})
      }
      else {    //输入提示
        Toast.info("请完善投保人信息", 1)
      }
    });
  }

  render() {
    const { getFieldProps } = this.props.form;
    let data = {
      holderName: "test"

    }
    return (
      <div className="flow">
        <div className="header flow-header">
          <div className="header-back" onClick={this.headerBackClick.bind(this)}>
            <Icon type="left" size="lg" />
          </div>
          <div className="header-content">信息填写</div>
        </div>
        <div className="flow-content tab-content">
          <List>
            <InputItem
            {...getFieldProps('holderName', 
              {initialValue: this.state.base ? this.state.base.holderName : "",
              rules: [{ required: true, message: '请输入投保人姓名' }]})}
            clear>
              投保人姓名
            </InputItem>
            <InputItem
            {...getFieldProps('holderID', {initialValue: this.state.base ? this.state.base.holderID : "",
              rules: [{ required: true, message: '请输入投保人姓名' }]})}
            clear>
              投保人证件
            </InputItem>
            <InputItem
            {...getFieldProps('holderMobile', {initialValue: this.state.base ? this.state.base.holderMobile : "",
              rules: [{ required: true, message: '请输入投保人姓名' }]})}
            clear>
              投保人电话
            </InputItem>
            <InputItem
            {...getFieldProps('favoreeName', {initialValue: this.state.base ? this.state.base.favoreeName : "",
              rules: [{ required: true, message: '请输入投保人姓名' }]})}
            clear>
              受益人姓名
            </InputItem>
            <InputItem
            {...getFieldProps('favoreeID',  {initialValue: this.state.base ? this.state.base.favoreeID : "",
              rules: [{ required: true, message: '请输入投保人姓名' }]})}
            clear>
              受益人证件
            </InputItem>
          </List>
          <Button style={{margin: "2rem"}} type="ghost" onClick={this.saveClick.bind(this)}>保存</Button>
        </div>
      </div>
    );
  }
}

export default BaseInfo = createForm()(BaseInfo);