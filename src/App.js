import React, { useState, useEffect } from "react";
import Modal from "./components/modal";

const App = () => {
  const [userList, setUserList] = useState();
  const [userData, setUserData] = useState();
  const [openModal, setOpenModal] = useState(false);

  const fetchedData = () => {
    return fetch("https://5f1bd3f1254cec00160823fe.mockapi.io/api/user", {
      method: "GET",
    })
      .then((response) => {
        response.json().then((x) => setUserList(x[0].members));
      })
      .catch((error) => console.log(error));
  };

  const handleOpenModal = (user) => {
    setOpenModal(true);
    setUserData(user);
  };

  useEffect(() => {
    fetchedData();
  }, []);

  return (
    <div>
      <div className="container col-md-8 offset-md-2">
        {userList &&
          userList.map((user) => (
            <div class="card">
              <div class="card-body">
                <blockquote class="blockquote mb-0">
                  <button
                    type="button"
                    class="btn btn-info btn-lg btn-block"
                    onClick={() => handleOpenModal(user)}
                    data-toggle="modal"
                    data-target="#myModal"
                  >
                    {user.real_name}
                  </button>
                </blockquote>
              </div>
            </div>
          ))}
      </div>
      {openModal && (
        <Modal
          open={openModal}
          data={userData}
          handleClose={() => {
            setOpenModal(false);
          }}
        />
      )}
    </div>
  );
};
export default App;
