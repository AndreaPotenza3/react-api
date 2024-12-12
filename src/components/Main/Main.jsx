import Card from '../post/Card/card'
import Tags from '../Tags/Tags'
import { useEffect, useState } from 'react'
import axios from 'axios'

export const api_base_uri = 'http://localhost:3000/'

function Main() {

    const [newPosts, setNewPosts] = useState([])
    const [newTitle, setTitle] = useState('')

    const initialFormData = {
        id: Date.now(),
        title: '',
        image: undefined /* compila questo campo */,
        content: '',
        tags: [],
        published: true
    }
    const [formData, setFormData] = useState(initialFormData)

    function fetchPosts() {
        axios.get(`${api_base_uri}posts`)
            .then(res => {
                console.log('res', res)
                setNewPosts(res.data)
            })
            .catch(err => {
                console.error(err)
            })
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    function handleFormData(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }
    function addPost(e) {
        e.preventDefault()

        const newPost = {
            id: Date.now(),
            ...formData
        }

        axios.post(`${api_base_uri}posts`, newPost)
            .then(res => {
                console.log(res)
            }).catch(err => console.log(err))


        if (formData.title === '') return

        setNewPosts([...newPosts, newPost])
        setFormData(initialFormData)

        console.log({ newPost })
    }

    function delPost(id) {
        setNewPosts(newPosts.filter(post => post.id !== id))
    }


    const tags = []

    // posts.forEach(post => {
    //     const postTags = post.tags
    //     postTags.forEach((tag) => {
    //         !tags.includes(tag) && tags.push(tag)

    //     });
    // });




    return (
        <>
            <main>
                <div className='container'>
                    <Tags tags={tags} />
                    <form onSubmit={addPost} className='form' action="submit">
                        <label htmlFor="title">Titolo</label>
                        <input className='input_field' name='title' type="text" onChange={handleFormData} placeholder='Titolo del Post' value={formData.title} />
                        <label htmlFor="image">Immagine</label>
                        <input className='input_field' name='image' type="text" onChange={handleFormData} placeholder='Inserisci un immagine' value={formData.image} />
                        <label htmlFor="content">Contenuto del Post</label>
                        <input className='input_field' name='content' type="text" onChange={handleFormData} placeholder='Aggiungi un contenuto al tuo post' value={formData.content} />
                        <label htmlFor="Categoria"></label>
                        <select className='input_field' name="Categoria">
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                            <option value=""></option>
                        </select>
                        <div className='check'>
                            <label htmlFor="Tags">HTML</label>
                            <input type="checkbox" name="Tags" id="" text='html' />
                            <label htmlFor="Tags">CSS</label>
                            <input type="checkbox" name="Tags" id="" text='html' />
                            <label htmlFor="Tags">JS</label>
                            <input type="checkbox" name="Tags" id="" text='html' />
                            <label htmlFor="Tags">PHP</label>
                            <input type="checkbox" name="Tags" id="" text='html' />
                        </div>

                        <input className='input_btn' type="submit" value='Crea nuovo post' />
                    </form>
                    <div className="row">
                        <ul className='list'>
                            {newPosts.map((post) => (
                                <li key={post.id} className='list_item'>
                                    <Card callback={() => delPost(post.id)} title={post.title} tags={post.tags} content={post.content} image={post.image} slug={post.slug} />
                                </li>

                            ))}
                        </ul>

                    </div>


                </div>


            </main >
        </>
    )
}

export default Main