import React, { useEffect, useRef, useState } from 'react'
import { BiPause, BiCaretRight, BiReset } from 'react-icons/bi'
import useSetInterval from '../../hooks/useSetInterval'
import './styles.scss'

const SESSION = 'Session'
const BREAK = 'Break'

function Timer({ sessionLength, breakLength }) {
    const [time, setTime] = useState({
        minute: sessionLength,
        second: 0,
    })
    const [isPaused, setIsPaused] = useState(true)

    const [isSessionOrBreak, setIsSessionOrBreak] = useState(SESSION)

    const audioRef = useRef()

    const audioSrc = 'https://www.mediacollege.com/downloads/sound-effects/beep/beep-01.wav'

    useSetInterval(decreaseTimer, 1000, [time, isSessionOrBreak, isPaused])

    useEffect(() => {
        if (isSessionOrBreak === SESSION)
            setTime({
                minute: sessionLength,
                second: 0
            })
        else
            setTime({
                minute: breakLength,
                second: 0
            })
    }, [sessionLength, breakLength])

    function convertNumberTo2DigitNumber(number) {
        return number.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })

    }

    function decreaseTimer() {
        if (isPaused)
            return

        decreaseSecond()
        checkIfSecondIsNegative()
        checkIfTimeIsNegative()
    }

    function decreaseSecond() {
        setTime((time) => {
            return {
                ...time,
                second: time.second - 1,
            }
        })
    }

    function checkIfSecondIsNegative() {
        const isSecondNegative = time.second === 0
        if (isSecondNegative) {
            setTime((time) => {
                return {
                    second: 59,
                    minute: time.minute - 1
                }
            })
        }
    }


    function checkIfTimeIsNegative() {
        const isTimeNegative = time.minute === 0 && time.second === 0
        if (isTimeNegative) {
            playBeepAudio()
            toggleSessionBreak()
        }

    }

    function playBeepAudio() {
        audioRef.current.play()
    }

    function toggleSessionBreak() {
        if (isSessionOrBreak === SESSION) {
            setIsSessionOrBreak(BREAK)
            setTime({
                minute: breakLength,
                second: 0
            })
        } else {
            setIsSessionOrBreak(SESSION)
            setTime({
                minute: sessionLength,
                second: 0
            })
        }
    }

    function togglePause() {
        setIsPaused(!isPaused)
    }

    function resetTimer() {
        if (isSessionOrBreak === SESSION)
            setTime({
                minute: sessionLength,
                second: 0
            })
        else
            setTime({
                minute: breakLength,
                second: 0
            })
    }

    return (
        <div id='timer'>
            <h2 id='timer-label'>{isSessionOrBreak}</h2>
            <p id='time-left'>
                {convertNumberTo2DigitNumber(time.minute)}
                :
                {convertNumberTo2DigitNumber(time.second)}</p>

            <div id='icons-container'>
                {
                    isPaused ? <BiCaretRight id='start_stop' size='3vw' className='icon' onClick={togglePause} />
                        : <BiPause id='start_stop' size='3vw' className='icon' onClick={togglePause} />
                }

                <BiReset className='icon' size='3vw' onClick={resetTimer} />

            </div>

            <audio id='beep' hidden ref={audioRef}>
                <source src={audioSrc} type="audio/mp3" />
            </audio>

        </div>
    )
}

export default Timer