import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import Post from './Post';

export default function PostPage(props) {

    const { id } = useParams();
    const [postData, setPostData] = useState();
    const [form, setForm] = useState({ id: Number(id), content: "" });

    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:7777/posts`)
            .then(response => response.json())
            .then(data => {
                const specificPost = data.find(o => o.id == id);
                setPostData(specificPost);
                setLoading(false);
                setForm(prevForm => ({ ...prevForm, content: specificPost.content }));
            });
    }, []);

    const handleEdit = evt => {
        setEditMode(true);
    };

    const handleChange = ({ target }) => {
        const name = target.name;
        const value = target.value;
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const handleSave = evt => {
        evt.preventDefault();
        fetch('http://localhost:7777/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(form)
        });
        setPostData(prevPostData => ({ ...prevPostData, content: form.content }));
        setEditMode(false);
    };

    const handleDelete = evt => {
        evt.preventDefault();
        fetch(`http://localhost:7777/posts/${id}`, {
            method: 'DELETE',
        });
        navigate("/");
    };

    return (
        <div className="post-page-wrapper">
            {loading
                ? <p>загрузка...</p>
                : !editMode && <div className="post-wrapper">
                    <Post post={postData} />
                    <div className="edit-buttons-wrapper">
                        <button className="edit-button" onClick={handleEdit}>Изменить</button>
                        <button className="edit-button" onClick={handleDelete}>Удалить</button>
                    </div>
                </div>}
            {editMode && <div className="post-wrapper">
                <p>Редактировать публикацию:</p>
                <textarea className="edit-textarea" id="content" name="content" value={form.content} onChange={handleChange}></textarea>
                <div className="edit-buttons-wrapper">
                    <button className="edit-button" onClick={handleSave}>Сохранить</button>
                </div>
            </div>}
        </div>
    );
}