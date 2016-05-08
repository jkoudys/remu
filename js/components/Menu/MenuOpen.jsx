import React from 'react';

const MenuOpen = ({ onClick }) => (
  <button key="menutoggle" className="menutoggle" onClick={onClick}>
    <i className="fa fa-chevron-left" /> menu
  </button>
);

export default MenuOpen;
