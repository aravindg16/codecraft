import React, { Component } from 'react'
import { Row } from 'react-bootstrap'
import { SideBar, DeviceDetails } from '../Components'

class Devices extends Component {
    render() {
        return (
            <Row noGutters>
                <SideBar />
                <DeviceDetails />
            </Row>
        )
    }
}

export { Devices }