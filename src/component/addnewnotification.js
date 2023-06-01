import React from "react";
import { Toast, ToastBody } from "reactstrap";

const Addnewnotification = () => {
    return(
        <div className="p-3 bg-success my-2 rounded">
        <Toast>
          <ToastBody>
            Data Berhasil Disimpan!
          </ToastBody>
        </Toast>
      </div>
    )
}

export default Addnewnotification