import React from "react";
import { SvgProps } from "../interfaces/global-interfaces"

const SearchSvg: React.FC<SvgProps> = ({ className, onClick, style }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={className} onClick={handleClick} style={style}>
      <svg viewBox="0 0 24 24" >
        <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" />
      </svg>
    </div>
  );
};

export default SearchSvg;
