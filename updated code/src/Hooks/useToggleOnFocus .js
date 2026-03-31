import {  useMemo,  useState } from "react";

export const useToggleOnFocus = (initialState = false) => {
    const [showElem, toggleElem] = useState(initialState);

    const eventHandlers = useMemo(() => ({
        onFocus: () => toggleElem(true),
        onBlur: () => toggleElem(false),
    }), []);

    return [showElem, eventHandlers];
}