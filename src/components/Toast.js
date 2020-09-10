import React from "react";

function Toast({name, id}) {

  return (
      <div className="toast" id={id} role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header">
          <strong className="mr-auto">{name}</strong>
          <span className="ml-2"> {id === 'removeLinkToast' ? 'removed' : 'added'}</span>
        </div>
      </div>
  )
}

export default Toast;
