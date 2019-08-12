import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Form } from 'react-advanced-form'
import { Input, Select } from 'react-advanced-form-addons'
import { Modal, Button } from 'react-bootstrap'
import { rules, messages } from './Validation'
import { state } from '../../state'

class NewDevices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'morning',
        };
    }
    handleCancel = () => {
        state.isModalVisible = !state.isModalVisible
    }
    addDevice = async(data) => {
        const { serialized } = data
        console.log('Serialized Data', serialized)
        state.isModalVisible = !state.isModalVisible
    }
    handleChange = (event) => {
        this.setState({value: event.nextValue});
    }
    render() {
        return (
            <Modal
                show={state.isModalVisible}
                className="addNewDevicePopup"
                onHide={this.handleCancel}>
                <Modal.Header className="border-bottom-0 justify-content-center">
                    <Modal.Title className="text-uppercase font-weight-bold">add device</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form className="d-flex flex-column align-items-center" action={this.addDevice} rules={rules} messages={messages}>
                    <label className="formLabel">
                        <div className="font-weight-bolder text-capitalize">Device Name:</div>
                        <Input placeholder="Enter Device Name" type="text" name="devicename" required={true} />
                    </label>
                    <label className="formLabel">
                        <div className="font-weight-bolder text-capitalize">Mode Type:</div>
                        <Select className="my-5" value={this.state.value} onChange={this.handleChange} name="modetype">
                            <option value='morning'>Morning</option>
                            <option value='day'>Day</option>
                            <option value='night'>Night</option>
                        </Select>
                    </label>
                    <label className="formLabel">
                        <div className="font-weight-bolder text-capitalize">Intensity:</div>
                        <Input placeholder="Enter a number between 0 to 100" type="text" name="intensity" required={true} />
                    </label>
                    <div className="buttonWrapper d-flex justify-content-between w-100">
                        <div className="addButton d-flex pb-3">
                            <Button type="submit">Add</Button>
                        </div>
                        <div className="cancelButton d-flex pb-3">
                            <Button onClick={this.handleCancel}>Cancel</Button>
                        </div>
                    </div>
                </Form>
                </Modal.Body>
            </Modal>
        )
    }
}

const NewDevice = observer(NewDevices)

export { NewDevice }