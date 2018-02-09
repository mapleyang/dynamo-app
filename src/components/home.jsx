import React, { Component } from 'react'
import './index.less'
import AjaxJson from "../utils/ajaxJson"
import classnames from "classnames";
import { Flex, List, Button } from 'antd-mobile';


class Home extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      data: ['', '', ''],
      insurance: [{
        "id": "1000001",
        "title": "太健康·百万全家桶",
        "age": "90天至60周岁",
        "time": "1年",
        "content": "住院医疗保险金，100万/人特许医疗"
      },{
        "id": "1000002",
        "title": "心安•怡住院医疗保险",
        "age": "0至60周岁",
        "time": "1年",
        "content": "病种由原60中提升至88种、续保年龄延长至80周岁"
      },{
        "id": "1000003",
        "title": "少儿超能宝两全保险",
        "age": "0-17周岁",
        "time": "30年",
        "content": "身故或全残保险金 10万元/份 重大疾病保险金"
      },{
        "id": "1000004",
        "title": "少儿超能宝两全保险",
        "age": "0-17周岁",
        "time": "30年",
        "content": "身故或全残保险金 10万元/份 重大疾病保险金"
      }]
    }
  }



  componentWillMount () {
    this.getProductsList();
  }

  insuranceSelect (value) {
    sessionStorage.setItem("productId", JSON.stringify(value.id))
    location.hash = "/policydesc";
  }

  //获取产品列表
  getProductsList () {
  }

  getScoreClick () {
    location.hash = "/userdata"
  }

  render() {
    return (
      <div className="home">
        <div className="header">
          首页
        </div>
        <div className="pro-list tab-content" style={{height: screen.height - 50, overflow: "auto", "-webkit-overflow-scrolling": "touch"}}>
          <div className="pro-tabs">
            <Flex className="pro-tabs-list">
              <Flex.Item><img src="./static/score.png" /><div className="pro-tabs-name">Dynamo积分</div></Flex.Item>
              <Flex.Item><img src="./static/baoxian.png" /><div className="pro-tabs-name">医疗保险</div></Flex.Item>
              <Flex.Item><img src="./static/hospital.png" /><div className="pro-tabs-name">健康服务</div></Flex.Item>
              <Flex.Item><img src="./static/ai.png" /><div className="pro-tabs-name">数据服务</div></Flex.Item>
            </Flex>
            <div className="pro-score-tip">
              <div className="pro-score-tip-area" onClick={this.getScoreClick.bind(this)}>
                <div className="pro-score-tip-title">怎么获取Dynamo积分?</div>
                <div className="pro-score-tip-content">建立健康档案，上传高质量数据获取Dynamo积分。</div>
              </div>
            </div>
          </div>
          <div className="item-title">
            <span className="item-title-adivce">保险推荐</span><span className="item-title-score">加入区块链保险计划获取积分</span>
          </div>
          <div className="insurance-list">
            <div>
              {this.state.insurance.map((el, index) => {
                return <div onClick={this.insuranceSelect.bind(this, el)} key={index}>
                  <Flex className="insurance-info">
                    <Flex.Item className="insurance-img"><img src={"./static/insurance" + index + ".jpg"} /></Flex.Item>
                    <Flex.Item className="insurance-intr">
                      <div className="insurance-title">{el.title}</div>
                      <div className="insurance-item">
                        <span className="insurance-item-title">承保年龄</span>
                        <span>{el.age}</span>
                      </div>
                      <div className="insurance-item">
                          <span className="insurance-item-title">主要保障</span>
                        <span>{el.content}</span>
                      </div>
                     <div className="insurance-item">
                        <span className="insurance-item-title">保障期限</span>
                        <span>{el.time}</span>
                      </div>
                    </Flex.Item>
                  </Flex>
                </div>
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;