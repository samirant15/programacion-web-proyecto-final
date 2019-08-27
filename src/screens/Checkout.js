import React, { Component } from 'react';
import Side from './Side';
import { Layout, Menu, Breadcrumb, Icon, Descriptions, Button, Typography, Divider, Row, Col, notification } from 'antd';
import moment from 'moment';
const { Header, Content, Sider } = Layout;
const { Title } = Typography;

export default class Checkout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: { name: '' },
            order: props.order
        }
    }

    async componentDidMount() {
        try {
            let user = await localStorage.getItem('user');
            this.setState({ user: JSON.parse(user) });
        } catch (error) {

        }
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.props.history.push("/");
        notification.error({ message: 'YOU HAVE BEEN LOGED OUT!' })
    }

    render() {
        console.log(this.props.order)
        let order = this.props.order
        return (
            <Descriptions title="Order info" bordered>
                <Descriptions.Item label="Client" span={2}>{`${this.state.user.email}`}</Descriptions.Item>
                <Descriptions.Item label="Order Date" span={2}>{moment.unix(order.orderDate / 1000).format('YYYY-MM-DD')}</Descriptions.Item>
                <Descriptions.Item label="From">{moment.unix(order.from).format('YYYY-MM-DD')}</Descriptions.Item>
                <Descriptions.Item label="To">{moment.unix(order.to).format('YYYY-MM-DD')}</Descriptions.Item>
                <Descriptions.Item label="Asigned" span={3}>{`${order.employee.firstName} ${order.employee.lastName}`}</Descriptions.Item>
                <Descriptions.Item label="Packages">
                    {order.orderDetailsList.map(o => { return (<p><strong>{o.name}</strong><br />{o.description} USD${o.cost}</p>) })}
                </Descriptions.Item>
            </Descriptions>
        )
    }
}
