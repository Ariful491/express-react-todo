import {useEffect, useState} from 'react'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css'
import CardTopBg from "./components/icons/CardTopBg.jsx";
import EditIcon from "./components/icons/EditIcon.jsx";
import RemoveIcon from "./components/icons/RemoveIcon.jsx";


function App() {

    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [id, setId] = useState(0);
    const [loader, setLoader] = useState(false);
    const [cardLists, setCardLists] = useState([]);
    const [isEdit, setIsEdit] = useState(false);


    const baseUrl = 'http://localhost:8000/';
    const SaveUrl = baseUrl + 'save-card/';
    const UpdateUrl = baseUrl + 'update-card/';
    const deleteUrl = baseUrl + 'delete-card/';


    const cardAdd = (event) => {

        event.preventDefault();
        setLoader(true)
        fetch(SaveUrl, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                title: title, details: details
            })
        })
            .then(res => res.json())
            .then(data => {
                setLoader(false)
                if (data.errors) {
                    toast.error(data.errors[0].msg);
                    return null;
                }
                toast.success("saved successfully ❤️");
                formRefresh()
                cardLoad();
            })
            .catch(() => {
                setLoader(false)
                toast.error("invalid input. 🫠");
            })
    }


    const cardLoad = () => {
        setIsEdit(false);
        fetch(baseUrl)
            .then(res => res.json())
            .then((data) => {
                setCardLists(data)
            });

    }


    useEffect(() => {
        cardLoad();
    }, []);


    const cardOpenForEdit = (card) => {
        setIsEdit(true);
        setTitle(card.title);
        setDetails(card.details);
        setId(card._id);
    }

    const cardDelete = (id) => {
        formRefresh();
        const confirmation = confirm("Are you sure to delete ?");
        if (!confirmation) {
            return null;
        }

        fetch(deleteUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: id,

            })
        })
            .then(res => res)
            .then(data => {
                console.log(data)
                toast.success("deleted successfully  😥");
                cardLoad();
            })


    }


    const formRefresh = () => {
        setIsEdit(false);
        setTitle('');
        setDetails('');
        setId(null)
    }

    const updateCard = (event) => {
        event.preventDefault();
        setLoader(true)
        fetch(UpdateUrl, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                title: title, details: details, _id: id,
            })
        })

            .then(data => {
                setLoader(false)
                console.log(data);
                toast.success("Update successfully  😎");
                setTitle('');
                setDetails('');
                cardLoad();
            })
            .catch(() => {
                setLoader(false)
                toast.error("invalid input.");
            })
    }

    return (<>
        <div className="grid">
            <div className="form-box">
                <div className="nice-bg"></div>
                <button type="button" className="button-design" onClick={formRefresh}>
                    Refresh
                </button>

                <div className="nice-bg"></div>

                <form onSubmit={isEdit ? updateCard : cardAdd} className="custom-design-form">

                    <div className="form">
                        <label>
                            Title :
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="input"/>
                    </div>

                    <div className="form">
                        <label>
                            Details :
                        </label>
                        <input type="text"
                               name="title"
                               value={details}
                               onChange={(e) => setDetails(e.target.value)}
                               className="input"/>
                    </div>

                    <div className="form">
                        <button type="submit" className="button-design">
                            {loader ? (<div className="loader">
                                <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg"
                                     x="0px" y="0px"
                                     viewBox="0 0 100 100" enableBackground="new 0 0 0 0">
                                    <path fill="#000"
                                          d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                                        <animateTransform
                                            attributeName="transform"
                                            attributeType="XML"
                                            type="rotate"
                                            dur="1s"
                                            from="0 50 50"
                                            to="360 50 50"
                                            repeatCount="indefinite"/>
                                    </path>
                                </svg>
                            </div>) : ''}
                            <div>
                                {isEdit ? 'Edit' : 'Save'}
                            </div>
                        </button>

                    </div>
                </form>

            </div>
        </div>

        <div className="grid">
            {cardLists.map((card, index) => (<div className="card" key={index}>
                    <div className="double-icon-design">
                        <div style={{cursor: 'pointer'}} onClick={() => cardOpenForEdit(card)}>
                            <EditIcon/>
                        </div>
                        <div style={{cursor: 'pointer'}} onClick={() => cardDelete(card._id)}>
                            <RemoveIcon/>
                        </div>
                    </div>
                    <h4>{card.title}</h4>

                    <p>
                        {card.details}
                    </p>
                    <CardTopBg/>
                </div>
            ))}
        </div>


        <ToastContainer/>
    </>)
}

export default App
