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
    componentWillReceiveProps() {
        const { index } = this.props
        if(state.activeModeIndex === index) {
            this.setState({
                value: state.intensityValue
            })
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
        const { image, title } = mode
        const activeMode = state.activeModeIndex === index ? 'active' : ''
        return (
            <Row noGutters className={`modeList ${activeMode}`} onClick={() => this.onModeSelect(index, this.state.value)}>
                <Column lg={8} md={8} sm={10} xs={10} className="d-flex">
                    <div className="modeIcon">{image}</div>
                    <div className="modeTitle text-capitalize">{title}</div>
                </Column>
                <Column lg={2} md={2} className="intensity">{this.state.value}%</Column>
                <Column lg={2} md={2} sm={2} xs={2} className="modeSelect d-flex justify-content-end"><MdCheckmark /></Column>
            </Row>
        )
    }
}

const Modes = observer(Mode)

export { Modes }