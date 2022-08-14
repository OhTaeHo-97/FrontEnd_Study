// hook을 커스텀하는 것
import { useState, useCallback } from 'react';

export const useInput = (initialValue = null) => {
    const [value, setValue] = useState(initialValue); // initialValue를 value에 세팅
    const handler = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    return [value, handler, setValue];
}