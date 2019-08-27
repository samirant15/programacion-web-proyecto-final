/* eslint-disable react/jsx-no-duplicate-props */
import React, { Component } from 'react';
import Side from './Side';
import { Row, Col } from 'antd';
import axios from 'axios';
import { Layout, Menu, Divider, Icon, Button, Typography, Table, notification } from 'antd';
import moment from 'moment';
import Checkout from './Checkout';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Title } = Typography;

export default class Orders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: '',
            orders: [],
            users: [],
            viewInvoice: null
        }
    }

    async componentDidMount() {
        try {
            let token = await localStorage.getItem('token');
            let users = await axios.get('http://api.juandiii.com/api/users', { headers: { Authorization: "Bearer " + token } });
            let orders = await axios.get('http://api.juandiii.com/api/orders', { headers: { Authorization: "Bearer " + token } });

            this.setState({ orders: orders.data, users: users.data, token })
        } catch (error) {
            if (error.response.status === 401) {
                this.logout();
            }
            console.log(error)
            notification.error({ message: 'ERROR LOADING DATA!' })
        }
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.props.history.push("/");
        notification.error({ message: 'YOU HAVE BEEN LOGED OUT!' })
    }

    showInvoice = (order) => {
        let employee = this.state.users.find(usr => usr.id === order.userId);
        order = { ...order, employee }
        this.setState({ viewInvoice: order })
    }

    render() {
        const columns = [
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
            },
            {
                title: 'From',
                dataIndex: 'from',
                key: 'from',
            },
            {
                title: 'To',
                dataIndex: 'to',
                key: 'to',
            },
            {
                title: 'Total (US$)',
                dataIndex: 'total',
                key: 'total',
            },
            {
                title: 'Asigned',
                dataIndex: 'asigned',
                key: 'asigned',
                render: e => e ? e.firstName + " " + e.lastName : ""
            },
            {
                title: 'Action',
                dataIndex: 'view',
                key: 'view',
                render: e => <Button type="dashed" onClick={() => this.showInvoice(e)} shape="circle" icon="file-done" />
            }
        ];
        console.log(this.state.selectedPackages)

        return (
            <>
                <Layout style={{ height: "100vh" }}>
                    <Header className="header">
                        <Row>
                            <Col span={23}>
                                <h1 style={{ color: "#fff" }}><Icon type="camera" theme="twoTone" /> EVENTS MEDIA</h1>
                            </Col>
                            <Col span={1}>
                                <Button onClick={this.logout} style={{ right: 0 }} type="dashed" shape="round" ghost><Icon type="logout" /> LOGOUT</Button>
                            </Col>
                        </Row>
                    </Header>
                    <Layout>
                        <Side tab={'2'} history={this.props.history} />
                        <Content style={{ background: '#fff', padding: 24, margin: 24, minHeight: 280, }}>
                            {
                                this.state.viewInvoice == null ? <>
                                    <Title><Icon type="history" style={{ color: '#1890ff' }} /> ORDERS</Title>
                                    <Divider dashed />
                                    <Table dataSource="" columns={columns} dataSource={this.state.orders.length > 0 && this.state.users.length > 0 ? this.state.orders.map((u, i) => {
                                        return { key: i, date: moment.unix(u.orderDate / 1000).format('YYYY-MM-DD'), from: moment.unix(u.from).format('YYYY-MM-DD'), to: moment.unix(u.to).format('YYYY-MM-DD'), total: u.total, asigned: this.state.users.find(usr => usr.id == u.userId), view: u }
                                    })
                                        : null} />
                                </> : <>
                                        <Title><Icon type="file-done" style={{ color: '#1890ff' }} /> INVOICE <Button onClick={() => this.setState({ viewInvoice: null })} style={{ float: 'right' }} type="primary"><Icon type="arrow-left" /> BACK</Button></Title>
                                        <Divider dashed />
                                        <Checkout order={this.state.viewInvoice} />
                                    </>
                            }
                        </Content>
                    </Layout>
                </Layout>
            </>
        )
    }
}
