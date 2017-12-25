import React, { Component } from 'react'
import './index.less'
import classnames from "classnames";
import { createForm } from 'rc-form';
import AjaxJson from "../utils/ajaxJson"
import { Icon, Button, Card, List } from 'antd-mobile';
const Item = List.Item;

const detail = {
  "id": "1000001",
  category: "001",
  "title": "太健康·百万全家桶",
  "img": "insurance0",
  "age": "90天至60周岁",
  "time": "1年",
  "content": "住院医疗保险金，100万/人特许医疗"
}

class PolicyDetail extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      detail: ""
    }
  }

  componentWillMount () {
    let PID = JSON.parse(sessionStorage.getItem("PID"))
    this.getPolicyDetail(PID);
  }

  componentWillUnmount () {
    sessionStorage.removeItem("PID")
  }

  //获取保单交易详情
  getPolicyDetail (id) {
    const _this = this;
    let url = `/api/policies/${id}`;
    AjaxJson.getResponse(url, "", "GET").then((value) => {
      if(value.status === 2000) {
        _this.setState({
          detail: value.data
        })
      }
    }, (value) => {})
  }

  headerBackClick () {
    window.history.back()
  }

  getDetailContent () {
    let content = "";
    if(this.state.detail) {
      content = <Card>
        <Card.Header
          title={this.state.detail.product.title}
          thumb="./static/insurance0.jpg"/>
        <Card.Body>
          <List renderHeader={() => '区块链保单'}>
            <Item>区块链凭证</Item>
            <Item multipleLine align="top" wrap>
               <p>保单凭证：{this.state.detail.baseinfo.policyID}</p>
               <p>签章凭证：{this.state.detail.signature.hash}</p>
            </Item>
            <Item>保单信息</Item>
            <Item multipleLine align="top" wrap>
              <p>投保单号：{this.state.detail.baseinfo.transactionID}</p>
              <p>投保人姓名：{this.state.detail.baseinfo.policyHolderName}</p>
              <p>投保人证件：{this.state.detail.baseinfo.policyID}</p>
              <p>投保人手机：{this.state.detail.baseinfo.policyHolderMobile}</p>
              <p>受益人姓名：{this.state.detail.baseinfo.favoreeName}</p>
              <p>受益人证件：{this.state.detail.baseinfo.favoreeID}</p>
              <p>保险时长：{this.state.detail.baseinfo.timeRange}年</p>
              <p>保单状态：{this.state.detail.baseinfo.transactionDesc}</p>
              <p>保单费用：{this.state.detail.product.price}</p>
            </Item>
            <Item>产品介绍</Item>
            <Item multipleLine align="top" wrap>
              {this.state.detail.product.content}
            </Item>
          </List>
        </Card.Body>
        <Card.Footer extra={<div style={{color: "#199ed8"}}>保险条款详情</div>} />
      </Card>
    }
    return content
  }

  render() {
    return (
      <div className="flow">
        <div className="header flow-header">
          <div className="header-back" onClick={this.headerBackClick.bind(this)}>
            <Icon type="left" size="lg" />
          </div>
          <div className="header-content">保单详情</div>
        </div>
        <div className="flow-content tab-content">
          {this.getDetailContent()}
        </div>
      </div>
    );
  }
}

export default PolicyDetail;