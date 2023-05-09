import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Post from "./Post"

function MainPage(props) {

    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:7777/posts')
            .then(response => response.json())
            .then(data => {
                setPosts(data);
            });
    }, []);

    return (
        <div className="posts-wrapper">
            <div className="new-post-block">
                <button className="new-post-button" onClick={(evt) => { navigate("/posts/new") }}>
                    Создать пост
                </button>
            </div>
            {posts.map(o =>
                <div className="post-wrapper" key={o.id}>
                    <Post post={o} onClick={(evt) => { navigate(`/posts/${o.id}`) }} />
                    <textarea className="comment-textarea" placeholder="Напишите комментарий..."></textarea>
                </div>)}
        </div>
    );
}

export default MainPage;