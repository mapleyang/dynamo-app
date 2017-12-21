import React, { Component } from 'react'
import './index.less';
import AjaxJson from "../utils/ajaxJson"
import classnames from "classnames";
import { Flex, Badge, Tabs } from 'antd-mobile';

class Policy extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      data: [{
        order: "132413515",
        policyOrder: "143567646",
        name: "太健康·百万全家桶",
        content: "住院医疗保险金，100万/人特许医疗",
        applyName: "mapple",
        benefitName: "mapple",
        expense: "1万元",
        claimsExpenses: "100万元"
      }]
    }
  }

  componentWillMount () {
    this.getPoliciesList()
  }

  //保单列表查询
  getPoliciesList () {
    const _this = this;
    let url = "/api/policies";
    let data = {
      offset: 0,
      limit: 20,
      category: ""
    }
    AjaxJson.getResponse(url, data, "GET").then((value) => {
      if(value.status = 2000) {
        _this.setState({
          data: value.data
        })
      }
    }, (value) => {})
  }

  render() {
    const tabs = [
      { title: '未完成保单' },
      { title: '已完成保单' }];


    return (
      <div className="policy">
        <div className="header">
          保单
        </div>
        <div className="policy-list tab-content">
          <Tabs tabs={tabs}>
            <div className="policy-area">
              {this.state.data.map(el => {
                return <div className="policy-order">
                  <div className="order-title">
                    <div className="order-title-name">{el.name}</div>
                    <div className="order-title-intr">
                      <span className="order-title-content">{el.content}</span>
                      <span style={{float: "right"}}>未完成</span>
                    </div>
                  </div>
                  <div className="order-content">
                    <div className="order-item"><span>投保单号：</span><span>{el.order}</span></div>
                    <div className="order-item"><span>保险单号：</span><span>{el.policyOrder}</span></div>
                    <div className="order-item"><span>投保人姓名：</span><span>{el.applyName}</span></div>
                    <div className="order-item"><span>受益人姓名：</span><span>{el.benefitName}</span></div>
                    <div className="order-item"><span>保险时长：</span><span>{el.policyTime}</span></div>
                    <div className="order-item"><span>保险费用：</span><span>{el.expense}</span></div>
                    <div className="order-item"><span>意外保险费用：</span><span>{el.claimsExpenses}</span></div>
                  </div>
                </div>
              })}
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Policy;
