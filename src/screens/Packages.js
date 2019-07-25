import React, { Component } from 'react';
import Side from './Side';
import { Row, Col } from 'antd';
import { Layout, Menu, Divider, Icon, Card, Typography, Skeleton, Statistic, Button } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Title } = Typography;

export default class Packages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            packages: [
                {
                    name: "Pre-Boda",
                    cost: 20,
                    description: "",
                },
                {
                    name: "Boda",
                    cost: 100,
                    description: "",
                },
                {
                    name: "Cumpleaños",
                    cost: 60,
                    description: "",
                },
                {
                    name: "Vídeo de evento",
                    cost: 80,
                    description: "",
                }
            ],
            selectedPackages: []
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
                        <Side tab={'1'} history={this.props.history} />
                        <Content style={{ background: '#fff', padding: 24, margin: 24, minHeight: 280, }}>
                            <Title><Icon type="shop" theme="twoTone" /> PACKAGES</Title>
                            <Divider dashed />
                            {
                                this.state.packages.length > 0 ? this.state.packages.map((p, i) => {
                                    return (
                                        <Col span={11} style={{ height: "50%", margin: "10px" }}>
                                            <Card onClick={() => this.selectPackage(i)} title={p.name}
                                                style={{
                                                    height: "100%", cursor: "pointer",
                                                    border: this.state.selectedPackages.includes(i) ? 'solid 3px #1890ff' : '',
                                                    boxShadow: this.state.selectedPackages.includes(i) ? "#1890ff8c 0px 0px 8px 0px" : ''
                                                }}>
                                                <Skeleton />
                                                <strong style={{ float: 'right' }}>{`US$${p.cost}`}</strong>
                                            </Card>
                                        </Col>
                                    )
                                }) : null
                            }
                        </Content>
                    </Layout>
                </Layout>
                <Card style={{
                    position: "fixed",
                    width: "200px",
                    right: "0",
                    bottom: "0",
                    boxShadow: "rgba(0, 0, 0, 0.29) 0px 0px 8px 0px"
                }}>
                    <Statistic title="Total" value={112893} precision={2} />
                    <Button style={{ marginTop: 16, float: 'right' }} block type="primary">Buy</Button>
                </Card>
            </>
        )
    }
}
