import React, { Component } from 'react';
import Side from './Side';
import { Row, Col } from 'antd';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { Layout, Menu, Divider, Icon, Card, Typography, Skeleton, Statistic, Button, notification, DatePicker, TimePicker } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import moment from 'moment';
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
            date: moment(),
            selectedPackages: [],
            total: 0
        }
        this.onChangeDate = this.onChangeDate.bind(this);
    }

    selectPackage(i) {
        let selected = this.state.selectedPackages;
        if (selected.includes(i))
            selected = selected.filter(s => s != i)
        else
            selected.push(i);

        let total = 0;
        for (let i = 0; i < selected.length; i++) {
            total += this.state.packages[selected[i]].cost;
        }

        this.setState({ selectedPackages: selected, total: total });
    }

    onChangeDate(e) {
        this.setState({ date: e })
    }

    onPayPalSuccess(payment) {
        console.log("Paypal:", payment);
        notification.success({ message: 'ORDER PLACED SUCCESSFULLY!' })
    }

    onPayPalCancel(data) {
        console.log("Paypal:", data);
        notification.info({ message: 'ORDER CANCELLED' })
    }

    onPayPalError(err) {
        console.log("Paypal:", err);
        notification.error({ message: 'ERROR PLACING ORDER!' })
    }

    render() {
        //PAYPAL: pepito@pweb.com, PASS:123123123
        const client = {
            sandbox: 'AWSxD2HAJEELwL_YX_sOog922PCNIhOVbowCx7Sj6NRRfgeFSBOgqcMqwGOz6dLcV6WV_qfYxBwpVG77',
        }
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
                            <FormItem label="1. Select Order Date:">
                                <DatePicker showTime use12Hours placeholder="Select Time" onOk={this.onChangeDate} />
                            </FormItem>
                            <Divider dashed />
                            <p>2. Select your Packages:</p>
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
                    <Statistic title="Total" value={this.state.total} precision={2} />
                    <PaypalExpressBtn client={client} currency={'USD'} total={this.state.total} onError={this.onPayPalError} onSuccess={this.onPayPalSuccess} onCancel={this.onPayPalCancel} />
                </Card>
            </>
        )
    }
}
