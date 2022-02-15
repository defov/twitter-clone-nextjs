import { connectToDatabase } from "../../../util/mongodb"
import { ObjectId } from "mongodb"

export default async function handler(req, res) {
    const { 
        method, 
        body: { 
            action, 
            email, 
            username, 
            userImage, 
            input, 
            imageUrl 
        }, 
        query: { id } 
    } = req

    const { db } = await connectToDatabase()

    const filter = { _id: new ObjectId(id) }

    if(method === 'POST') {
        const post = await db.collection('posts')
            .findOne(filter)

        if(post && email) {
            switch(action) {
                case 'updateLikes':
                    if(!post.likes) {
                        post.likes = []
                    }
                    const index = post.likes.indexOf(email)
                    if(index > -1){
                        post.likes.splice(index, 1)
                    } else {
                        post.likes.push(email)
                    }
                    const resultLikes = await db.collection('posts')
                        .updateOne(filter, { $set: { likes: post.likes } })
                    res.status(200).json(post)
                    break;
                case 'addComment':
                    if(!input || !username || !userImage) break;
                    if(!post.comments) {
                        post.comments = []
                    }

                    const comment = {
                        input,
                        email,
                        username,
                        userImage
                    }
                    if(imageUrl) {
                        comment.imageUrl = imageUrl
                    }

                    post.comments.push(comment)
                    const resultComment = await db.collection('posts')
                        .updateOne(filter, { $set: { comments: post.comments } })
                    res.status(200).json(post)
                    break;
                default:
                    break;
            }
        }

        res.status(500).json({error: 'Failer'})
    }

    if(method === 'DELETE') {
        try {
            const result = await db.collection('posts').deleteOne({
                _id: new ObjectId(id)
            })
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    res.status(500).json({error: 'Wrong data provided'})

}