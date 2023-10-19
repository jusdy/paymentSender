import { useState } from "react";

const useStateWithCallback = (initialValue: any) => {
    const [value, setValue] = useState(initialValue);

    const setValueAndCallback = (newValue: any, callback: any) => {
        setValue((prevValue: any) => {
            if (callback) {
                callback(prevValue, newValue);
            }
            return newValue;
        });
    };

    return [value, setValueAndCallback];
}

export { useStateWithCallback};