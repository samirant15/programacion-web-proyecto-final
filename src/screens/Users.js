import React, { Component } from 'react';
import Side from './Side';
import { Row, Col } from 'antd';
import axios from 'axios';
import { Layout, Menu, Divider, Icon, Tag, Typography, Table, Button, Modal, Form, Input, Switch, notification, Popconfirm } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Title } = Typography;

export default class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            add_user_modal: false,
            users: [],
            newUser: {}
        }
        this.onChange = this.onChange.bind(this);
        this.submitUser = this.submitUser.bind(this);
    }

    async componentDidMount() {
        try {
            let users = await axios.get('http://localhost:38081/api/users');
            this.setState({ users: users.data })
        } catch (error) {
            console.log(error)
            notification.error('ERROR LOADING USERS!')
        }
    }

    onChange(e) {
        let newUser = { ...this.state.newUser, [e.target.name]: e.target.value }
        this.setState({
            newUser: newUser
        })
    }

    async submitUser() {
        console.log(this.state.newUser.id)
        try {
            if (this.state.newUser.id) {
                let res = await axios.put('http://localhost:38081/api/users/' + this.state.newUser.id, this.state.newUser);
                notification.success({ message: 'USER EDITED SUCCESSFULLY!' })
            } else {
                let res = await axios.post('http://localhost:38081/api/users', this.state.newUser);
                notification.success({ message: 'USER ADDED SUCCESSFULLY!' })
            }
            let users = await axios.get('http://localhost:38081/api/users');
            this.setState({ add_user_modal: false, newUser: {}, users: users.data })
        } catch (error) {
            console.log(error)
            notification.error({ message: 'ERROR SUBMITING USER!' })
        }
    }

    editUser(id) {
        let user = this.state.users.find(u => u.id == id);
        this.setState({ newUser: user, add_user_modal: true })
    }

    async deleteUser(id) {
        let user = this.state.users.find(u => u.id == id);
        try {
            let res = await axios.delete('http://localhost:38081/api/users/' + user.id);
            notification.success({ message: 'USER EDITED SUCCESSFULLY!' })
            let users = await axios.get('http://localhost:38081/api/users');
            this.setState({ add_user_modal: false, newUser: {}, users: users.data })
        } catch (error) {
            console.log(error)
            notification.error({ message: 'ERROR DELETING USER!' })
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
                render: u => (
                    <Button.Group>
                        <Button type="primary" ghost onClick={() => this.editUser(u.id)}><Icon type="edit" /></Button>
                        <Popconfirm
                            title="Delete this user?"
                            onConfirm={() => this.deleteUser(u.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="danger" ghost><Icon type="delete" /></Button>
                        </Popconfirm>
                    </Button.Group>
                )
            }
        ];
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
                            <Button type="primary" ghost onClick={() => this.setState({ add_user_modal: true })}><Icon type="user-add" /> Add New</Button>
                            <Table columns={columns} dataSource={this.state.users.length > 0 ? this.state.users.map((u, i) => {
                                return { key: i, name: `${u.firstName} ${u.lastName}`, email: u.email, type: u.employee ? 'Employee' : 'Client', action: u }
                            })
                                : null} />
                        </Content>
                    </Layout>
                </Layout>
                <Modal title="Add User" visible={this.state.add_user_modal} onOk={this.submitUser} onCancel={() => this.setState({ add_user_modal: false, newUser: {} })}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First Name" value={this.state.newUser.firstName} name="firstName" onChange={this.onChange} />
                        </Form.Item>
                        <Form.Item>
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Last Name" value={this.state.newUser.lastName} name="lastName" onChange={this.onChange} />
                        </Form.Item>
                        <Form.Item>
                            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Email" value={this.state.newUser.email} name="email" onChange={this.onChange} />
                        </Form.Item>
                        <Form.Item>
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" name="password" onChange={this.onChange} />
                        </Form.Item>
                        <Form.Item label="Employee?">
                            <Switch value={this.state.newUser.employee} onChange={(val) => this.onChange({ target: { name: "employee", value: val } })} />
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        )
    }
}
