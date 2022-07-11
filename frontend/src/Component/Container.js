import React from "react";
import classes from "./Container.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Table from "./Table";
import { useState } from "react";
import axios from "axios";
import Popup from "./Popup";
import Form from "./Form";
import url from '../url'


export default function Container() {
  const [data, setdata] = useState();
  const [searchId, setsearchId] = useState("");
  const [searchErr, setsearchErr] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [popupContent, setpopupContent] = useState(<></>);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleGetrequest = (id) => {
    if (id === 0) {
      axios
        .get(url.url, {
          headers: {
            "Content-Type": "application/json",
          }
        })
        .then((res) => {
          const requestedData = res.data;
          console.log(requestedData);
          setdata(requestedData);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(url.url + id + "/", {
          headers: {
            "Content-Type": "application/json",
          }
        })
        .then((res) => {
          const requestedData = res.data;
          console.log(requestedData);
          setdata([requestedData]);
        })
        .catch((err) => {
          setsearchErr(true);
          setpopupContent(<h1>Invalid id</h1>)
          setIsOpen(true);
        });
    }
  };

  const Validator = (id) => {
    return /^\d+$/.test(id);
  };



  const updateBtnHandler=(id)=>{

    const results = data.filter(obj => {
      return obj.id === id;
    });
      console.log(results)
    setpopupContent(<Form title="Update From" sucess="Updated Record" id={id} input_text={results[0].input_text} output_text={results[0].output_text} updateState={handleGetrequest}/>)
    setIsOpen(true);
  }

  const deleteBtnHandler=(id)=>{console.log(id)
    if (id) {
      axios
        .delete(url.url+id+"/")
        .then((res) => {
          const requestedData = res.data;
          setpopupContent(<h3>Deleted</h3>)
          setIsOpen(true);
          setdata(prev=>(prev.filter(obj => {
            return obj.id !== id;
          })))
        })
        .catch((err) => {
          setpopupContent(<h3>Invalid id</h3>)
          setIsOpen(true);
        });
    

    }
  
  }


  const handleSingleGetrequest = (id) => {
    console.log(id);
    console.log(Validator(id));
    if (Validator(id)) {
      setsearchErr(false);
      handleGetrequest(id);
    } else {
      setsearchErr(true);
    }
  };

  const handleEnterEvent = (e) => {
    if (e.key === "Enter") {
      handleSingleGetrequest(searchId);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setsearchErr(false);
    setsearchId(e.target.value);
  };


  const handleCreateEvent=(e) =>{
    setpopupContent(<Form title="Creation From" sucess="Created New Record" updateState={handleGetrequest}/>)
    setIsOpen(true);
  }




  return (
    <div className={classes.container}>
      <div className={classes.header}>Translator</div>
      <div className={classes.btnPanel}>
        <button
          className={classes.button19}
          onClick={() => handleGetrequest(0)}
        >
          Get all
        </button>
        <button className={classes.button19} onClick={handleCreateEvent}>Create One</button>

        <div className={searchErr
                ? classes.searchcontainer  + " " + classes.inputerr
                : classes.searchcontainer 
            }>
          <input
            type="text"
            name="search"
            value={searchId}
            placeholder="Search by id..."
            className={
              searchErr
                ? classes.searchinput + " " + classes.inputerr
                : classes.searchinput
            }
            onChange={handleChange}
            onKeyDown={handleEnterEvent}
          />
          <FontAwesomeIcon
            onClick={() => handleSingleGetrequest(searchId)}
            icon={faSearch}
            style={{ color: "black" }}
          />
        </div>
      </div>

      <div className={classes.displayPanel}>
        {isOpen ? (
          <Popup content={popupContent} handleClose={() => togglePopup()} />
        ) : (
          <></>
        )}

        <Table data={data} deleteHandler={deleteBtnHandler} updateHandler={updateBtnHandler}/>
      </div>
    </div>
  );
}
