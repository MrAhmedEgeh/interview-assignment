
import {useState, useEffect} from 'react'


import '../styles/ListItems.css';
import GitHub from '../Assets/wp2603375.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserAlt, faHashtag, faStar } from '@fortawesome/free-solid-svg-icons';



const ListItems = ({datas}) => {

    const [clubs, setClubs] = useState([])
    

    // star
    const [starPage, setStarPage] = useState(false);
    const [starPageData, setStarPageData] = useState([]);

    // FOR PAGINATION
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    
    const [BlackStyle] = useState({color: 'black'});
    const [GrayStyle] = useState({color: 'rgb(202, 195, 195)'});
   
     const indexOfLastPost = currentPage * itemsPerPage;
     const indexOfFirstPost = indexOfLastPost - itemsPerPage;
     const currentItems = clubs.slice(indexOfFirstPost, indexOfLastPost);

     let PageNums = []
     for(let i = 1; i <= Math.ceil(clubs.length / itemsPerPage); i++){
        PageNums.push(i);
     }

     
    useEffect(() => {
        setClubs(datas)
        console.log(currentItems)
    }, [])

    const changePage = (e) => {
        
        setCurrentPage(parseInt(e.target.textContent));
    }
    const changeStarState = (e) => {
        const objectID = parseInt(e.target.parentNode.parentNode.parentNode.id);

        if(e.target.style.color === 'black'){
            e.target.style.color = 'rgb(202, 195, 195)';
            // remove from localStorage
            localStorage.removeItem(objectID);
        }else if(e.target.style.color === '' || e.target.style.color === 'rgb(202, 195, 195)'){
            e.target.style.color = 'black';
            // add to localStorage
            let myObject = clubs.filter(el => el.id === objectID)[0]
            myObject = JSON.stringify(myObject);
            localStorage.setItem(objectID, myObject);
        }
    }
    const viewStarPage = () => {
        setStarPageData(clubs.filter(el => localStorage.getItem(el.id) !== null))
        setStarPage(!starPage)
    }
    return(
        <div className="list-items">
            <div className="btn-star-page">
                <button onClick={viewStarPage}>{starPage === false ? 'Favourit' : 'Back'}</button>
            </div>
            {
                starPage === false ?
                (
                    currentItems.map((club, index) => (
                        <div className="list-item" key={index}>
                        <div className="list-item-image-container">
                            <img src={GitHub} className="list-item-image" alt="Football Image" />
                            <div className="number">#{clubs.map((el, indexes) =>el.id === club.id ? (indexes + 1) : (''))}</div>
                        </div>
                        <div className="content" id={club.id}>
                            <div className="item-h2-container">
                            <h2>{club.name}</h2>
                            {
                            localStorage.getItem(club.id) !== null?
                            (
                                <FontAwesomeIcon style={BlackStyle} className='star-color' size="lg" onClick={changeStarState} icon={faStar}/>
                            )
                            :
                            (
                                <FontAwesomeIcon style={GrayStyle} className='star-color' size="lg" onClick={changeStarState} icon={faStar}/>
                            )
                               
                            }
                            
                            </div>
                            <div className="properties">
                                <div className="prop">
                                <FontAwesomeIcon className="icons" style={{marginTop: `3px`}} size="1x" icon={faUserAlt}/>
                                    Creator: <span className="list-item-data">{club.owner.firstName} {club.owner.login}</span>
                                </div>
                                <div className="prop club">
                                
                                    <span><FontAwesomeIcon className="icons" size="1x" icon={faHashtag}/> Full Name:<span className="list-item-data">{club.full_name}</span>  </span>
                                 </div>
                            <div className="prop club">
                                
                                <span><FontAwesomeIcon className="icons" size="1x" icon={faHashtag}/> Description:<span className="list-item-data">{club.description == null ? 'No description' :  club.description}</span>  </span>
                             </div>
                             <div className="prop club">
                                
                                <span><FontAwesomeIcon className="icons" size="1x" icon={faHashtag}/> Pages:<span className="list-item-data">{club.has_pages === false ? 'No pages' :  'Have Pages'}</span>  </span>
                             </div>
                             <div className="prop club">
                                
                                <span><FontAwesomeIcon className="icons" size="1x" icon={faHashtag}/> People Interested:<span className="list-item-data">{club.watchers}</span>  </span>
                             </div>
                                </div>
                            <div className="button-container">
                            <a href={club.html_url} target="_blank" className="list-item-Navlink">
                                <button className="list-item-button">View</button>
                             </a>
                             <a href={club.owner.html_url} target="_blank" className="list-item-Navlink">
                                <button className="list-item-button">Author</button>
                             </a>
                            </div>
                        </div>
                    </div> 
            ))
                )
                :
                (
                    starPageData.map((club, index) => (
                       localStorage.getItem(club.id) !== null ? 
                       (
                        <div className="list-item" key={index}>
                        <div className="list-item-image-container">
                            <img src={GitHub} className="list-item-image" alt="Football Image" />
                            <div className="number">#{clubs.map((el, indexes) =>el.id === club.id ? (indexes + 1) : (''))}</div>
                        </div>
                        <div className="content" id={club.id}>
                            <div className="item-h2-container">
                            <h2>{club.name}</h2>
                            <FontAwesomeIcon style={BlackStyle} className='star-color' size="lg" icon={faStar}/>
                            
                            </div>
                            <div className="properties">
                                <div className="prop">
                                <FontAwesomeIcon className="icons" style={{marginTop: `3px`}} size="1x" icon={faUserAlt}/>
                                    Creator: <span className="list-item-data">{club.owner.firstName} {club.owner.login}</span>
                                </div>
                                <div className="prop club">
                                
                                    <span><FontAwesomeIcon className="icons" size="1x" icon={faHashtag}/> Full Name:<span className="list-item-data">{club.full_name}</span>  </span>
                                 </div>
                            <div className="prop club">
                                
                                <span><FontAwesomeIcon className="icons" size="1x" icon={faHashtag}/> Description:<span className="list-item-data">{club.description == null ? 'No description' :  club.description}</span>  </span>
                             </div>
                             <div className="prop club">
                                
                                <span><FontAwesomeIcon className="icons" size="1x" icon={faHashtag}/> Pages:<span className="list-item-data">{club.has_pages === false ? 'No pages' :  'Have Pages'}</span>  </span>
                             </div>
                             <div className="prop club">
                                
                                <span><FontAwesomeIcon className="icons" size="1x" icon={faHashtag}/> People Interested:<span className="list-item-data">{club.watchers}</span>  </span>
                             </div>
                                </div>
                            <div className="button-container">
                            <a href={club.html_url} target="_blank" className="list-item-Navlink">
                                <button className="list-item-button">View</button>
                             </a>
                             <a href={club.owner.html_url} target="_blank" className="list-item-Navlink">
                                <button className="list-item-button">Author</button>
                             </a>
                            </div>
                        </div>
                    </div> 
                       )
                       :
                       (
                           ''
                       )
                ))
                )
            }
            {
               starPage !== true ?
               (
                <ul className="pagenate-container">
                {PageNums.map(el => el === currentPage ? (<li className='pagenate active' key={el} onClick={changePage}>{el}</li>): (<li className='pagenate' key={el} onClick={changePage}>{el}</li>))}
            </ul>
               )
               :
               ''
            }
        </div>

    )
}

export default ListItems;