import {useState} from "react";

export const useCache = (key, _default) => {
    const storage = localStorage
    const [value, setValue] = useState(storage[key] || _default)
    key && storage.setItem(key, value)

    const {isOpen} = storage
    const setOpen = () => storage.setItem("isOpen", true)

    return {storage, setValue, setOpen, isOpen}
}