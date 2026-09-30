import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {

  const API = "http://localhost:3000/students";

  const [allData, setAllData] = useState([]);
  const [currentData, setCurrentData] = useState(1);
  const [perpageData, setPerpageData] = useState(5);

  useEffect(() => {
    fetch(API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setAllData(data);
      });
  }, []);

  let lastIndex = currentData * perpageData;
  let firstIndex = lastIndex - perpageData;

  let currentStudents = allData.slice(firstIndex, lastIndex);

  let totalData = Math.ceil(allData.length / perpageData);

  return (
    <div className="main-page">

      <div className="container py-5">

        <div className="heading-box text-center mb-4">
          <h1>Student Management System</h1>
          <p> Student academic performance </p>
        </div>

        <div className="student-card shadow-lg">

          <div className="table-responsive">

            <table className="table student-table align-middle text-center mb-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>DSA</th>
                  <th>Maths</th>
                  <th>DBMA</th>
                  <th>Networking</th>
                </tr>
              </thead>

              <tbody>
                {currentStudents.map((element, index) => {
                  return (
                    <tr key={index}>
                      <td> <span className="id-badge"> {element.id} </span> </td>
                      <td className="student-name">{element.name}</td>
                      <td>{element.dsa}</td>
                      <td>{element.maths}</td>
                      <td>{element.dbma}</td>
                      <td>{element.networking}</td>
                    </tr>
                  );
                })}

                <tr className="pagination-row">
                  <td colSpan="6">
                    <div className="pagination-area">
                      <div className="page-select">
                        <span> Rows per page: </span>
                        <select className="form-select form-select-sm" value={perpageData} onChange={(e) => { setPerpageData(e.target.value); }} >
                          <option>5</option>
                          <option>10</option>
                          <option>25</option>
                          <option>50</option>
                          <option>100</option>
                        </select>

                      </div>

                      <div className="page-navigation">
                        <span className="page-info"> {firstIndex + 1} - {lastIndex} of 100 </span>

                        <button className="btn page-btn" disabled={currentData == 1} onClick={() => setCurrentData(currentData - 1) } > &lt; </button>

                        <button className="btn page-btn" disabled={currentData === totalData} onClick={() => setCurrentData(currentData + 1) } > &gt; </button>
                        
                      </div>

                    </div>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;