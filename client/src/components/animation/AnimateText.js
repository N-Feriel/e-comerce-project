import React from 'react';
import { useSpring, animated } from "react-spring";


const AnimateText = ({children}) => {

    const style = useSpring({
        opacity: 1,
        position: "absolute",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        from: {
            y: 0,
        },
        to:{
            x : 200
        },
        loop:{
            reverse: true
        },
        config: {
            tension: 200,
            friction: 10,
        },
    });
    return (<animated.div style={style}>
        {children}
    </animated.div>);
}


export default AnimateText;