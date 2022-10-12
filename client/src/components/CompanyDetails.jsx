import React, { useState } from "react";

function CompanyDetails() {
  function clickHandler(event) {
    setValues({ ...values, importance: event.target.innerHTML });
    let allSpan = document.getElementsByClassName("importance-box");

    for (let i = 0; i < allSpan.length; i++) {
      const element = allSpan[i];

      if (allSpan.length <= 5) {
        element.classList.remove("clicked");
      } else if (
        allSpan.length <= 10 &&
        i >= 5 &&
        element.classList.contains("clicked")
      ) {
        element.classList.remove("clicked");
      } else if (
        allSpan.length <= 15 &&
        i >= 10 &&
        element.classList.contains("clicked")
      ) {
        element.classList.remove("clicked");
      }
    }
    event.target.classList.add("clicked");
  }

  const [values, setValues] = useState({
    department: "Finance",
    importance: "",
    employee: 0,
  });
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <div className="org-details">
      <div className="upper">
        <label>
          Department
          <br />
          <select onChange={handleChange} name="department" id="department">
            <option value="Finance">Finance</option>
            <option value="department1">department1</option>
            <option value="department2">department2</option>
            <option value="department3">department3</option>
            <option value="department4">department4</option>
          </select>
        </label>
        <br />
        <label>
          Importance
          <br />
          <span onClick={clickHandler} className="importance-box">
            1
          </span>
          <span onClick={clickHandler} className="importance-box">
            2
          </span>
          <span onClick={clickHandler} className="importance-box">
            3
          </span>
          <span onClick={clickHandler} className="importance-box">
            4
          </span>
          <span onClick={clickHandler} className="importance-box">
            5
          </span>
        </label>
      </div>
      <label>
        Number of employees
        <br />
        <input
          onChange={handleChange}
          type="number"
          placeholder="2"
          name="employee"
          id="employee"
        />
      </label>
    </div>
  );
}

export default CompanyDetails;
