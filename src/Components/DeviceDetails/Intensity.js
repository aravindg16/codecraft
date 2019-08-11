import React, { Component, createRef, Fragment } from 'react'
import {observer} from 'mobx-react'
import { state } from '../../state'
import './DeviceDetails.scss'

const IS_BROWSER = typeof window === 'object'

class RangeIntensity extends Component {
    static defaultProps = {
        value: 0
    }
    constructor(props) {
        super(props)
        const { value } = props
        this.arcSize = 180
        this.state = {
            value,
            angle: this.valueToAngle(value),
            radius: 100
        }
        this.strokeWidth = 5
        this.touches = []
        this.allowChange = false
        this.isDrag = false
        this.allowClick = true
        this.rangeSliderArc = createRef()
        this.rangeSelector = createRef()
    }
    
    componentWillReceiveProps(props) {
        if (this.state.value !== props.value) {
            const value = props.value;
            this.setState({ 
                value,
                angle: this.valueToAngle(value)
            })
            state.intensityValue = value
        }
    }
    
    componentDidMount() {
        if (this.allowClick && this.rangeSliderArc.current) {
            this.rangeSliderArc.current.style.pointerEvents = 'none'
        }
        this.updateDimensions()
        window.addEventListener("resize", this.updateDimensions);
    }

    updateDimensions = () => {
        let radius = 120
        if(IS_BROWSER && window.innerWidth > 991) {
            radius = 130
        }
        if(IS_BROWSER && window.innerWidth < 768) {
            radius = 77.5
        }
        this.setState({
            radius: radius
        })
      }
    
    up = e => {
        if (this.allowClick && this.rangeSliderArc.current) {
            this.rangeSliderArc.current.style.pointerEvents = 'none'
        }
        this.allowChange = false
        this.isDrag = false
        this.touches = []
        e.stopPropagation()
        this.props.onAfterChange && this.props.onAfterChange(this.value, this.props)
    }
    
    getTouchMove = e => {
        e.stopPropagation()
        if (this.allowChange || this.isDrag) {
            let idx = 0
            for (let index = 0; index < e.changedTouches.length; index++) {
            const t = e.changedTouches[index]
                if (t.identifier >= 0) {
                    this.touches = [t]
                    this.updateValue(this.touches[idx])
                }
            }
        }
    }
    
    down = e => {
        if (this.rangeSliderArc.current) {
            this.rangeSliderArc.current.style.pointerEvents = 'auto'
        }
        e.stopPropagation()
        if (!this.isDrag && e.clientX) {
            this.updateValue(e, true)
        }
        this.allowChange = true
        this.isDrag = true
        if (e.changedTouches) {
            this.touches.push(...e.changedTouches)
        }
    }
    
    getArc = (startAngle, endAngle) => {
        const pathRadius = this.state.radius - this.strokeWidth / 2
        const start = this.polarToCartesian(pathRadius,startAngle)
        const end = this.polarToCartesian(pathRadius,endAngle)
        const arcSweep = startAngle <= 180 ? 0 : 1
        return `M ${start} A ${pathRadius} ${pathRadius} 0 ${arcSweep} 0 ${end}`
    }
      
    polarToCartesian(pathRadius, angle) {
        const angleInRadians = (angle - 180) * (Math.PI / 180)
        const x = this.state.radius + pathRadius * Math.cos(angleInRadians)
        const y = this.state.radius + pathRadius * Math.sin(angleInRadians)
        return x + ' ' + y
    }
    
    angle(y, x) {
        const radiantToDegree = Math.atan2(y, x) * (180 / Math.PI) 
        let angle = radiantToDegree + 180
        if (angle > 360) {
            angle = angle - 360
        }
        if (angle < 0) {
            angle = 360 + angle
        }
        return angle
    }
    
    angleToValue = angle => {
        const angleToValue = (angle / this.arcSize) * 100
        return angleToValue
    }
    
    valueToAngle = value => {
        const valueToAngle = (value / 100) * this.arcSize
        return valueToAngle
    }
    
    stepRounding(degree) {
        const { angle: oldAngle } = this.state
        let angleToValue = 0
        if (!this.isDrag) {
            angleToValue = this.angleToValue(degree)
        }
        else {
            angleToValue = this.angleToValue(
            oldAngle > this.arcSize - 20 && degree < this.arcSize / 4
                ? Math.max(degree, this.arcSize)
                : oldAngle < 20 && degree > this.arcSize - 20
                ? Math.min(degree, 0)
                : degree
            )
        }
        const currVal =  angleToValue + 1
        const nextVal = currVal > 100 ? 100 : currVal
        let value = 0 < nextVal - angleToValue ? angleToValue : nextVal
        value = Math.round(value)
        const ang = this.valueToAngle(value)
        return { value, angle: ang }
    }
    
    updateValue = (event, forceSet) => {
        if (!this.isDrag && !forceSet) {
            return
        }
        const { clientX, clientY } = event
        const rect = this.rangeSliderArc.current.getBoundingClientRect()
        const top = rect.top + this.state.radius
        const left = rect.left + this.state.radius
        const x = clientX - left
        const y = clientY - top
        const { value, angle } = this.stepRounding(this.angle(y, x))
        this.setState({ value, angle })
        state.intensityValue = value
        this.props.onChange && this.props.onChange(value, this.props)
    }
    render() {
        const { angle } = this.state
        const styleRotation = {
            ransform: 'rotate(0deg)',
            transformOrigin: '50% 50%'
        }
        const size = this.state.radius * 2
        return (
            <div className="IntensityWrapper">
                <div className="headingWrapper d-flex align-items-center">
                    <div className="title text-uppercase">intensity</div>
                    <div className="dash"></div>
                </div>
                <div className={`rangeSlider ${this.allowClick ? 'allowClick' : ''}`}
                    onMouseMove={e => this.allowChange && this.updateValue(e, false)}
                    onMouseUp={this.up}
                    onMouseDown={this.down}
                    onTouchMove={this.getTouchMove}
                    onTouchEnd={this.up}
                    onTouchCancel={this.up}>
                    <Fragment>
                        <svg ref={this.rangeSliderArc} width={size} height={size}>
                            <defs>
                                <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#AD6BFF"></stop>
                                    <stop offset="100%" stopColor="#74BCF7"></stop>
                                </linearGradient>
                            </defs>
        
                            <path
                                fill="transparent"
                                strokeDashoffset="0"
                                strokeWidth={this.strokeWidth}
                                stroke="#ccc"
                                style={styleRotation}
                                d={this.getArc(Math.min(this.arcSize, 359.9999), 0)}
                            />
                            <path
                                fill="none"
                                strokeWidth={this.strokeWidth}
                                stroke="url(#linear)"
                                style={styleRotation}
                                d={this.getArc(Math.min(angle, 359.9999), 0)}
                            />
                        </svg>
                        <div
                            ref={this.rangeSelector}
                            className="rangeSelector"
                            onMouseDown={this.down}
                            onTouchStart={this.down}
                            onMouseUp={this.up}
                            style={{
                                transform: `rotate(${angle}deg) scaleX(-1)`
                            }}
                        />
                    </Fragment>
                </div>
                <div className="rangeText d-flex justify-content-center">{this.state.value}</div>
            </div>
        )
    }
}

const Intensity = observer(RangeIntensity)

export { Intensity }