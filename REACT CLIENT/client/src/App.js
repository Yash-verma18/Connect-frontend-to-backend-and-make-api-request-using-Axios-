import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [tableData, setTableData] = useState([]);
  const [name, setName] = useState("");

  // Get request to NODE LOCAL HOST SERVER
  // const doGetReq = () => {
  //   axios.get(`http://localhost:5000/`).then((res) => {
  //     const data = res.data;
  //     setTableData(data);
  //   });
  // };

  // doGetReq();

  const handleChange = (e) => {
    const fieldValue = e.target.value;
    setName(fieldValue);
  };

  // POST request to NODE LOCAL HOST SERVER
  const handleClick = (e) => {
    e.preventDefault();

    const user = { fullname: name };

    // console.log(user);

    axios.post(`http://localhost:5000/`, user).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };

  return (
    <div className="App">
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>THIRTY DAY SALES</th>
              <th>THIRTY DAY AVERAGE PRICE</th>
              <th>EXTERNAL URL </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((userData) => {
              return (
                <tr>
                  <td>{userData.name}</td>
                  <td>{userData.thirty_day_sales}</td>
                  <td>{userData.thirty_day_average_price}</td>
                  <td>{userData.external_url}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="app-container ">
          <form>
            <input
              type="text"
              placeholder="Type Your Name"
              name="fullname"
              onChange={handleChange}
            ></input>
            <button type="submit" onClick={handleClick}>
              Add Name
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
