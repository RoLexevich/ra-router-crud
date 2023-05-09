export default function Post(props) {

    const { post, onClick: handleClick } = props;
    const { content, created } = post;
    const author = { name: "Ivan Ivanov", picture: "https://pixelbox.ru/wp-content/uploads/2021/05/ava-vk-animal-91.jpg", title: "Основатель группы" };
    const minutesPassed = Math.round((Date.now() - created) / 60000);

    return (
        <div className="post-body">
            <div className="flex-container">
                <img className="avatar" src={author.picture} />
                <div>
                    <p>{author.name}</p>
                    <div className="flex-container">
                        <p>{author.title}</p>
                        <p className="time">{minutesPassed} мин.</p>
                    </div>
                </div>
            </div>
            <p className="post-text" onClick={handleClick}>{content}</p>
            <div className="comment-buttons-wrapper">
                <button className="comment-button">Нравится</button>
                <button className="comment-button">Комментировать</button>
            </div>
        </div>
    );
}