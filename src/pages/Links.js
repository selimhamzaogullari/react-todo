import React, {useEffect, useState} from "react";
import PerLink from "../components/PerLink";
import Pagination from "../components/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {downVote, removeLink, upVote, sortingLinks} from "../actions";
import {Link} from "react-router-dom";
import Toast from "../components/Toast";

export function Links() {
  const linksState = useSelector(state => state.links);
  const dispatch = useDispatch();

  const allLinks = useSelector(state => state.links);
  const [currentPage, setCurrentPage] = useState(1);
  const [linksPerPage] = useState(5);

  // Removed link id
  const [removedLink, setRemovedLink] = useState(null);

  // Get Current Links
  const indexOfLastLink = currentPage * linksPerPage
  const indexOfFirstLink = indexOfLastLink - linksPerPage;
  const currentLinks = allLinks.links.slice(indexOfFirstLink, indexOfLastLink);
  const totalPageNumber = Math.ceil(allLinks.links.length / linksPerPage);

  // sortType
  const [sortType, setSortType] = useState('default');

  useEffect(() => {
    // setCurrentLinks(allLinks.links.slice(indexOfFirstLink, indexOfLastLink));
    localStorage.setItem('links', JSON.stringify(linksState.links));
  }, [linksState])

  // Sort
  const sorting = sT => {
    console.log(sortType);
    sT = sT ? sT : sortType;
    const sD = allLinks.links = allLinks.links.sort((a,b) => {
      return sT === 'most' ? (b.vote - a.vote || b.createdAt - a.createdAt) :
          (sT === 'default' ? a : a.vote - b.vote || b.createdAt - a.createdAt);
    });
    setSortType(sT);
    dispatch(sortingLinks(sD));
  }

  // Change Page
  const paginate = (pageNumber) => {
    const curr = currentPage;
    if(typeof pageNumber === 'number') {
      setCurrentPage(pageNumber);
    } else {
      pageNumber === 'next' ?
          (curr !== totalPageNumber && setCurrentPage(curr + 1)) :
          (curr !== 1 && setCurrentPage(curr -1));
    }
  }

  const removeClickedLink = (data, check) => {
    if(check) {
      dispatch(removeLink(removedLink.id));
      document.getElementById('removeLinkModal').classList.remove('d-block');
      changeToast();
    } else {
      setRemovedLink(data);
      document.getElementById('removeLinkModal').classList.add('d-block');
    }
  }
  const voteUp = id => {
    dispatch(upVote(id));
    sorting(null);
  }

  const voteDown = id => {
    dispatch(downVote(id));
    sorting(null);
  }

  const closeModal = () => {
    document.getElementById('removeLinkModal').classList.remove('d-block');
  }

  const changeToast = () => {
    document.getElementById('removeLinkToast').classList.add('show');
    setTimeout(() => {
      document.getElementById('removeLinkToast').classList.remove('show');
    }, 1500)
  }

  const dropDownToggle = () => {
    const el = document.getElementsByClassName('dropdown-menu')[0];
    el.classList.contains('show') ? el.classList.remove('show') : el.classList.add('show');
  }

  return (
      <div className="container text-center links-page">
        <div className="links-content">
          <Link className="text-left" to="/add-link">
            <div className="submit-link">
              <div className="box">
                <span className="plus-icon">+</span>
              </div>
              <div className="submit-link-title">
                SUBMIT A LINK
              </div>
            </div>
          </Link>
          <hr/>
          <div className="dropdown">
            <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={() => dropDownToggle()}>
              Order By
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <button className="dropdown-item" onClick={() => sorting('most')}>Most Voted</button>
              <button className="dropdown-item" onClick={() => sorting('less')}>Less Voted</button>
            </div>
          </div>

          {
            allLinks.links.length > 0 ?
                (
                    <React.Fragment>
                      <div className="mt-3 mb-3">
                        {
                          currentLinks.map((link, i) => {
                            return (
                                <React.Fragment key={i}>
                                  <PerLink data={link} removeClickedLink={removeClickedLink}
                                           voteUp={voteUp} voteDown={voteDown}/>
                                </React.Fragment>
                            )
                          })
                        }
                      </div>
                      <Pagination
                          linksPerPage={linksPerPage}
                          totalLinks={allLinks.length}
                          currentPage={currentPage}
                          totalPageNumber={totalPageNumber}
                          paginate={paginate}/>
                    </React.Fragment>
                ) : (
                    <h2 className="mt-5 font-weight-bold">No data</h2>
                )
          }

        </div>
        {/* Modal */}
        <div className="modal" id="removeLinkModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Remove Link</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => closeModal()}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="link-desc">Do you want to remove: </div>
                <div className="link-name">{removedLink?.name}</div>
              </div>
              <div className="modal-footer">
                <button className="btn main-btn" onClick={() => removeClickedLink(null, 'delete')}>OK</button>
                <button className="btn main-btn" onClick={() => closeModal()}>CANCEL</button>
              </div>
            </div>
          </div>
        </div>

        {/* Toast */}
        <Toast name={removedLink?.name} id="removeLinkToast" />

      </div>
  )
}
