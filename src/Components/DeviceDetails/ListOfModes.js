import React from 'react'
import MdSunny from 'react-ionicons/lib/MdSunny'
import IosMoon from 'react-ionicons/lib/IosMoon'

const MorningIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 320 284">  
            <path d="M316,181H4a4,4,0,0,1-4-4V142a4,4,0,0,1,4-4H84.481a82.031,82.031,0,0,1,151.038,0H316a4,4,0,0,1,4,4v35A4,4,0,0,1,316,181Zm-78.886-78.422a4.006,4.006,0,0,1-5.635-.556L214.338,81.143a4,4,0,0,1,.556-5.631l46.425-38.07a4,4,0,0,1,5.634.555L284.1,58.877a4,4,0,0,1-.556,5.631ZM172.124,68.02H145.093a4,4,0,0,1-4-4V4a4,4,0,0,1,4-4h27.031a4,4,0,0,1,4,4V64.02A4,4,0,0,1,172.124,68.02ZM88.146,102.552a3.956,3.956,0,0,1-5.6.556L36.451,65a4.025,4.025,0,0,1-.552-5.636l17.021-20.9a3.956,3.956,0,0,1,5.6-.556l46.1,38.105a4.026,4.026,0,0,1,.552,5.636ZM64,196H256a4,4,0,0,1,4,4v28a4,4,0,0,1-4,4H64a4,4,0,0,1-4-4V200A4,4,0,0,1,64,196Zm27,54H230a4,4,0,0,1,4,4v26a4,4,0,0,1-4,4H91a4,4,0,0,1-4-4V254A4,4,0,0,1,91,250Z"/>
        </svg>
    )
}

const listOfModes = [
    {
        "image": <MorningIcon />,
        "title": "morning",
        "intensity": 50
    },
    {
        "image": <MdSunny />,
        "title": "day",
        "intensity": 30
    },
    {
        "image": <IosMoon />,
        "title": "night",
        "intensity": 100
    }
]

export default listOfModes