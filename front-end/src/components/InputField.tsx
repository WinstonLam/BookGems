import React, { useState, useEffect } from "react";
import InputFieldProps from "../interfaces/global-interfaces";
import EyeSvg from "../icons/Eye";
import styles from "../styles/InputField";

const InputField: React.FC<InputFieldProps> = ({
  value,
  label,
  id,
  required,
  submitted,
  onChange,
  sensitive,
  limit,
  strict,
  disbabled,
  span,
}) => {
  const [hasValue, setHasValue] = useState(value !== "");
  const [showValue, setShowValue] = useState(sensitive === true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(span || "");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    setHasValue(value !== "");
  }, [value]);

  useEffect(() => {
    if (submitted && !hasValue && required) {
      setError(true);
      setMessage("This field is required");
    } else if (submitted && span) {
      setError(true);
      setMessage(span);
    } else {
      setError(false);
      setMessage("");
    }
  }, [submitted, hasValue, required, span]);

  const checkValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event.target.value);
    setHasValue(event.target.value !== "");

    if (strict === "digit" && !/^\d*$/.test(event.target.value)) {
      setError(true);
      setMessage("Input must only contain digits");
    } else {
      setError(false);
      setMessage(span || "");
    }
  };

  const handleFocus = () => {
    setFocused(true);
    setError(false);
    setMessage(span || "");
  };

  const toggleShowValue = () => {
    setShowValue(!showValue);
  };

  return (
    <div
      className={`input-field${required ? "" : "-optional"}`}
      style={required ? styles.inputField : styles.inputFieldOptional}
    >
      <input
        value={value}
        type={!showValue ? "text" : "password"}
        id={id}
        onChange={checkValue}
        onFocus={handleFocus}
        onBlur={() => setFocused(false)}
        className={hasValue ? "has-value" : ""}
        maxLength={limit ? limit : 25}
        disabled={disbabled}
        style={styles.input}
      />
      <label
        htmlFor={id}
        style={hasValue || focused ? styles.labelHasValue : styles.label}
      >
        {label}
      </label>
      <div style={error ? styles.inputErrorShow : styles.inputError}>
        {message}
      </div>
      {sensitive && (
        <EyeSvg
          onClick={toggleShowValue}
          className={showValue ? "eye-show" : "eye-hide"}
          style={showValue ? styles.eyeShow : styles.eyeHide}
        />
      )}
    </div>
  );
};

export default InputField;
