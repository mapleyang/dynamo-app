import React, { Component } from 'react'
import './index.less'
import classnames from "classnames";
import { createForm } from 'rc-form';
import AjaxJson from "../utils/ajaxJson"
import { Icon, List, Button, Picker, InputItem, Toast } from 'antd-mobile';
const Item = List.Item;

const district = [{
  label: "一年",
  value: "1",
  price: 10000
},{
  label: "两年",
  value: "2",
  price: 20000
},{
  label: "五年",
  value: "5",
  price: 50000
},{
  label: "十年",
  value: "10",
  price: 100000
},{
  label: "三十年",
  value: "30",
  price: 300000
}]

class Flow extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      data: ['', '', ''],
      price: "",
      timePrice: "",
      base: "",
      promise: "",
      reportData: "",
      timeLabel: ""
    }
  }

  componentWillMount () {
    let policy = JSON.parse(sessionStorage.getItem("policy"))
    let base = "";
    let promise = "";
    let reportData = "";
    if(policy.base) {
      base = policy.base;
    }
    if(policy.promise) {
      promise = policy.promise;
    }
    if(policy.reportData) {
      reportData = policy.reportData;
    }
    this.setState({
      base: base,
      promise: promise,
      reportData: reportData
    })
    if(sessionStorage.getItem("policyID")) {
      this.gatePolicyInfo();
    }
  }

  //获取待提交保单列表
  gatePolicyInfo (id) {
    let url = `/api/policies${id}/detail`; 
    let data = {};
    AjaxJson.getResponse(url, data, "GET").then((value) => {
      if(value.status = 2000) {

      }
    }, (value) => {})
  }

  headerBackClick () {
    window.history.back()
  }

  infoFillClick (value) {
    location.hash = "/" + value;
  }

  timeRangeChange (value) {
    district.forEach(el => {
      if(value[0] === el.value) {
        this.setState({
          price: el.price,
          timeRange: el.value,
          timeLabel: el.label
        })   
      }
    })
  }

  saveClick () {
    let policy = JSON.parse(sessionStorage.getItem("policy"))
    if(policy.base && policy.promise && this.state.price) {
      let url = "/api/policies"; 
      policy.base.timeRange = this.state.timeRange;
      policy.product.price = this.state.price.toString();
      AjaxJson.getResponse(url, policy, "PUT").then((value) => {
        if(value.status = 2000) {
          sessionStorage.removeItem("policyID")
        }
      }, (value) => {})
    }
    else {
      Toast.info("请完善投保信息！！！", 1)
    }
  }


  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className="flow">
        <div className="header flow-header">
          <div className="header-back" onClick={this.headerBackClick.bind(this)}>
            <Icon type="left" size="lg" />
          </div>
          <div className="header-content">信息填写</div>
        </div>
        <div className="flow-content tab-content">
          <List className="my-list" renderHeader={() => '个人信息'}>
            <Item arrow="horizontal" extra={this.state.base ? this.state.base.holderName : ""} onClick={this.infoFillClick.bind(this, "baseinfo")}>
              投保人信息
            </Item>
            <Item
              arrow="horizontal"
              extra={this.state.promise ? "已完成" : ""}
              onClick={this.infoFillClick.bind(this, "healthinfo")}>
              健康告知
            </Item>
            <Item
              arrow="horizontal"
              extra={this.state.reportData ? "已完成" : ""}
              onClick={this.infoFillClick.bind(this, "userhealthinfo")}>
              健康数据
            </Item>
          </List>
          <List renderHeader={() => '保险信息'}>
            <Picker 
              data={district} 
              extra={this.state.timeLabel}
              cols={1} 
              onOk={this.timeRangeChange.bind(this)}>
              <List.Item arrow="horizontal">保险时常</List.Item>
            </Picker>
            <Item extra={this.state.price + "元"}>保险费用</Item>
          </List>
          <Button style={{margin: "2rem"}} type="ghost" onClick={this.saveClick.bind(this)}>提交</Button>
        </div>
      </div>
    );
  }
}

export default Flow = createForm()(Flow);