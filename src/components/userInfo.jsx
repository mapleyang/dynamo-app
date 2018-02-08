import React, { Component } from 'react'
import './index.less'
import classnames from "classnames";
import AjaxJson from "../utils/ajaxJson"
import { List, InputItem, Toast} from 'antd-mobile';
import { createForm } from 'rc-form';
const Item = List.Item;

class UserInfo extends Component {
  constructor(props, context) {
    super(props)
    this.state = {

    }
  }

  componentWillMount () {
    // this.getUserInfo();
  }

  //获取体检机构列表
  getUserInfo () {
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
          <div className="header-content">个人资料</div>
        </div>
      </div>
    );
  }
}

export default UserInfo = createForm()(UserInfo);