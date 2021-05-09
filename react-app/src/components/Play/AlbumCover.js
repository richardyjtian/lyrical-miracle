import React from "react";
import "./AlbumCover.css";

class AlbumCover extends React.Component {
  render() {
    return (
      <div className="AlbumCover">
        <img
          alt="albumCover"
          src="https://images-na.ssl-images-amazon.com/images/I/71IywUSFmTL._AC_UL600_SR600,600_.jpg"
          width="128"
          height="128"
        ></img>
      </div>
    );
  }
}
export default AlbumCover;
