import React, { } from 'react'
import { BiCaretUp, BiCaretDown } from 'react-icons/bi'
import './styles.scss'

function LengthCounter({ name, length, setLength }) {
    const nameFirstLetterUpperCase = name.charAt(0).toUpperCase() + name.slice(1)

    function increaseLength() {
        setLength((length) => length + 1)
    }

    function decreaseLength() {
        setLength((length) => length - 1)
    }

    return (
        <div id='length-counter'>
            <h2 id={`${name}-label`}>{nameFirstLetterUpperCase} Length</h2>
            <BiCaretUp id={`${name}-increment`} className='icon' size='2vw' onClick={increaseLength} />
            <BiCaretDown id={`${name}-decrement`} className='icon' size='2vw' onClick={decreaseLength} />
            <span id={`${name}-length`}>{length}</span>
        </div>
    )
}

export default LengthCounter