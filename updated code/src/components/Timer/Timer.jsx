import React, { useEffect, useRef, useContext } from 'react'
// import './styles.css'
import { Context } from '../../context/kartItemContext';



export default function Timer({ statusTimer, secondsRemaining, setSecondsRemaining, status, setStatus, setTimer, handleReset, handleStop, setCountMin, setCountSec }) {
    const { activeColor } = useContext(Context);


    const secondsToDisplay = secondsRemaining % 60
    const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60
    const minutesToDisplay = minutesRemaining % 60
    // const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60


    useInterval(
        () => {
            if (secondsRemaining > 0) {
                setSecondsRemaining(secondsRemaining - 1)
               
            } else {
                setStatus(statusTimer.STOPPED)
                setTimer(false)
                handleReset();
                // localStorage.removeItem("timeBeforeRefresh");
            }
        },
        status === statusTimer.STARTED ? 1000 : null,
        // passing null stops the interval
    )

    useEffect(()=>{
        setCountMin(twoDigits(minutesToDisplay));
        setCountSec(twoDigits(secondsToDisplay))
        window.onbeforeunload = function () {
            //on refresh the page to save the time in localsorage and on new load to insert into variable in kartItemContext
            // eslint-disable-next-line
            if (minutesToDisplay !== 0 && secondsToDisplay !== 0 || minutesToDisplay === 0 && secondsToDisplay !== 0){
                handleStop();
                // localStorage.setItem("timeBeforeRefresh", `${twoDigits(minutesToDisplay)}:${twoDigits(secondsToDisplay) }`);
            }
        };
    })
    return (
        <span style={{ color: `${activeColor}` }}>
            {/* {twoDigits(hoursToDisplay)}: */}
            {twoDigits(minutesToDisplay)}:
            {twoDigits(secondsToDisplay)}
        </span>
    )
}

// source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
    const savedCallback = useRef()

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    
    }, [callback])

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current()
        }
        if (delay !== null) {
            let id = setInterval(tick, delay)
            return () => clearInterval(id)
        }
      
    }, [delay])
}
const twoDigits = (num) => String(num).padStart(2, '0')
