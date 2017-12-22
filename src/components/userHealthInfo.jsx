import React, { Component } from 'react'
import './index.less'
import classnames from "classnames";
import AjaxJson from "../utils/ajaxJson"
import { Icon, List, InputItem, Picker, ImagePicker, Button, DatePicker} from 'antd-mobile';
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
    let policy = JSON.parse(sessionStorage.getItem("policy"));
    if(policy.scheduleData) {
      this.setState({
        date: new Date(policy.scheduleData.date),
        orgID: policy.scheduleData.orgID || ""
      })
    }
    if(policy.reportData) {
      this.setState({
        reportData: policy.reportData
      })
    }
  }

  //获取体检机构列表
  getOrgs () {
    const _this = this;
    let url = "/api/institutions";
    let data = {};
    AjaxJson.getResponse(url, data, "GET").then((value) => {
      if(value.status === 2000) {
        value.data.map(el => {
          el.label = el.name;
          el.value = el.orgId;
          return el
        })
        _this.setState({
          orgData: value
        })
      }
    }, (value) => {})
  }

  headerBackClick () {
    window.history.back()
  }

  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  }

  saveClick () {
    const _this = this;
    this.props.form.validateFields((error, value) => {
      if(!error) {
        let url = "/api/policies";  
        let orgID = value.orgID && value.orgID.length !== 0 ? value.orgID[0] : "";
        let date = new Date(this.state.date);
        let scheduleData = {
          date: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
          orgID: orgID
        };
        let reportData = {
          orgID: orgID,
          metadata: {
            weightExponent: value.weightExponent || "",
            bloodpressureExponent: value.bloodpressureExponent || "",
            pulsepressureExponent: value.pulsepressureExponent || "",
            plateletCount: value.plateletCount || "",
            serum: value.serum || ""
          }
        }
        let data = {
          scheduleData,
          reportData
        }
        let policy = JSON.parse(sessionStorage.getItem("policy"))
        policy.scheduleData = scheduleData;
        policy.reportData = reportData;
        sessionStorage.setItem("policy", JSON.stringify(policy))
        window.history.back()
        // AjaxJson.getResponse(url, data, "PUT").then((value) => {
        //   if(value.status === 2000) {
        //     window.history.back()
        //   }
        // }, (value) => {})
      }
      else {    //输入提示

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
          <List renderHeader={() => '个人健康情况'}>
            <InputItem
            {...getFieldProps('weightExponent', {initialValue: this.state.reportData.metadata ? this.state.reportData.metadata.weightExponent : ""},)}
            clear>
              体重指数
            </InputItem>
            <InputItem
            {...getFieldProps('bloodpressureExponent', {initialValue: this.state.reportData.metadata ? this.state.reportData.metadata.bloodpressureExponent : ""})}
            clear>
              血压
            </InputItem>
            <InputItem
            {...getFieldProps('pulsepressureExponent', {initialValue: this.state.reportData.metadata ? this.state.reportData.metadata.pulsepressureExponent : ""})}
            clear>
              脉压
            </InputItem>
            <InputItem
            {...getFieldProps('plateletCount', {initialValue: this.state.reportData.metadata ? this.state.reportData.metadata.plateletCount : ""})}
            clear>
              血小板数
            </InputItem>
            <InputItem
            {...getFieldProps('serum', {initialValue: this.state.reportData.metadata ? this.state.reportData.metadata.serum : ""})}
            clear>
              甘油三酯
            </InputItem>
          </List>
          <List renderHeader={() => '个人健康资料'}>
            <ImagePicker
              className="img-picker"
              onChange={this.onChange.bind(this)}
              files={this.state.files}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={this.state.files.length < 11}
            />
          </List>
          <Button style={{margin: "2rem"}} type="ghost" onClick={this.saveClick.bind(this)}>保存</Button>
        </div>
      </div>
    );
  }
}

export default UserHealthInfo = createForm()(UserHealthInfo);