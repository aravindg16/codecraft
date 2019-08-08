import React, { Component } from 'react'
import {observer} from 'mobx-react'
import IosArrowForward from 'react-ionicons/lib/IosArrowForward'
import { state } from '../../state'
import './SideBar.scss'

class SideBarList extends Component {
    onSelectDevice = (index, value) => {
        state.activeIndex = index
        state.activeDevice = value
    }
    componentDidMount() {
        const {title, index, isActive} = this.props
        if(isActive) {
            state.activeIndex = index
            state.activeDevice = title
        }
    }
    render() {
        const { image, title, type, index } = this.props
        const activeDevice = state.activeIndex === index ? 'active' : ''
        return (
            <div className="sideBarListContainer">
                <div className={`sideBarList d-flex align-items-end ${activeDevice}`} onClick={() => this.onSelectDevice(index, title)}>
                    <img className="listImage" src={image} alt={title}/>
                    <div className="titleWrapper flex-column align-items-center">
                        <div className="text-uppercase title">{title}</div>
                        <div className="text-capitalize descriptionContainer"><span className="description">in</span> <span className="usageType">{type}</span></div>
                    </div>
                    {
                        activeDevice && (
                            <div className="selectedArrow d-flex justify-content-center align-items-center">
                                <IosArrowForward />
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

const SideBarLists = observer(SideBarList)

export { SideBarLists }