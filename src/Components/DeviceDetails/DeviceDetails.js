import React, { Component } from 'react'
import { observer } from 'mobx-react'
import MdAdd from 'react-ionicons/lib/MdAdd'
import { state } from '../../state'
import { Shades } from './Shades'
import { Modes } from './Modes'
import { Intensity } from './Intensity'
import listOfShades from './ListOfShades.json'
import listOfModes from './ListOfModes'
import './DeviceDetails.scss'

class DeviceDetail extends Component {
    onToggleSwitch = () => {
        state.isToggleEnabled = !state.isToggleEnabled
    }
    renderListOfShades = (shade, index) => {
        return <Shades shade={shade} index={index} key={shade + index} />
    }
    renderModeList = (mode, index) => {
        return <Modes mode={mode} index={index} key={mode + index} />
    }
    render() {
        const toogleActive = state.isToggleEnabled ? "active" : ""
        const customClass = !state.isSidebarActive ? "active" : ""
        return (
            <>
                <div className={`deviceDetailsWrapper ${customClass}`}>
                <div className={`plusIcon ${customClass}`}>
                <MdAdd style={{width:"30px",height:"30px"}} />
            </div>
            <div className={`deviceTitleWrapper d-flex align-items-center ${customClass}`}>
                <div className="deviceTitle text-uppercase">devices</div>
                <div className="addDevice justify-content-center align-items-center">
                    <MdAdd style={{width:"30px",height:"30px"}} />
                </div>
            </div>
                    <div className="selectedDeviceWrapper d-flex justify-content-between align-items-center">
                        <div className="selectedDeviceTitle text-uppercase">{state.activeDevice}</div>
                        <div className={`toggleButton d-flex align-items-center ${toogleActive}`} onClick={this.onToggleSwitch}>
                            <div className="switchButton"></div>
                        </div>
                    </div>
                    <div className="shadesWrapper">
                        <div className="headingWrapper d-flex align-items-center">
                            <div className="title text-uppercase">shades</div>
                            <div className="dash"></div>
                        </div>
                        <div className="checkBoxWrapper d-flex align-items-center">
                            {listOfShades.map(this.renderListOfShades)}
                        </div>
                    </div>
                    <div className="modesWrapper">
                        <div className="headingWrapper d-flex align-items-center">
                            <div className="title text-uppercase">modes</div>
                            <div className="dash"></div>
                        </div>
                        <div className="modeListContainer">
                            {listOfModes.map(this.renderModeList)}
                        </div>
                    </div>
                    <Intensity value={state.intensityValue}/>
                </div>
            </>
        )
    }
}

const DeviceDetails = observer(DeviceDetail)

export { DeviceDetails }