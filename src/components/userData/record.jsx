import React, { Component } from 'react'
import '../index.less'
import './index.less'
import classnames from "classnames";
import AjaxJson from "../../utils/ajaxJson"
import { Icon, List, InputItem, Picker, Button, DatePicker, Toast, Steps} from 'antd-mobile';
import { createForm } from 'rc-form';
const Item = List.Item;
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

const Step = Steps.Step;

class Record extends Component {
  constructor(props, context) {
    super(props)
    this.state = {

    }
  }

  componentWillMount () {
    // this.getUserData();
  }

  //获取体检机构列表
  getUserData () {
    const _this = this;
    let url = "/api/institutions";
    let data = {};
    AjaxJson.getResponse(url, data, "GET").then((value) => {
      if(value.status === 2000) {
        let orgData = value.data.map(el => {
          el.label = el.Record.orgName;
          el.value = el.Record.orgId;
          return el
        })
        _this.setState({
          orgData: orgData
        })
      }
    }, (value) => {})
  }

  headerBackClick () {
    window.history.back()
  }


  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className="user">
        <div className="header flow-header">
          <div className="header-back" onClick={this.headerBackClick.bind(this)}>
            <Icon type="left" size="lg" />
          </div>
          <div className="header-content">健康记录档案</div>
        </div>
        <div className="tab-content">
          <Steps className="user-data-step" size="small">
            <Step status="wait" title="建立区块链健康档案" description="暂无" />
            <Step status="wait" title="请维护区块链健康档案" description="暂无" />
            <Step status="wait" title="请运营区块链健康档案" description="暂无" />
          </Steps>
        </div>
      </div>
    );
  }
}

export default Record = createForm()(Record);