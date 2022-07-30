import React, { useCallback, useState } from 'react';

const Test1 = () => {
    const [number, setNumber] = useState(0);
    
    const PlusOneEvent = useCallback(() => {
        setNumber(number + 1);
    }, [number]);

    const MinusOneEvent = useCallback(() => {
        setNumber(number - 1);
    }, [number]);

    const oneIncrease = () => {
        setNumber((prev) => prev + 1);
    }

    const oneDecrease = () => {
        setNumber((prev) => prev - 1);
    }

    return (
        <>
            <div>
                <p>{number}</p>
                <button onClick={oneIncrease}>+</button>
                <button onClick={oneDecrease}>-</button>
            </div>
        </>
    )
}

export default Test1;