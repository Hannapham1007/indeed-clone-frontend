import React from "react";

function ModalDelete({ onDelete, onCancel }) {
  return (
    <div className="modal show d-block" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Deletion</h5>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete this job post?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" onClick={onDelete}>
              Delete
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-dismiss="modal"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDelete;
