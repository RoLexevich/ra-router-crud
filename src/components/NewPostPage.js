import React, {  useState } from 'react';
import { useNavigate } from "react-router-dom";

function NewPostPage(props) {

    const [form, setForm] = useState({ id: 0, content: "" });
    const navigate = useNavigate();

    const handleChange = ({ target }) => {
        const name = target.name;
        const value = target.value;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        fetch('http://localhost:7777/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(form)
        });
        navigate("/");
    };

    return (
        <div className="new-post-wrapper">
            <p>Введите текст нового сообщения:</p>
            <form onSubmit={handleSubmit}>
                <textarea className="newpost-textarea" id="content" name="content" onChange={handleChange}></textarea>
                <input className="newpost-button" type="submit" value="Опубликовать" />
            </form>
        </div>
    );
}

export default NewPostPage;