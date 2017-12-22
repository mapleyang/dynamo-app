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

  componentDidMount () {
  }


  renderContent(pageText) {
    let el;
    switch(pageText) {
      case "home":
        el = <HomeComponent />
        break;
      case "policy":
        el = <PolicyComponent />
        break;
      case "intr":
        el = <IntrComponent />
        break;
      case "my":
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
      <div className="home" style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="主页"
            key="home"
            icon={{uri: '../static/home.svg' }}
            selectedIcon={{uri: '../static/home-true.svg'}}
            selected={this.state.selectedTab === 'blueTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
            data-seed="logId"
          >
            {this.renderContent('home')}
          </TabBar.Item>
          <TabBar.Item
            icon={{uri: '../static/policy.svg'}}
            selectedIcon={{uri: '../static/policy-true.svg'}}
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
            {this.renderContent('policy')}
          </TabBar.Item>
          <TabBar.Item
            title="介绍"
            key="intr"
            icon={{uri: '../static/intr.svg'}}
            selectedIcon={{uri: '../static/intr-true.svg'}}
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
            {this.renderContent('intr')}
          </TabBar.Item>
          <TabBar.Item
            title="我的"
            key="my"
            icon={{ uri: '../static/my.svg' }}
            selectedIcon={{ uri: '../static/my-true.svg' }}
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab',
              });
            }}
          >
            {this.renderContent('my')}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default Home;

// style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}
