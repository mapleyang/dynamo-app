import React, { Component } from 'react'
import './index.less'
import classnames from "classnames";


class Intr extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      data: [{
        key: "什么是区块链？",
        value: "区块链是一种去中心化、由节点参与的分布式账本系统，在它上面存储的数据不可伪造和篡改，公开透明，在区块链上可以找到每一个账号在历史上任何一点所记录的信息及拥有的价值。区块链协议的特点为智能合约运行提供必要基础，合约可以按照既定条件自动执行和信任，无需任何中心化机构的审核。"
      },{
        key: "区块链解决了用户哪些问题？",
        value: ""
      },{
        key: "区块链解决了医疗保险哪些问题？",
        value: ""
      }]
    }
  }

  componentDidMount () {

  }



  render() {
    return (
      <div className="intr">
        <div className="header">
          区块链应用
        </div>
        <div className="block-intr tab-content">
          {this.state.data.map(el => {
            return <div className="intr-block">
              <div className="intr-key">{el.key}</div>
              <div className="intr-value">{el.value}</div>
            </div>
          })}
          <div></div>
        </div>
      </div>
    );
  }
}

export default Intr;
