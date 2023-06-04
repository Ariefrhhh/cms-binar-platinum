import React from "react";
import { Toast, ToastBody } from "reactstrap";
import "../assets/CSS/addnewnotification.css"

const Addnewnotification = () => {
    return(
        <div className="addnewnotification p-3 bg-success my-2 rounded">
        <Toast>
          <ToastBody className="toastbody">
            Data Berhasil Disimpan!
          </ToastBody>
        </Toast>
      </div>
    )
}

export default Addnewnotification