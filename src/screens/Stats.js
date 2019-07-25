import React, { Component } from 'react';
import Side from './Side';
import { Layout, Menu, Form, Icon, Input, Card, Button, Typography, Divider, Row, Col, Statistic } from 'antd';
import { Chart } from "react-google-charts";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Title } = Typography;
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

export default class Stats extends Component {
    constructor(props) {
        super(props);
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
                            <Col span={1}>
                                <Button style={{ right: 0 }} type="dashed" shape="round" ghost><Icon type="logout" /> LOGOUT</Button>
                            </Col>
                        </Row>
                    </Header>
                    <Layout>
                        <Side tab={'4'} history={this.props.history} />
                        <Content style={{ background: '#fff', padding: 24, margin: 24, minHeight: 280, }}>
                            <Title><Icon type="fund" theme="twoTone" /> STATS</Title>
                            <Divider dashed />
                            <Row>
                                <Col span={12}>
                                    <LineChart />
                                </Col>
                                <Col span={6}>
                                    <PieChart />
                                </Col>
                                <Col span={6}>
                                    <Statistic title="Todays Orders" value={93} suffix="/ 100" />
                                </Col>
                            </Row>
                        </Content>
                    </Layout>
                </Layout>
            </>
        )
    }
}

let LineChart = props => {
    return <Chart
        width={'100%'}
        height={'500'}
        chartType="Line"
        loader={<div>Loading Chart</div>}
        data={[
            [
                { type: 'date', label: 'Day' },
                'Average temperature',
            ],
            [new Date(2014, 0), -0.5],
            [new Date(2014, 1), 0.4],
            [new Date(2014, 2), 0.],
            [new Date(2014, 3), 2.9,],
            [new Date(2014, 4), 6.3,],
            [new Date(2014, 5), 9,],
            [new Date(2014, 6), 10.6,],
            [new Date(2014, 7), 10.3,],
            [new Date(2014, 8), 7.4,],
            [new Date(2014, 9), 4.4],
            [new Date(2014, 10), 1.1],
            [new Date(2014, 11), -0.2],
        ]}
        options={{
            chart: {
                title:
                    'Average Temperatures and Daylight in Iceland Throughout the Year',
            },
            width: 900,
            height: 500,
            series: {
                // Gives each series an axis name that matches the Y-axis below.
                0: { axis: 'Temps' },
                1: { axis: 'Daylight' },
            },
            axes: {
                // Adds labels to each axis; they don't have to match the axis names.
                y: {
                    Temps: { label: 'Temps (Celsius)' },
                    Daylight: { label: 'Daylight' },
                },
            },
        }}
        rootProps={{ 'data-testid': '4' }}
    />
}

let PieChart = props => {
    return <Chart
        width={'500px'}
        height={'300px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[
            ['Task', 'Hours per Day'],
            ['Work', 11],
            ['Eat', 2],
            ['Commute', 2],
            ['Watch TV', 2],
            ['Sleep', 7],
        ]}
        options={{
            title: 'My Daily Activities',
        }}
        rootProps={{ 'data-testid': '1' }}
    />
}