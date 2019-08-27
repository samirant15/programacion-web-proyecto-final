import React, { Component } from 'react';
import Side from './Side';
import axios from 'axios';
import { Layout, Menu, Input, Icon, Form, Row, Col, Button, Card, notification } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    async componentDidMount() {
        let token = await localStorage.getItem('token');
        if (token) {
            this.props.history.push("/packages");
        }
    }

    login = async () => {
        try {
            let res = await axios.post('http://api.juandiii.com/login', { email: this.state.email, password: this.state.password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            this.props.history.push("/packages");
            notification.success({ message: 'WELCOME ' + res.data.user.email });
        } catch (error) {
            console.log(error)
            notification.error({ message: 'LOGIN ERROR, CHECK YOUR CREDENTIALS!' });
        }
    }

    render() {
        return (
            <>
                <Layout style={{ height: "100vh" }}>
                    <Header className="header">
                        <Row>
                            <Col span={23}>
                                <h1 style={{ color: "#fff" }}><Icon type="camera" theme="twoTone" /> EVENTS MEDIA</h1>
                            </Col>
                        </Row>
                    </Header>
                    <Layout>
                        <Content style={{ background: '#fff', padding: 24, margin: 24, minHeight: 280, }}>
                            <Card title="LOG IN" style={{ width: "40%", left: "30%", right: "30%", top: "10%", border: "solid 2px #95ccff", boxShadow: "#0000004a 0px 4px 8px 0px" }}>
                                <Form onSubmit={this.handleSubmit} className="login-form">
                                    <Form.Item>
                                        <Input onChange={(e) => this.setState({ email: e.target.value })} prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                                    </Form.Item>
                                    <Form.Item>
                                        <Input onChange={(e) => this.setState({ password: e.target.value })} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" onClick={this.login} className="login-form-button">
                                            Log in
                                        </Button>
                                    </Form.Item>
                                    Or <a href="/packages">Browse Packages</a>
                                </Form>
                            </Card>
                        </Content>
                    </Layout>
                </Layout>
            </>
        )
    }
}