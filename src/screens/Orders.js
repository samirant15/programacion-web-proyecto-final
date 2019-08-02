import React, { Component } from 'react';
import Side from './Side';
import { Row, Col } from 'antd';
import { Layout, Menu, Divider, Icon, Button, Typography, Table } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Title } = Typography;

export default class Orders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: [
                {
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
                },
                {
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
            ]
        }
    }

    selectPackage(i) {
        let selected = this.state.selectedPackages;
        if (selected.includes(i))
            selected = selected.filter(s => s != i)
        else
            selected.push(i);
        this.setState({ selectedPackages: selected });
    }

    render() {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
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
                title: 'Asigned',
                dataIndex: 'asigned',
                key: 'asigned',
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
                                <Button style={{ right: 0 }} type="dashed" shape="round" ghost><Icon type="logout" /> LOGOUT</Button>
                            </Col>
                        </Row>
                    </Header>
                    <Layout>
                        <Side tab={'2'} history={this.props.history} />
                        <Content style={{ background: '#fff', padding: 24, margin: 24, minHeight: 280, }}>
                            <Title><Icon type="history" style={{ color: '#1890ff' }} /> ORDERS</Title>
                            <Divider dashed />
                            <Table dataSource="" columns={columns} />
                        </Content>
                    </Layout>
                </Layout>
            </>
        )
    }
}
