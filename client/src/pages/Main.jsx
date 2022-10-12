import React from "react";
import "./Main.css";
import CompanyDetails from "../components/CompanyDetails";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Main() {
  const [values, setValues] = useState({
    companyName: "",
    website: "",
    city: "",
    country: "Finland",
    industry: "Commerce",
    budget: "",
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [departmentList, setDepartmentList] = useState([
    <CompanyDetails key={0} />,
  ]);
  const [count, setCount] = useState(1);
  function addHandler() {
    setCount(count + 1);
    if (count < 3) {
      const departmentName = "department" + count;
      const importanceName = "importance" + count;
      const employeeName = "employee" + count;

      setValues({
        ...values,
        [departmentName]: "",
        [importanceName]: "",
        [employeeName]: "",
      });
      setDepartmentList((departmentList) => {
        return [...departmentList, <CompanyDetails key={count} />];
      });
    } else {
      toast.error("max is 3", toastOptions);
    }
  }

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <div className="main">
      <h1 className="main-title">Tell us about your company📝 </h1>
      <h3 className="main-details-title">General Details</h3>

      <label htmlFor="company-name">Company name</label>
      <br />
      <input
        placeholder="First name"
        onChange={handleChange}
        value={values.companyName}
        type="text"
        name="companyName"
        id="company-name"
      />
      <br />
      <label htmlFor="website">Website (Optional)</label>
      <br />
      <input
        placeholder="example.com"
        value={values.website}
        onChange={handleChange}
        type="text"
        name="website"
        id="website"
      />
      <div className="location">
        <label>
          City
          <br />
          <input
            placeholder="City"
            value={values.city}
            onChange={handleChange}
            type="text"
            name="city"
            id="city"
          />
        </label>
        <label>
          Country
          <br />
          <select onChange={handleChange} name="country" id="country">
            <option value="Finland">Finland</option>
            <option value="Germany">Germany</option>
            <option value="Georgia">Georgia</option>
            <option value="Usa">Usa</option>
            <option value="France">France</option>
          </select>
        </label>
      </div>
      <label>
        Indusry
        <br />
        <select onChange={handleChange} name="industry" id="industry">
          <option value="">Commerce</option>
          <option value="industry1">industry1</option>
          <option value="industry2">industry2</option>
          <option value="industry3">industry3</option>
          <option value="industry4">industry4</option>
        </select>
      </label>

      <div className="org-details-container">
        <h1 className="org-details-title">Organizational Details</h1>
        {departmentList}
        <button onClick={addHandler} className="add-department">
          + Add another department
        </button>
      </div>

      <div className="budget">
        <label>
          Budget
          <br />
          <input
            onChange={handleChange}
            value={values.budget}
            type="number"
            placeholder="$500"
            name="budget"
            id="budget"
          />
        </label>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Main;
