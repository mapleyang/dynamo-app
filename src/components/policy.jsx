import React, { Component } from 'react'
import './index.less';
import AjaxJson from "../utils/ajaxJson"
import classnames from "classnames";
import { Flex, Badge, Tabs, List } from 'antd-mobile';

class Policy extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      tabData: [],
      data: [],
      stayPhysical: [],
      stayCheck: [],
      checkDone: [],
      policyDone: []
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
        let stayPhysical = [];
        let stayCheck = [];
        let checkDone = [];
        let policyDone = [];
        let data = value.data.map(el => {
          switch(el.state) {
            case 1:
              el.stateContent = "待提交";
              el.mainContent = "感谢您选择了本保险产品，请完善你的投保信息";
              break;
            case 2:
              el.stateContent = "待体检";
              el.mainContent = "您可以去您预约的体检机构进行相关体检";
              stayPhysical.push(el)
              break;
            case 3:
              el.stateContent = "待核保";
              el.mainContent = "您的保单正在自动核保中...请耐心等待";
              stayCheck.push(el)
              break;
            case 4:
              el.stateContent = "核保成功";
              el.mainContent = "您的保单已经通过核保，正在等待保单签章...";
              checkDone.push(el)
              break;
            case 5:
              el.stateContent = "核保失败";
              el.mainContent = "您的保单已经通过核保，正在等待保单签章...";
              checkDone.push(el)
              break;
            case 6: 
              el.stateContent = "已完成";
              el.mainContent = "您的保单已经签章成功，本保单已生效";
              policyDone.push(el)
              break;
          }
          return el
        })
        _this.setState({
          tabData: data,
          data: data,
          stayPhysical: stayPhysical,
          stayCheck: stayCheck,
          checkDone: checkDone,
          policyDone: policyDone
        })
      }
    }, (value) => {})
  }

  detailClick (value) {
    location.hash = "/policydetail?id=" + value.policyID
  }

  getRow (value, index) {
    let img = index % 2;
    return <div style={{ padding: '0 1.2rem',background: "#fff", marginBottom: "1rem" }} onClick={this.detailClick.bind(this, value)}>
    <div style={{
        lineHeight: '3.5rem',
        color: '#888',
        fontSize: "1.2rem",
        borderBottom: '1px solid #F6F6F6',
      }}>{value.createTime}<span style={{float: "right", color: '#FF6E27'}}>{value.stateContent}</span></div>
      <div style={{ display: '-webkit-box', display: 'flex', padding: '1.2rem 0' }}>
        <img style={{ height: '5.2rem', marginRight: '1.2rem' }} src={"../static/insurance" + img + ".jpg"} alt="" />
        <div style={{ lineHeight: 1 }}>
          <div style={{ marginBottom: '0.8rem', fontWeight: 'bold' }}>{value.mainContent}</div>
          <div style={{ paddingTop: '2rem', color: '#FF6E27' }}><span>查看保单详情>></span></div>
        </div>
      </div>
    </div>
  }

  tabChange (tab, index) {
    let data = [];
    switch(tab.sub) {
      case "1":
        data = this.state.data;
        break;
      case "2":
        data = this.state.stayPhysical;
        break;
      case "3":
        data = this.state.stayCheck;
        break;
      case "4":
        data = this.state.checkDone;
        break;
      case "6": 
        data = this.state.policyDone
        break;
    }
    this.setState({
      tabData: data
    })
  }

  getNullPolicy () {
    return <div className="policy-null">
      <img style={{width: "10rem"}} src="../static/null.svg" />
      <div className="policy-null-content">可以去看看有哪些保险产品</div>
    </div>
  }

  render() {
    const tabs = [
      { title: '全部', sub: "1" },
      { title: '待体检', sub: "2" },
      { title: '待核保', sub: "3" },
      { title: '核保完成', sub: "4" },
      { title: '已完成', sub: "6" }];
    return (
      <div className="policy">
        <div className="header">
          保单
        </div>
        <div className="policy-list tab-content">
          <Tabs 
          tabs={tabs}
          onChange={this.tabChange.bind(this)}>
            <div className="policy-area">
              {this.state.tabData.length !== 0 ? this.state.tabData.map((el, index) => {
                return this.getRow(el, index)
              }) : this.getNullPolicy()}
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Policy;
