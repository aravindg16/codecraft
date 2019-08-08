import React, { Component } from 'react'
import listOfDevices from './ListOfDevice'
import { SideBarLists } from './SideBarList'
import './SideBar.scss'

class SideBar extends Component {
    renderSideBarList = (device, index) => {
        return <SideBarLists index={index} {...device} />
    }
    render() {
        return (
            <div className="sideBarContainer">
                <div className="sideBar">
                    <div className="sideBarPanel">
                        {listOfDevices.map(this.renderSideBarList)}
                    </div>
                </div>
            </div>
        )
    }
}

export { SideBar }