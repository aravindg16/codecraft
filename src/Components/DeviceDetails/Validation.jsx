const rules = {
    name: {
        devicename: ({ value }) => {
            const matchCase = value.match(/^([a-zA-Z\s]{2,20})$/)
            return matchCase && matchCase.length > 0 ? true : false
        },
        intensity: ({ value }) => {
            const matchCase = value.match(/^0*(?:[0-9][0-9]?|100)$/)
            return matchCase && matchCase.length > 0 ? true : false
        },
    },
}

const messages = {
    name: {
        devicename: {
            missing: 'Device Name cannot be empty',
            invalid: 'Invalid Device name',
        },
        intensity: {
            missing: 'Intensity cannot be empty',
            invalid: 'Invalid Intensity, Please enter a number between 0 to 100',
        },
    },
}

export { rules, messages }