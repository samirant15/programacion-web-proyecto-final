import React, { Component } from 'react';
import Side from './Side';
import { Layout, Menu, Breadcrumb, Icon, Descriptions, Button, Typography, Divider, Row, Col } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Title } = Typography;

export default class Checkout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            order: {
                date: "2018-04-24 18:00:00",
                start_date: "2018-04-24 18:00:00",
                end_date: "2018-04-24 18:00:00",
                total: 20,
                currency: "US",
                employee: {
                    name: "Pepe",
                    last_name: "Algo",
                    email: "pepe@pepe.com",
                    password: "123",
                    is_employee: true,
                },
                client: {
                    name: "Samir",
                    last_name: "Comprés",
                    email: "samirant15@gmail.com",
                    password: "123",
                    is_employee: false,
                },
                packages: [
                    {
                        name: "Birthday",
                        cost: 10,
                        description: "akjfnlkjanfknasdfklnasdkfnaskjdnfsadfsadf",
                    },
                    {
                        name: "Wedding",
                        cost: 15,
                        description: "aaaaaaaaaaaaaaa  aaaaaaaaaaaaaaaaaaaaa \n asdasdasd \n  aaaaaaaaaaaaaaaaaa",
                    }
                ]
            }

        }
    }

    render() {
        let order = this.state.order
        return (
            <>
                <Layout style={{ height: "100vh" }}>
                    <Header className="header">
                        <Row>
                            <Col span={23}>
                                <h1 style={{ color: "#fff" }}><Icon type="camera" theme="twoTone" /> EVENTS MEDIA</h1>
                            </Col>
                            <Col span={1}>
                                <Button style={{ right: 0 }} type="dashed" shape="round" ghost><Icon type="logout" /> LOGOUT</Button>
                            </Col>
                        </Row>
                    </Header>
                    <Layout>
                        <Side tab={'0'} history={this.props.history} />
                        <Content style={{ background: '#fff', padding: 24, margin: 24, minHeight: 280, }}>
                            <Title><Icon type="shopping" /> CHECKOUT</Title>
                            <Divider dashed />
                            <Descriptions title="Order info" bordered>
                                <Descriptions.Item label="Client" span={2}>{`${order.client.name} ${order.client.last_name}`}</Descriptions.Item>
                                <Descriptions.Item label="Order Date" span={2}>{order.date}</Descriptions.Item>
                                <Descriptions.Item label="From">{order.start_date}</Descriptions.Item>
                                <Descriptions.Item label="To">{order.end_date}</Descriptions.Item>
                                <Descriptions.Item label="Asigned" span={3}>{order.employee.name}</Descriptions.Item>
                                <Descriptions.Item label="Packages">
                                    {order.packages.map(o => { return (<p><strong>{o.name}</strong><br />{o.description}</p>) })}
                                </Descriptions.Item>
                            </Descriptions>
                            <Divider dashed />
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{ float: 'right' }}>Payment</Button>
                        </Content>
                    </Layout>
                </Layout>
            </>
        )
    }
}
