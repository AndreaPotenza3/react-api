import style from './Card.module.css'
import Button from './../../buttons/button'
import Tags from '../../Tags/Tags'
import placeholderImage from '/src/assets/placeholder.webp'
import { api_base_uri } from '../../Main/Main'


function Card({ callback, title = '', tags, content = '', image, slug }) {




    return (
        <div className={style.card}>
            <figure className={style.figure}>
                <img className={style.image} src={image ? api_base_uri + image : placeholderImage} alt="" />
            </figure>
            <div className={style.body}>
                <h3>
                    {title}
                </h3>
                <Tags tags={tags} />
                <strong>{slug}</strong>
                <p className={style.description}>
                    {content}
                </p>
                <div className={style.down_buttons}>
                    <Button />
                    <button className={style.btn} onClick={callback}>Elimina</button>
                </div>
            </div>
        </div>
    )
}

export default Card