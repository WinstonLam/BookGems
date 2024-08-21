import React, { useState, ReactNode } from "react";

import { AnimatedDivProps } from "../interfaces/global-interfaces"
import styles from "../styles/AnimatedDivStyles"



const AnimatedDiv: React.FC<AnimatedDivProps> = ({
    children,
    baseStyle = {},
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const combinedStyle: React.CSSProperties = {
        ...baseStyle,
        ...(isHovered ? styles.hover : {}),
        ...(isActive ? styles.active : {}),
    };

    return (
        <div
            style={combinedStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseDown={() => setIsActive(true)}
            onMouseUp={() => setIsActive(false)}
        >
            {children}
        </div>
    );
};

export default AnimatedDiv;