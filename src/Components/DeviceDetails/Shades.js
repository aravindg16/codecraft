import React, { Component } from 'react'
import {observer} from 'mobx-react'
import MdCheckmark from 'react-ionicons/lib/MdCheckmark'
import { state } from '../../state'
import './DeviceDetails.scss'

class Shade extends Component {
    componentDidMount() {
        if(state.activeCheckboxIndex === "") {
            state.activeCheckboxIndex = 0
        }
    }
    onCheckBoxClick = (index) => {
        state.activeCheckboxIndex = index
    }
    render() {
        const { shade, index } = this.props
        const style = {
            "backgroundColor": shade.colorshade
        }
        const activeCheckbox = state.activeCheckboxIndex === index ? 'active' : ''
        return (
            <div className={`checkBoxContainer ${activeCheckbox}`}>
                <div className="checkBox d-flex justify-content-center align-items-center" style={style} onClick={() => this.onCheckBoxClick(index)}>
                    {activeCheckbox && <MdCheckmark style={{fill: "#ffffff", width:"24px", height: "24px"}}/>}
                </div>
            </div>
        )
    }
}

const Shades = observer(Shade)

export { Shades }