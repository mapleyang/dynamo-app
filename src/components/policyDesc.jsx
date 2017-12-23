import React, { Component } from 'react'
import './index.less'
import classnames from "classnames";
import { createForm } from 'rc-form';
import AjaxJson from "../utils/ajaxJson"
import { Icon, Button, Card, List } from 'antd-mobile';
const Item = List.Item;

const detailList = [{
  "id": "1000001",
  "title": "太健康·百万全家桶",
  "age": "90天至60周岁",
  "time": "1年",
  "content": "住院医疗保险金，100万/人特许医疗",
  desc: {
    title: "全家统保更优惠，有无社保都可保",
    content: [{
      title: "独家推出家庭统保",
      content: "全家统保新模式，保费更优惠，额外获得100万共享保障，家庭成员个人最高获得200万保额。"
    },{
      title: "特需医疗方案",
      content: "特需医疗可供选择，床位紧张不用怕，特需病房也能陪。"
    }]
  }
},{
  "id": "1000002",
  "title": "心安•怡住院医疗保险",
  "age": "0至60周岁",
  "time": "1年",
  "content": "病种由原60中提升至88种、续保年龄延长至80周岁",
  desc: {
    title: "重磅升级，保障更信任、服务更人性化",
    content: [{
      title: "重大疾病医疗费用",
      content: "被保险人因合同约定的88种重大疾病住院治疗，给付金额以基本保险金额及药品费分项给付限额的双倍"
    },{
      title: "投保方式",
      content: "本保险可以单人形式投保，或多为家庭成员以家庭形式同时投保；家庭形式投保，须由同一位投保人为家庭成员。"
    }]
  }
},{
  "id": "1000003",
  "title": "少儿超能宝两全保险",
  "age": "0-17周岁",
  "time": "30年",
  "content": "身故或全残保险金 10万元/份 重大疾病保险金",
  desc: {
    title: "保障全、双豁免、满期返更增值",
    content: [{
      title: "重疾轻症保障全",
      content: "“少儿超能宝”保障计划涵盖多达88种重大疾病。每份保额10万元，轻症保额2万元，而且轻症保额独立，轻症理赔后不影响后续重疾保障及满期保险金给付。"
    },{
      title: "满期反还更增值",
      content: "宝宝出生满30天就可以投保为您宝宝满月送上一份全面保障的大礼。固定保障期限为30年，满期可领取相当于主附险保费总额150"
    }]
  }
}]

class PolicyDesc extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      data: ['', '', ''],
      detail: {
        "id": "1000001",
        "title": "太健康·百万全家桶",
        "age": "90天至60周岁",
        "time": "1年",
        "content": "住院医疗保险金，100万/人特许医疗",
        desc: {
          title: "全家统保更优惠，有无社保都可保",
          content: [{
            title: "独家推出家庭统保",
            content: "全家统保新模式，保费更优惠，额外获得100万共享保障，家庭成员个人最高获得200万保额。"
          },{
            title: "特需医疗方案",
            content: "特需医疗可供选择，床位紧张不用怕，特需病房也能陪。"
          }]
        }
      },
      index: 0
    }
  }

  componentWillMount () {
    let productId = sessionStorage.getItem("productId");
    if(productId) {
      let detail = "";
      detailList.forEach((el,index) => {
        if(el.id === productId) {
          this.setState({
            detail: el,
            index: index
          })
        }
      })
    }
  }

  headerBackClick () {
    window.history.back()
  }

  saveClick () {
    let policy = {
      base: "",
      product: {
        id: this.state.detail.id,
        category: this.state.detail.detail,
        title: this.state.detail.title,
        content: this.state.detail.content
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
          <div className="header-content">保险产品介绍</div>
        </div>
        <div className="flow-content tab-content">
          <Card>
            <Card.Header
              title={this.state.detail.title}
              thumb={"./static/insurance" + this.state.index + ".jpg"}/>
            <Card.Body>
              <List renderHeader={() => this.state.detail.desc.title}>
                {this.state.detail.desc.content.map(el => {
                  return <div>
                    <Item>{el.title}</Item>
                    <Item multipleLine align="top" wrap>
                      {el.content}
                    </Item>
                  </div>
                })}
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

export default PolicyDesc;