import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
}));

const ModalComponent = (props) => {
  const classes = useStyles();

  const [openModal, setOpenModal] = useState(false);
  const [selectUser, setSelectUser] = useState();
  const [timeRange, setTimeRange] = useState();
  const [inputDate, setInputDate] = useState();

  const [dataValue, setDataValue] = useState();

  const handleOpenModal = (user, date) => {
    setSelectUser(user);
    var timeArray = [];
    setInputDate(moment(date).format("LL"));
    user &&
      user.activity_periods.map((x) => {
        if (moment(x.start_time).format("ll") === moment(date).format("ll")) {
          timeArray.push(
            moment(x.start_time).format("LT") +
              " - " +
              moment(x.end_time).format("LT")
          );
        }
      });

    timeArray.length > 0 ? setTimeRange(timeArray) : setTimeRange(undefined);
    setOpenModal(true);
  };

  const handleClose = () => {
    setTimeRange(undefined);
    setInputDate(undefined);
    setOpenModal(false);
    setSelectUser(undefined);
    setDataValue("");
    props.handleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputDate(dataValue);
    handleOpenModal(selectUser, dataValue);
    //setInputDate(e.date);
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setDataValue(event.target.value);
  };

  useEffect(() => {
    handleOpenModal(props.data, new Date());
  }, []);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={handleClose}
        closeAfterTransition
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Date - {inputDate}</h4>
              <cite title="Source Title">
                {selectUser && selectUser.real_name}
              </cite>
            </div>
            <div class="modal-body">
              <div>
                <h3>Time-Range</h3>
                {console.log(timeRange)}

                {timeRange ? (
                  Object.values(timeRange).map((x, i) => (
                    <div class="alert alert-success" role="alert">
                      {x}
                    </div>
                  ))
                ) : (
                  <div class="alert alert-danger" role="alert">
                    Not Available for the provided date!
                  </div>
                )}

                <div>
                  <form>
                    <input
                      type="Date"
                      name="date"
                      value={dataValue}
                      onChange={handleChange}
                    />
                    <button
                      onClick={handleSubmit}
                      style={{ marginLeft: "2px" }}
                    >
                      View
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-default"
                data-dismiss="modal"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalComponent;
