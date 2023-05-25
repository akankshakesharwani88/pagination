import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [user, setUser] = useState([]);
  const [userPerPage, setUserPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => setUser(response.data));
  }, []);

  const totalNumPage = Math.ceil(user.length / userPerPage);
  const pages = [...Array(totalNumPage + 1).keys()].slice(1);
  const indexOfLastUser = currentPage * userPerPage;
  const indexOfFirstUser = indexOfLastUser - userPerPage;
  const visibleTodo = user.slice(indexOfFirstUser, indexOfLastUser);

  const previousPageHandler = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const nextPageHandler = () => {
    if (currentPage !== totalNumPage) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <select onChange={(e) => setUserPerPage(Number(e.target.value))}>
        <option value="10">10</option>
        <option value="30">30</option>
        <option value="50">50</option>
      </select>
      <div className="App">
        {visibleTodo.map((item) => (
          <p key={item.id}>{item.title}</p>
        ))}
        <p onClick={previousPageHandler}>prev</p>
        <p>
          {pages.map((page) => (
            <span
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`${currentPage === page ? "active" : ""}`}
            >
              {`${page}| `}
            </span>
          ))}
        </p>
        <p onClick={nextPageHandler}>next</p>
      </div>
    </>
  );
}
