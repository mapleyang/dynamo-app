import React, { Component } from 'react'
import './index.less'
import { Card, List } from 'antd-mobile';
const Item = List.Item;

class Intr extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      data: [{
        key: "什么是区块链？",
        value: "区块链是一种去中心化、由节点参与的分布式账本系统，在它上面存储的数据不可伪造和篡改，公开透明，在区块链上可以找到每一个账号在历史上任何一点所记录的信息及拥有的价值。区块链协议的特点为智能合约运行提供必要基础，合约可以按照既定条件自动执行和信任，无需任何中心化机构的审核。"
      },{
        key: "区块链解决了用户哪些问题？",
        value: "为用户和承保商的交易过程建立起无需第三方的信任机制，完善电子保单的存证，规避保单丢失的风险。"
      },{
        key: "区块链解决了医疗保险哪些问题？",
        value: "规范保险销售、核保、签章流程；最大程度的确保用户数的真实性，简化核保流程。为用户提供精准度高、体验感好的医疗保险服务。"
      }]
    }
  }

  componentDidMount () {

  }



  render() {
    return (
      <div className="intr">
        <div className="header">
          区块链应用介绍
        </div>
        <div className="block-intr tab-content">
          <Card>
            <Card.Header
              title="AmyChain 基于区块医疗保险应用"
              thumb="./static/logo.png"/>
            <Card.Body>
              <List renderHeader={() => '信任、存证、智能高效'}>
                {this.state.data.map(el => {
                  return <div>
                    <Item>{el.key}</Item>
                    <Item multipleLine align="top" wrap>
                      {el.value}
                    </Item>
                  </div>
                })}
              </List>
            </Card.Body>
            <Card.Footer extra={<div style={{color: "#199ed8"}}>AmyChain系统介绍</div>} />
          </Card>
        </div>
      </div>
    );
  }
}

export default Intr;
