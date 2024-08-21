import React from "react";
import { Link, useNavigate } from "react-router-dom";
import GearSvg from "../icons/Gear";
import styles from "../styles/HeaderStyles";
import AnimatedDiv from "../components/AnimatedDiv";

const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div style={styles.header}>
            <div style={styles.headerContent}>
                <AnimatedDiv baseStyle={styles.headerLogo}>
                    <div onClick={() => navigate("/")}>
                        <h2>BookGems</h2>
                        {/* <img src={logo} alt="logo" style={styles.logoIcon} /> */}
                    </div>
                </AnimatedDiv>

                <nav>
                    <AnimatedDiv baseStyle={styles.headerItem}>
                        <Link to="/create" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Create Book
                        </Link>
                    </AnimatedDiv>
                    <AnimatedDiv baseStyle={styles.headerItem}>
                        <Link to="/overview" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Book Overview
                        </Link>
                    </AnimatedDiv>
                </nav>

                <AnimatedDiv baseStyle={styles.headerGearIcon}>
                    <GearSvg className="gear-icon" onClick={() => { }} />
                </AnimatedDiv>
            </div>
        </div>
    );
};

export default Header;
