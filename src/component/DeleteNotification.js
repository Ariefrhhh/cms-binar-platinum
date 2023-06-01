import React from "react";
import "../assets/CSS/deletenotification.css"

const DeleteNotification = () => {
  return (
    <div>
      <div className="container deletenotification">
        <div className="row justify-content-center">
          <div className="col-lg-6 notificationContainer">
            <h3>Data Berhasil Dihapus</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteNotification;
