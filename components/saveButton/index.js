import React from 'react';
const SaveButton = ({handleSave}) => {

  return (
    <div className="save-button-wrapper">
      <button className="save-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default SaveButton