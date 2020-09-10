import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addLink } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../components/Toast";

export function AddLink() {
  const [name, setName] = useState(null);
  const [link, setLink] = useState(null);

  const linksState = useSelector(state => state.links);
  const dispatch = useDispatch();

  // Regex for Link
  const linkReg = new RegExp(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/);

  useEffect(() => {
    localStorage.setItem('links', JSON.stringify(linksState.links));
  }, [])

  const addNewLink = (name, link) => {
    const obj = {
      id: new Date().getTime(),
      name: name,
      link: link,
      vote: 0,
      createdAt: new Date().getTime()
    }
    dispatch(addLink(obj));
    changeToast();
  }

  const changeToast = () => {
    document.getElementById('addLinkToast').classList.add('show');
    setTimeout(() => {
      document.getElementById('addLinkToast').classList.remove('show');
    }, 1500)
  }

  return (
    <div className="container add-link-page">
      <div className="links-content mt-3">
        <Link className="text-left" to="/">
          <ion-icon name="arrow-back-outline" />
          <span>Return to List</span>
        </Link>
        <h2 className="font-weight-bold mt-4">Add New Link</h2>
        <div className="d-flex flex-column mt-4">
          <label htmlFor="linkName">Link Name:</label>
          <input type="text" id="linkName" placeholder="e.g. Alphabet"
            onChange={(e) => setName(e.target.value)} />
          {
            (name !== null && name.length < 3) && <small>* The name must be at least 3 characters.</small>
          }
        </div>
        <div className="d-flex flex-column mt-3">
          <label htmlFor="linkName">Link URL:</label>
          <input type="text" id="linkName" placeholder="e.g. http://abc.xyz"
            onChange={(e) => setLink(e.target.value)} />
          {
            (link !== null && !linkReg.test(link)) && <small>* Please enter the correct url.</small>
          }
        </div>
        <div className="text-right">
          <button className="btn main-btn text-right btn-add-link"
            disabled={link === null || !linkReg.test(link) || name === null || name.length < 3}
            onClick={() => addNewLink(name, link)}>Add</button>
        </div>
      </div>
      <Toast name={name} id="addLinkToast" />
    </div>
  )
}
