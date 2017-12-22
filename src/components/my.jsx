import React, { Component } from 'react'
import './index.less'
import classnames from "classnames";
import { Flex, List } from 'antd-mobile';
const Item = List.Item;

class My extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
    }
  }

  componentDidMount () {

  }

  render() {
    return (
      <div className="my">
        <div className="my-area">
          <div className="my-intr">
            <div className="my-intr-title">
              <img src="../static/img.jpg" />
            </div>
            <Flex className="my-intr-info">
              <Flex.Item>
                <img src="../static/label.svg"/>
                <span style={{color: "#fff"}}>我的电子凭证</span>
              </Flex.Item>
              <Flex.Item>
                <img src="../static/lock.svg"/>
                <span style={{color: "#fff"}}>区块链信息</span>
              </Flex.Item>
            </Flex>
          </div>
          <List className="my-list-certificate" renderHeader={() => ''}>
            <Item
              thumb="../static/key.svg"
              extra=""
              onClick={() => {}}
              className="list-item-font"
            >我的区块密钥</Item>
            <Item
              thumb="../static/address.svg"
              onClick={() => {}}
              className="list-item-font"
              extra="">
              我的区块地址
            </Item>
          </List>
          <List className="my-list-certificate" renderHeader={() => ''}>
            <Item
              thumb="../static/order.svg"
              onClick={() => {}}
              arrow="horizontal"
            >我的保单</Item>
            <Item
              thumb="../static/data.svg"
              onClick={() => {}}
              arrow="horizontal">
              我的健康数据
            </Item>
            <Item
              thumb="../static/authorize.svg"
              onClick={() => {}}
              arrow="horizontal"
            >数据授权</Item>
          </List>
          <List className="my-list-certificate" renderHeader={() => ''}>
            <Item
              thumb="../static/setting.svg"
              onClick={() => {location.hash = "/logout"}}
              arrow="horizontal"
            >设置</Item>
          </List>
        </div>
      </div>
    );
  }
}

export default My;
