import React, { Component } from 'react'
import { observer } from 'mobx-react'
import listOfDevices from './ListOfDevice'
import MdArrowBack from 'react-ionicons/lib/MdArrowBack'
import { SideBarLists } from './SideBarList'
import { state } from '../../state'
import './SideBar.scss'

class Sidebar extends Component {
    toggleSideBar = () => {
        state.isSidebarActive = !state.isSidebarActive
    }
    renderSideBarList = (device, index) => {
        return <SideBarLists index={index} {...device} key={device + index} />
    }
    render() {
        const styleClassName = state.isSidebarActive ? "" : "inactive"
        return (
            <div className="sideBarContainer">
                <div className={`sideBarOpenCloseIcon ${styleClassName}`} onClick={this.toggleSideBar}>
                    <MdArrowBack style={{width:"30px",height:"30px"}} />
                </div>
                <div className={`sideBar ${styleClassName}`}>
                    <div className="sideBarPanel">
                        {listOfDevices.map(this.renderSideBarList)}
                    </div>
                </div>
            </div>
        )
    }
}

const SideBar = observer(Sidebar)

export { SideBar }