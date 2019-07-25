import React, { Component } from 'react';
import Side from './Side';
import { Layout, Menu, Input, Icon, Form, Checkbox, Button, Card } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Layout style={{ height: "100vh" }}>
                    <Header className="header">
                        <h1 style={{ color: "#fff" }}>TAREA</h1>
                    </Header>
                    <Layout>
                        <Content style={{ background: '#fff', padding: 24, margin: 24, minHeight: 280, }}>
                            <Card title="LOG IN" style={{ width: "40%", left: "30%", right: "30%", top: "10%", border: "solid 2px #95ccff", boxShadow: "#0000004a 0px 4px 8px 0px" }}>
                                <Form onSubmit={this.handleSubmit} className="login-form">
                                    <Form.Item>
                                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                    </Form.Item>
                                    <Form.Item>
                                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            Log in
                                        </Button>
                                    </Form.Item>
                                    Or <a href="">register now!</a>
                                </Form>
                            </Card>
                        </Content>
                    </Layout>
                </Layout>
            </>
        )
    }
}