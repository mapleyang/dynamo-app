import React, { Component } from 'react'
import './index.less'
import classnames from "classnames";
import AjaxJson from "../utils/ajaxJson"
import { Icon, List, InputItem, Button  } from 'antd-mobile';
import { createForm } from 'rc-form';
const Item = List.Item;


class BaseInfo extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      data: ['', '', ''],
    }
  }

  componentDidMount () {
  }

  headerBackClick () {
    window.history.back()
  }

  saveClick () {
    const _this = this;
    this.props.form.validateFields((error, value) => {
      if(!error) {
        let url = "/api/policies";  
        let data = {};
        AjaxJson.getResponse(url, data, "POST").then((value) => {
          if(value.status = 2000) {
            window.history.back()
          }
        }, (value) => {})
      }
      else {    //输入提示

      }
    });
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className="flow">
        <div className="header flow-header">
          <div className="header-back" onClick={this.headerBackClick.bind(this)}>
            <Icon type="left" size="lg" />
          </div>
          <div className="header-content">信息填写</div>
        </div>
        <div className="flow-content tab-content">
          <List>
            <InputItem
            {...getFieldProps('policyHolderName')}
            clear>
              投保人姓名
            </InputItem>
            <InputItem
            {...getFieldProps('policyHolderID')}
            clear>
              投保人证件
            </InputItem>
            <InputItem
            type="phone"
            {...getFieldProps('policyHolderMobile')}
            clear>
              投保人电话
            </InputItem>
            <InputItem
            {...getFieldProps('favoreeName')}
            clear>
              受益人姓名
            </InputItem>
            <InputItem
            {...getFieldProps('favoreeID')}
            clear>
              受益人证件
            </InputItem>
          </List>
          <Button style={{margin: "2rem"}} type="ghost" onClick={this.saveClick.bind(this)}>保存</Button>
        </div>
      </div>
    );
  }
}

export default BaseInfo = createForm()(BaseInfo);