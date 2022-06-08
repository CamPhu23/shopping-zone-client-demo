import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Comment from './comment'
import { BASE_URL } from '../../constants/http'

let apiDetailProduct = `${BASE_URL}/products/624570fbee34ac4d28c4b979`;

export default function Comments() {
    const [comments, setComments] = useState([]);


    const parentComments = comments.filter((cmt) => cmt.replyTo === null);
    const childComments = parentCommentID => {
        return comments.filter(cmt => cmt.replyTo === parentCommentID)
    }
    console.log('parent', parentComments)
    
    useEffect(() => {
        axios.get(apiDetailProduct)
        .then(res => {
            let comm = res.data.comments
            setComments(comm)

        })
        .catch(error => console.log(error))
    }, [])
    return (
        <div className="antialiased mx-auto max-w-5xl px-2">
            <h2 className="mb-4 text-lg font-bold text-gray-900">Comments</h2>
            {parentComments.map(comt => (
                <Comment 
                    key={comt.id} 
                    comment={comt} 
                    replies={childComments(comt.id)}
                />
                
            ))

            }
        </div>
    )
}