import { observable, decorate } from 'mobx'

class State {
    activeIndex = ""
    activeDevice = ""
    isToggleEnabled = true
    activeCheckboxIndex = ""
    activeModeIndex = ""
    intensityValue = ""
    isSidebarActive = true
}

decorate(State,{
    activeIndex: observable ,
    activeDevice: observable,
    isToggleEnabled: observable,
    activeCheckboxIndex: observable,
    activeModeIndex: observable,
    intensityValue: observable,
    isSidebarActive: observable
})

const state = new State()

export default State
export { State, state }