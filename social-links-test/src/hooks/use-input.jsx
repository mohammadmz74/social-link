import { useState } from "react";

function useInput(validateValue, initValue = "") {
  const [enteredValue, setEnteredValue] = useState(initValue);
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;
  const valueSetHandler = (valueSet) => {
    setEnteredValue(valueSet);
  };
  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  const inputBlurHandler = () => {
    setIsTouched(true);
  };
  const reset = () => {
    setIsTouched(false);
    setEnteredValue("");
  };
  return {
    isValid: valueIsValid,
    value: enteredValue,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    valueSetHandler,
    reset,
  };
}

export default useInput;
