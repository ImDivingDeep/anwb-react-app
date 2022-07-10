import React from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet'
import decodePolyline from "decode-google-map-polyline";
import { carIcon, maintenanceIcon } from "./Icons";
import { API_URL } from "./Constants";

class MapView extends React.Component {
    constructor() {
        super();

        this.state = {
            trafficData: []
        };
    }
    componentDidMount() {
        axios.get(`${API_URL}/api`)
        .then(res => {
            Object.keys(res.data).forEach(i => {
                if (res.data[i].Polyline) {
                    res.data[i].Polyline = decodePolyline(res.data[i].Polyline);
                    res.data[i].Polyline.map(item => [item.lat, item.lng]);
                }
                res.data[i].fromLoc = [res.data[i].From_Loc_Lat, res.data[i].From_Loc_Lng];
                res.data[i].toLoc = [res.data[i].To_Loc_Lat, res.data[i].To_Loc_Lng];
            });

            this.setState({ trafficData: res.data})
        });
    }
    render() {
        return (
        <MapContainer center={[52.1326, 5.2913]} zoom={8} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                this.state.trafficData.map((data, i) => {
                    if (data.Polyline) {
                        return (
                            <Polyline key={i} positions={data.Polyline} color='red'>
                                <Popup>
                                    {data.Road} {data.Reason}
                                </Popup>
                            </Polyline>
                        )
                    }
                })
            }
            {
                this.state.trafficData.map((data, i) => {
                    return (
                        <div key={i}>
                            <Marker position={data.fromLoc} icon={data.TrafficType == "Jam" ? carIcon : maintenanceIcon}>
                                <Popup>
                                    {data.Road} {data.Reason}
                                </Popup>
                            </Marker>
                            <Marker position={data.toLoc} icon={data.TrafficType == "Jam" ? carIcon : maintenanceIcon}>
                                <Popup>
                                {   data.Road} {data.Reason}
                                </Popup>
                            </Marker>
                        </div>
                    )
                })
            }
        </MapContainer>
        );
    }
}

export default MapView;