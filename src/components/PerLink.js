import React from "react";

function PerLink({data, removeClickedLink, voteUp, voteDown}) {

  return (
      <div className="links-list">
        <div className="box">
          <span>{data.vote}</span>
          <span className="point-text">POINTS</span>
        </div>
        <div className="links-detail text-left">
          <div>
            <div className="title">{data.name}</div>
            <div className="href">{data.link}</div>
          </div>
          <div className="d-flex">
            <div className="up-vote" onClick={() => voteUp(data.id)}>
              <ion-icon name="arrow-up-outline" />
              <span>Up Vote</span>
            </div>
            <div className="up-vote ml-4" onClick={() => voteDown(data.id)}>
              <ion-icon name="arrow-down-outline" />
              <span>Down Vote</span>
            </div>
          </div>
        </div>
        <div className="remove-list-icon" onClick={() => removeClickedLink(data)}>-</div>
      </div>
  )
}

export default PerLink;
