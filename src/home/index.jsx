import React, { Component } from 'react'
import './index.less'
import classnames from "classnames";
import { TabBar } from 'antd-mobile';
import HomeComponent from '../components/home';
import PolicyComponent from '../components/policy';
import IntrComponent from '../components/intr';
import MyComponent from '../components/my';



class Home extends Component {
  constructor(props, context) {
    super(props)
    this.state = {
      selectedTab: 'blueTab',
      hidden: false,
      fullScreen: true,
    }
  }

  componentWillMount () {
    let tab = sessionStorage.getItem("tab")
    this.setState({
      selectedTab: tab || 'blueTab'
    })
  }


  renderContent(pageText) {
    sessionStorage.setItem("tab", pageText)
    let el;
    switch(pageText) {
      case "blueTab":
        el = <HomeComponent />
        break;
      case "redTab":
        el = <PolicyComponent />
        break;
      case "greenTab":
        el = <IntrComponent />
        break;
      case "yellowTab":
        el = <MyComponent />
        break;
      default:
        el = <HomeComponent />
        break
    }
    return el;
  }


  render() {
    return (
      <div className="home" style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0, "-webkit-overflow-scrolling": "touch" } : { height: 400 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="主页"
            key="home"
            icon={{uri: './static/home.svg' }}
            selectedIcon={{uri: './static/home-true.svg'}}
            selected={this.state.selectedTab === 'blueTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
            data-seed="logId"
          >
            {this.state.selectedTab === 'blueTab' ? this.renderContent('blueTab') : ""}
          </TabBar.Item>
          <TabBar.Item
            icon={{uri: './static/policy.svg'}}
            selectedIcon={{uri: './static/policy-true.svg'}}
            title="保单"
            key="policy"
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab',
              });
            }}
            data-seed="logId1"
          >
            {this.state.selectedTab === 'redTab' ? this.renderContent('redTab') : ""}
          </TabBar.Item>
          <TabBar.Item
            title="介绍"
            key="intr"
            icon={{uri: './static/intr.svg'}}
            selectedIcon={{uri: './static/intr-true.svg'}}
            title="介绍"
            key="intro"
            dot
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              });
            }}
          >
            {this.state.selectedTab === 'greenTab' ? this.renderContent('greenTab'): ""}
          </TabBar.Item>
          <TabBar.Item
            title="我的"
            key="my"
            icon={{ uri: './static/my.svg' }}
            selectedIcon={{ uri: './static/my-true.svg' }}
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab',
              });
            }}
          >
            {this.state.selectedTab === 'yellowTab' ? this.renderContent('yellowTab') : ""}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default Home;

// style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}
