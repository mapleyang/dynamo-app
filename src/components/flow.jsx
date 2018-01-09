import React, { Component } from 'react'
import './index.less'
import classnames from "classnames";
import { createForm } from 'rc-form';
import AjaxJson from "../utils/ajaxJson"
import { Icon, List, Button, Picker, InputItem, Toast,Checkbox,TextareaItem } from 'antd-mobile';
const Item = List.Item;
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;

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
const agreeContent = "声明：本人承诺完全知晓本人的健康状况，确认健康告知内容属实。如有隐瞒或不实告知，保险公司有权解除保险合同，对于合同解除前发生的任何事故，保险公司不承担任何责任，并不退还保险费。";

class Flow extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      promiseData: [{
        name: "angiocarpy",
        select: false,
        label: "是否存在心血管系统疾病",
        value: "1"
      }, {
        name: "breathing",
        select: false,
        label: "是否存在呼吸系统疾病",
        value: "2"
      }, {
        name: "digestive",
        select: false,
        label: "是否存在消化系统疾病",
        value: "3"
      }, {
        name: "disability",
        select: false,
        label: "是否存在残疾或功能障碍",
        value: "4"
      }],
      price: "",
      timePrice: "",
      base: "",
      promise: "",
      reportData: "",
      timeLabel: "",
      buttonLoading: false
    }
  }

  headerBackClick () {
    window.history.back()
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
    const _this = this;
    this.props.form.validateFields((error, values) => {
      let policy = JSON.parse(sessionStorage.getItem("policy"))
      if(!error) {
        if(policy.product) {
          _this.setState({
            buttonLoading: true
          })
          let url = "/api/policies"; 
          let promise = this.state.promiseData.map(el => {
            let item = {};
            item.result = el.select ? "是" : "否";
            item.content = el.label;
            return item;
          })
          promise.push({
            result: "是",
            content: agreeContent
          })
          let other = {
            result: values.other ? "是" : "",
            content: values.other
          }
          promise.push(other)
          policy.base = {
            holderName: values.holderName,
            holderID: values.holderID,
            holderMobile: values.holderMobile,
            favoreeName: values.favoreeName,
            favoreeID: values.favoreeID
          };
          policy.promise = promise;
          policy.base.timeRange = this.state.timeRange;
          policy.product.price = this.state.price.toString();
          AjaxJson.getResponse(url, policy, "PUT").then((value) => {
            if(value.status === 2000) {
              sessionStorage.removeItem("policyID")
              sessionStorage.setItem("PID", JSON.stringify(value.data.policyID))
              location.hash="/userhealthinfo";
            }
          }, (value) => {
            Toast.info("请求失败", 1)
          })
        }
        else {
          Toast.info("提交无效！！！", 1)
        }
      }
      else {    //输入提示
        Toast.info("请完善投保信息！！！", 1)
      }
    });
  }

  onChange = (val) => {
    let promiseData = this.state.promiseData.map(el => {
      if(el.value === val) {
        el.select = !el.select;
      }
      return el
    });
    this.setState({
      promiseData: promiseData
    })
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
          <List renderHeader={() => '是否曾患有或接受治疗过下列疾病？'}>
            {this.state.promiseData.map(el => (
              <CheckboxItem 
              checked={el.select}
              onChange={() => this.onChange(el.value)}>
                {el.label}
              </CheckboxItem>
            ))}
          </List>
          <List renderHeader={() => '是否有其他疾病？'}>
            <TextareaItem
              rows={5}
              count={100}
              {...getFieldProps('other')}
              placeholder="请描述您的患病情况..."
            />
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
           <AgreeItem 
           {...getFieldProps('agreeContent', { rules: [{ required: true, message: '请同意相关条款' }]})}
          className="agree-content" data-seed="statementId">
            {agreeContent}
          </AgreeItem>
          <Button loading={this.state.buttonLoading} style={{margin: "2rem"}} type="ghost" onClick={this.saveClick.bind(this)}>提交</Button>
        </div>
      </div>
    );
  }
}

export default Flow = createForm()(Flow);