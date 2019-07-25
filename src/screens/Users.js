import React, { Component } from 'react';
import Side from './Side';
import { Row, Col } from 'antd';
import { Layout, Menu, Divider, Icon, Tag, Typography, Table, Button } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Title } = Typography;

export default class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [
                {
                    name: "Pepe",
                    last_name: "Algo",
                    email: "pepe@pepe.com",
                    password: "123",
                    is_employee: true,
                },
                {
                    name: "Samir",
                    last_name: "Comprés",
                    email: "samirant15@gmail.com",
                    password: "123",
                    is_employee: false,
                }
            ]
        }
    }

    render() {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
                render: e => <Tag color={e == 'Employee' ? 'blue' : 'green'}>{e}</Tag>
            },
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                render: e => (
                    <Button.Group>
                        <Button type="primary" ghost><Icon type="edit" /></Button>
                        <Button type="danger" ghost><Icon type="delete" /></Button>
                    </Button.Group>
                )
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
                        <Side tab={'3'} history={this.props.history} />
                        <Content style={{ background: '#fff', padding: 24, margin: 24, minHeight: 280, }}>
                            <Title><Icon type="user" style={{ color: '#1890ff' }} /> USERS</Title>
                            <Divider dashed />
                            <Button type="primary" htmlType="submit" className="login-form-button" ghost style={{ float: 'right' }}><Icon type="user-add" /> Add New</Button>
                            <Table columns={columns} dataSource={this.state.users.map((u, i) => {
                                return { key: i, name: `${u.name} ${u.last_name}`, email: u.email, type: u.is_employee ? 'Employee' : 'Client' }
                            })
                            } />
                        </Content>
                    </Layout>
                </Layout>
            </>
        )
    }
}
