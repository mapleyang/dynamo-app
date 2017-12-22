import React, { Component } from 'react'
import './index.less'
import classnames from "classnames";
import AjaxJson from "../utils/ajaxJson"
import { Icon, List ,Checkbox, TextareaItem, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
const Item = List.Item;
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;
const agreeContent = "声明：本人承诺完全知晓本人的健康状况，确认健康告知内容属实。如有隐瞒或不实告知，保险公司有权解除保险合同，对于合同解除前发生的任何事故，保险公司不承担任何责任，并不退还保险费。";


class HealthInfo extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      promise: "",
      desc: "",
      data: [{
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
    }
  }

  componentWillMount () {
    let policy = JSON.parse(sessionStorage.getItem("policy"));
    if(policy.promise) {
      let tempPolicy = [];
      let data = this.state.data.map(el => {
        if(policy.promise && policy.promise.length !== 0) {
          tempPolicy = policy.promise.map(item => {
            if(el.label === item.content) {
              el.select = item.result === "是" ? true : false;
              item.flag = true;
            }
            return item
          })
        }
        return el
      })
      let desc = "";
      tempPolicy.forEach(el => {
        if(!el.flag && el.content !== agreeContent) {
          desc = el.content;
        }
      })
      this.setState({
        promise: policy.promise,
        data: data,
        desc: desc
      })
    }
  }

  componentDidMount () {
    // this.getHealthInfo();
  }

  headerBackClick () {
    window.history.back()
  }

  onChange = (val) => {
    let data = this.state.data.map(el => {
      if(el.value === val) {
        el.select = !el.select;
      }
      return el
    });
    this.setState({
      data: data
    })
  }

  saveClick () {
    const _this = this;
    this.props.form.validateFields((error, value) => {
      if(!error) {
        let promise = this.state.data.map(el => {
          let item = {};
          item.result = el.select ? "是" : "否";
          item.content = el.label;
          return item;
        })
        promise.push({
          result: "是",
          content: agreeContent
        })
        if(value.other !== undefined) {
          promise.push({
            result: "是",
            content: value.other
          })
        }
        else {
          promise.push({
            result: "是",
            content: value.other
          })
        }
        let url = "/api/policies";  
        let data = {
          promise: promise
        }
        let policy = JSON.parse(sessionStorage.getItem("policy"))
        policy.promise = promise;
        sessionStorage.setItem("policy", JSON.stringify(policy))
        window.history.back()
        // AjaxJson.getResponse(url, data, "PUT").then((value) => {
        //   if(value.status = 2000) {
        //     // window.history.back()
        //   }
        // }, (value) => {})
      }
      else {    //输入提示
        Toast.fail('请详细阅读声明，请选择同意！！！', 1);
      }
    });
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className="flow">
        <div className="header flow-header">
          <div className="header-back" onClick={this.headerBackClick.bind(this)}>
            <Icon type="left" size="lg" />
          </div>
          <div className="header-content">保险健康告知</div>
        </div>
        <div className="flow-content tab-content">
          <List renderHeader={() => '是否曾患有或接受治疗过下列疾病？'}>
            {this.state.data.map(el => (
              <CheckboxItem 
              {...getFieldProps(el.name)}
              checked={el.select}
              onChange={() => this.onChange(el.value)}>
                {el.label}
              </CheckboxItem>
            ))}
          </List>
          <List renderHeader={() => '是否有其他疾病？'}>
            <TextareaItem
              {...getFieldProps('other', {initialValue: this.state.desc ? this.state.desc : ""}, {
              })}
              rows={5}
              count={100}
              placeholder="请描述您的患病情况..."
            />
          </List>
          <AgreeItem 
          {...getFieldProps("agreeItem", {
            rules: [{ required: true, message: '请选择是否同意声明条款' }],
          })}
          className="agree-content" data-seed="statementId">
            {agreeContent}
          </AgreeItem>
          <Button style={{margin: "2rem"}} type="ghost" onClick={this.saveClick.bind(this)}>保存</Button>
        </div>
      </div>
    );
  }
}

export default HealthInfo = createForm()(HealthInfo);