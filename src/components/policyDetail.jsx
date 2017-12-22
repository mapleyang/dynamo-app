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
      data: ['', '', ''],
    }
  }

  componentDidMount () {
  }

  headerBackClick () {
    window.history.back()
  }

  saveClick () {
    let policy = {
      base: "",
      product: {
        id: detail.id,
        category: detail.detail,
        title: detail.title,
        content: detail.content
      },
      promise: "",
      scheduleData: "",
      reportData: "",
    }
    sessionStorage.setItem("policy", JSON.stringify(policy))
    location.hash = "/flow";
  }

  render() {
    return (
      <div className="flow">
        <div className="header flow-header">
          <div className="header-back" onClick={this.headerBackClick.bind(this)}>
            <Icon type="left" size="lg" />
          </div>
          <div className="header-content">保险介绍</div>
        </div>
        <div className="flow-content tab-content">
          <Card>
            <Card.Header
              title="太健康·百万全家桶"
              thumb="../static/insurance0.jpg"/>
            <Card.Body>
              <List renderHeader={() => '保障全、双豁免、满期返更增值'}>
                <Item>重疾轻症保障全</Item>
                <Item multipleLine align="top" wrap>
                  “少儿超能宝”保障计划涵盖多达88种重大疾病。每份保额10万元，轻症保额2万元，而且轻症保额独立，轻症理赔后不影响后续重疾保障及满期保险金给付。
                </Item>
                <Item>满期反还更增值</Item>
                <Item multipleLine align="top" wrap>
                  宝宝出生满30天就可以投保为您宝宝满月送上一份全面保障的大礼。固定保障期限为30年，满期可领取相当于主附险保费总额150%的满期保险金，投入全部拿回，更有50%的增额收益。
                </Item>
              </List>
            </Card.Body>
            <Card.Footer extra={<div style={{color: "#199ed8"}}>保险条款详情</div>} />
          </Card>
          <Button style={{margin: "2rem"}} type="ghost" onClick={this.saveClick.bind(this)}>立即投保</Button>
        </div>
      </div>
    );
  }
}

export default PolicyDetail;