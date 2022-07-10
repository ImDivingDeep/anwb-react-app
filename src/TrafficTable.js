import { Table } from "react-bootstrap";
import axios from "axios";
import React from 'react';
import { API_URL } from "./Constants";

class TrafficTable extends React.Component {
    constructor() {
        super();

        this.state = {
            trafficData: []
        };

        axios.get(`${API_URL}/api`)
        .then(res => {
            this.state.trafficData = res.data;
            this.setState({ trafficData: res.data })
        });
    }
    render() {
        return (
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Road</th>
                        <th>Type</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Distance</th>
                        <th>Delay</th>
                        <th>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.trafficData.map((data, i) => {
                        return (
                            <tr key={data.ID}>
                                <td>{data.Road}</td>
                                <td>{data.TrafficType}</td>
                                <td>{data.From_Location}</td>
                                <td>{data.To_Location}</td>
                                <td>{data.Distance != null ? data.Distance / 1000 + "  km" : ''}</td>
                                <td>{data.Delay != null ? data.Delay / 60 + "  min" : ''}</td>
                                <td>{data.Reason}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        );
    }
}

export default TrafficTable;