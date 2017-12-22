import React, { Component } from 'react'
import './index.less';
import AjaxJson from "../utils/ajaxJson"
import classnames from "classnames";
import { Flex, Badge, Tabs, List } from 'antd-mobile';

class Policy extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      data: [],
    }
  }

  componentWillMount () {
    this.getPoliciesList()
  }

  //获取保单列表
  getPoliciesList () {
    const _this = this;
    let url = "/api/policies";
    let data = {
      offset: 0,
      limit: 20,
    }
    AjaxJson.getResponse(url, data, "GET").then((value) => {
      if(value.status = 2000) {

        _this.setState({
          data: value.data.map(el => {
            switch(el.state) {
              case 1:
                el.stateContent = ""
                break;
              case 2:
                
                break;
            }
            return el
          })
        })
      }
    }, (value) => {})
  }

  getRow (value, index) {
    let img = index % 2;
    return <div style={{ padding: '0 1.2rem',background: "#fff", marginBottom: "1rem" }}>
    <div style={{
        lineHeight: '4.1rem',
        color: '#888',
        fontSize: 18,
        borderBottom: '1px solid #F6F6F6',
      }}>{value.createTime}</div>
      <div style={{ display: '-webkit-box', display: 'flex', padding: '1.2rem 0' }}>
        <img style={{ height: '5.2rem', marginRight: '1.2rem' }} src={"../static/insurance" + img + ".jpg"} alt="" />
        <div style={{ lineHeight: 1 }}>
          <div style={{ marginBottom: '0.8rem', fontWeight: 'bold' }}></div>
          <div><span style={{ fontSize: '2.8rem', color: '#FF6E27' }}>35</span>¥</div>
        </div>
      </div>
    </div>
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
              {this.state.data.map((el, index) => {
                return this.getRow(el, index)
              })}
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Policy;
