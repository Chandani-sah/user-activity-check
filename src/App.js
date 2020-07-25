import React, { useState, useEffect } from "react";
import Modal from "./components/modal";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "black",
    fontSize: "20px",
  },
}));

const App = () => {
  const classes = useStyles();

  const [userList, setUserList] = useState();
  const [userData, setUserData] = useState();
  const [openModal, setOpenModal] = useState(false);

  const fetchedData = () => {
    return fetch("https://5f19ab62e104860016baf273.mockapi.io/api/user", {
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
            <Grid container spacing={3} style = {{marginLeft: "25%", marginTop: "5px"}}>
              <Grid item xs={12}>
                <button
                  type="button"
                  class="btn btn-primary btn-block"
                  onClick={() => handleOpenModal(user)}
                >
                  <Paper elevation={3} className={classes.paper}>
                    {user.real_name}
                  </Paper>
                </button>
              </Grid>
            </Grid>
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
