import { useRef } from "react";
import { useEffect, useState } from "react";

export default function (callback) {
    const [page, setpage] = useState(1)


    const observer = useRef(
        new IntersectionObserver(
            (entries, observe) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        callback()
                        setpage(page => page + 1)
                        observe.unobserve(entry.target)
                    }
                });
            })
    );


    return { observer: observer.current, page, setpage, }
}