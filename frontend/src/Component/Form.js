import React from "react";
import classes from "./Container.module.css";
import { useState, useReducer } from "react";
import axios from "axios";

const validateString = (value) => {
  if (typeof value !== "undefined" && value.trim().length > 0) {
    if (typeof value !== "undefined" && isNaN(value)) {
      return true;
    }
  }
  return false;
};

const inputReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    
    return { value: action.val, isValid: validateString(action.val) };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: validateString(state.value) };
  }
  if (action.type === "RESET") {
    return { value: "", isValid: false };
  }
  return { value: "", isValid: false };
};



export default function Form(props) {
  const [created, setCreated] = useState(false);
  const [inputTextState, dispatchInput] = useReducer(inputReducer, {
    value: props.input_text,
    isValid: true,
  });
  const [outputTextState, dispatchOutput] = useReducer(inputReducer, {
    value: props.output_text,
    isValid: true,
  });



  //Handlers
  const inputChangeHandler = (event) => {
    dispatchInput({ type: "USER_INPUT", val: event.target.value });
  };

  const validateInputHandler = () => {
    dispatchInput({ type: "INPUT_BLUR" });
  };

  const outputChangeHandler = (event) => {
    dispatchOutput({ type: "USER_INPUT", val: event.target.value });
  };

  const validateoutputHandler = () => {
    dispatchOutput({ type: "INPUT_BLUR" });
  };

  const submitionHandler = () => {
    if (inputTextState.isValid && outputTextState.isValid) {
      const payload = {
        input_text: inputTextState.value.trim(),
        output_text: outputTextState.value.trim(),
      };
      if (props.id) {
        axios
          .put("http://127.0.0.1:8000/translations/" + props.id + "/", payload)
          .then((res) => {
            const requestedData = res.data;
            setCreated(true);
            props.updateState(0);
          })
          .catch((err) => {
            dispatchOutput({ type: "INPUT_BLUR" });
            dispatchInput({ type: "INPUT_BLUR" });
          });
      } else {
        axios
          .post("http://127.0.0.1:8000/translations/", payload)
          .then((res) => {
            const requestedData = res.data;
            setCreated(true);
            props.updateState(0);
          })
          .catch((err) => {
            dispatchOutput({ type: "RESET" });
            dispatchInput({ type: "RESET" });
          });
      }
    }
  };

  return (
    <>
      <h2>{props.title}</h2>
      {created ? <h3>{props.sucess}</h3> : <></>}
      <div style={created ? { display: "none" } : {}}>
        <div
          className={
            !inputTextState.isValid
              ? classes.searchcontainer + " " + classes.inputerr
              : classes.searchcontainer
          }
        >
          <input
            type="text"
            name="input"
            value={inputTextState.value}
            className={classes.searchinput}
            onChange={inputChangeHandler}
            onBlur={validateInputHandler}
            placeholder="Enter input text..."
          />
        </div>
        <div
          className={
            !outputTextState.isValid
              ? classes.searchcontainer + " " + classes.inputerr
              : classes.searchcontainer
          }
        >
          <input
            type="text"
            name="output"
            value={outputTextState.value}
            onChange={outputChangeHandler}
            onBlur={validateoutputHandler}
            className={classes.searchinput}
            //value=""
            placeholder="Enter output text..."
          />
        </div>
        <button className={classes.button19} onClick={() => submitionHandler()}>
          Submit
        </button>
      </div>
    </>
  );
}
