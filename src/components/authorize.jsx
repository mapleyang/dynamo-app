import React, { Component } from 'react'
import './index.less'
import classnames from "classnames";
import AjaxJson from "../utils/ajaxJson"
import { Icon, List, InputItem, Picker, Button, DatePicker, Toast} from 'antd-mobile';
import { createForm } from 'rc-form';
const Item = List.Item;
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

class Authorize extends Component {
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
      </div>
    );
  }
}

export default Authorize = createForm()(Authorize);