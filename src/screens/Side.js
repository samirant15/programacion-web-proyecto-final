import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class Side extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // console.log(this.props)
        return (
            <Sider width={200} style={{ background: '#fff' }}>
                <Menu mode="inline" defaultSelectedKeys={[this.props.tab]} style={{ height: '100%', borderRight: 0 }}>
                    <Menu.Item key="1" onClick={() => this.props.history.push("/packages")}>
                        <Icon type="shop" />
                        <span>Packages</span>
                    </Menu.Item>
                    <Menu.Item key="2" onClick={() => this.props.history.push("/orders")}>
                        <Icon type="history" />
                        <span>Orders</span>
                    </Menu.Item>
                    <Menu.Item key="3" onClick={() => this.props.history.push("/users")}>
                        <Icon type="user" />
                        <span>Users</span>
                    </Menu.Item>
                    <Menu.Item key="4" onClick={() => this.props.history.push("/stats")}>
                        <Icon type="area-chart" />
                        <span>Stats</span>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    }
}
