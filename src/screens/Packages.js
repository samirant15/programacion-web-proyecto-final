import React, { Component } from 'react';
import Side from './Side';
import { Row, Col } from 'antd';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { Layout, Menu, Divider, Icon, Card, Typography, Skeleton, Statistic, Button, notification, DatePicker, TimePicker } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import axios from 'axios';
import moment from 'moment';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Title } = Typography;

export default class Packages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: '',
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
            dateFrom: moment(),
            dateTo: moment(),
            selectedPackages: [],
            total: 0
        }
        this.onChangeDateFrom = this.onChangeDateFrom.bind(this);
        this.onChangeDateTo = this.onChangeDateTo.bind(this);
        this.onPayPalSuccess = this.onPayPalSuccess.bind(this);

    }

    async componentDidMount() {
        try {
            let token = await localStorage.getItem('token');
            this.setState({ token });
        } catch (error) {

        }
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

    onChangeDateFrom(e) {
        console.log(this.state)
        this.setState({ dateFrom: e })
    }

    onChangeDateTo(e) {
        console.log(this.state)
        this.setState({ dateTo: e })
    }

    async onPayPalSuccess(payment) {
        try {
            let newOrder = {
                "currency": "USD",
                "transaction": "CODE_PAYPAL",
                from: moment(this.state.dateFrom).unix(),
                to: moment(this.state.dateTo).unix(),
                "orderDetailsList": this.state.selectedPackages.map(p => { return { name: this.state.packages[p].name, cost: this.state.packages[p].cost, description: this.state.packages[p].description } })
            }
            let res = await axios.post('http://api.juandiii.com/api/orders/created', newOrder, { headers: { Authorization: "Bearer " + this.state.token } });
            console.log(newOrder)
            console.log('res', res.data)
            this.props.history.push("/orders");
            notification.success({ message: 'ORDER PLACED SUCCESSFULLY!' })
        } catch (error) {
            if (error.response.status === 401) {
                this.logout();
            }
            console.log(error)
            notification.error({ message: 'COULD NOT PLACE ORDER!' });
        }
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.props.history.push("/packages");
        notification.error({ message: 'YOU HAVE BEEN LOGED OUT!' })
    }

    onPayPalCancel(data) {
        notification.info({ message: 'ORDER CANCELLED' })
    }

    onPayPalError(err) {
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
                                {
                                    this.state.token ? <Button onClick={this.logout} style={{ right: 0 }} type="dashed" shape="round" ghost><Icon type="logout" /> LOGOUT</Button>
                                        : <Button onClick={() => this.props.history.push("/")} style={{ right: 0 }} type="dashed" shape="round" ghost><Icon type="login" /> LOGIN</Button>
                                }
                            </Col>
                        </Row>
                    </Header>
                    <Layout>
                        <Side tab={'1'} history={this.props.history} />
                        <Content style={{ background: '#fff', padding: 24, margin: 24, minHeight: 280, }}>
                            <Title><Icon type="shop" theme="twoTone" /> PACKAGES</Title>
                            <Divider dashed />
                            <FormItem label="1. Select Order Date:">
                                <DatePicker placeholder="Select From" onChange={this.onChangeDateFrom} />
                                <DatePicker placeholder="Select To" onChange={this.onChangeDateTo} />
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
                    {
                        this.state.token ? <>
                            <Statistic title="Total" value={this.state.total} precision={2} />
                            <PaypalExpressBtn client={client} currency={'USD'} total={this.state.total} onError={this.onPayPalError} onSuccess={this.onPayPalSuccess} onCancel={this.onPayPalCancel} />
                        </> : <strong>LOGIN TO PURCHASE</strong>
                    }
                </Card>
            </>
        )
    }
}
