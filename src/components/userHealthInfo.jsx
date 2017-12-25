import React, { Component } from 'react'
import './index.less'
import classnames from "classnames";
import AjaxJson from "../utils/ajaxJson"
import { Icon, List, InputItem, Picker, Button, DatePicker, Toast} from 'antd-mobile';
import { createForm } from 'rc-form';
const Item = List.Item;
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

class UserHealthInfo extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      date: now,
      data: ['', '', ''],
      orgID: "",
      files: [],
      reportData: {},
      orgData: [{
        label: "北京知春路分店",
        value: "100001",
      },{
        label: "北京上地分店",
        value: "100002",
      },{
        label: "北京中关村分店",
        value: "100003",
      }],
    }
  }

  componentWillMount () {
    this.getOrgs();
  }

  //获取体检机构列表
  getOrgs () {
    const _this = this;
    let url = "/api/institutions";
    let data = {};
    AjaxJson.getResponse(url, data, "GET").then((value) => {
      if(value.status === 2000) {
        let orgData = value.data.map(el => {
          el.label = el.Record.name;
          el.value = el.Record.orgId;
          return el
        })
        _this.setState({
          orgData: orgData
        })
      }
    }, (value) => {})
  }

  headerBackClick () {
    window.history.back()
  }

  saveClick () {
    const _this = this;
    this.props.form.validateFields((error, value) => {
      let PID = JSON.parse(sessionStorage.getItem("PID"))
      if(!error && PID) {
        let url = `/api/policies/schedule/${PID}`;  
        let orgID = value.orgID && value.orgID.length !== 0 ? value.orgID[0] : "";
        let orgValue = "";
        this.state.orgData.forEach(el => {
          if(el.value === orgID) {
            orgValue = el;
          }
        })
        let date = new Date(this.state.date);
        let scheduleData = {
          date: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
          orgID: orgID,
          orgName: orgValue || orgValue.label,
          orgAddress: orgValue || orgValue.address
        };
        AjaxJson.getResponse(url, scheduleData, "PUT").then((value) => {
          if(value.status === 2000) {
            location.hash="/policydetail";
          }
        }, (value) => {})
      }
      else {    
        //输入提示
        Toast.info("提交无效", 1)
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
          <div className="header-content">健康情况填写</div>
        </div>
        <div className="flow-content tab-content">
          <List renderHeader={() => '体检服务(若无健康数据请参与体检)'}>
            <Picker 
              data={this.state.orgData} 
              cols={1} 
              {...getFieldProps('orgID', {
                initialValue: [this.state.orgID || ""],
              })}>
              <List.Item arrow="horizontal">体检机构</List.Item>
            </Picker>
            <DatePicker
              mode="date"
              title="选择日期"
              value={this.state.date}
              onChange={date => this.setState({ date })}>
              <List.Item arrow="horizontal">体检日期</List.Item>
            </DatePicker>
          </List>
          <Button style={{margin: "2rem"}} type="ghost" onClick={this.saveClick.bind(this)}>提交</Button>
        </div>
      </div>
    );
  }
}

export default UserHealthInfo = createForm()(UserHealthInfo);