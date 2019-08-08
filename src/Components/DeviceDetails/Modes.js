import React, { Component } from 'react'
import {observer} from 'mobx-react'
import MdCheckmark from 'react-ionicons/lib/MdCheckmark'
import { Row, Col as Column } from 'react-bootstrap'
import { state } from '../../state'
import './DeviceDetails.scss'

class Mode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.mode.intensity,
        }
    }
    componentDidMount() {
        const { mode } = this.props
        if(state.activeModeIndex === "") {
            state.activeModeIndex = 0
            state.intensityValue = mode.intensity
        }
    }
    onModeSelect = (index, intensity) => {
        state.activeModeIndex = index
        state.intensityValue = intensity
    }
    render() {
        const {mode, index} = this.props
        const { image, title, intensity} = mode
        const activeMode = state.activeModeIndex === index ? 'active' : ''
        return (
            <Row noGutters className={`modeList ${activeMode}`} onClick={() => this.onModeSelect(index, intensity)}>
                <Column lg={8} md={8} className="d-flex">
                    <div className="modeIcon">{image}</div>
                    <div className="modeTitle text-capitalize">{title}</div>
                </Column>
                <Column lg={2} md={2} className="intensity">{this.state.value}%</Column>
                <Column lg={2} md={2} className="modeSelect d-flex justify-content-end"><MdCheckmark /></Column>
            </Row>
        )
    }
}

const Modes = observer(Mode)

export { Modes }