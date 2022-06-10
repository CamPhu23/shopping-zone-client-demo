import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Comment from './comment'
import { BASE_URL } from '../../constants/http'
import {commentService} from '../../services/modules'
// let apiDetailProduct = `${BASE_URL}/products/624570fbee34ac4d28c4b979`;

export default function Comments({id}) {
    const [comments, setComments] = useState([]);
    // const id = '624570fbee34ac4d28c4b979'

    const parentComments = comments.filter((cmt) => cmt.replyTo === null);
    const childComments = parentCommentID => {
        return comments.filter(cmt => cmt.replyTo === parentCommentID)
    }
    // console.log('parent', parentComments)

    useEffect(() => {
        let comm = commentService.getAllComments(id)
        console.log('comm: ', comm)
        // console.log('arrr: ', arr)

        setComments(comm)


        // setComments(commentss)
        // axios.get(apiDetailProduct)
        // .then(res => {
        //     let comm = res.data.comments
        //     setComments(comm)
        //     console.log(comm)
        // })
        // .catch(error => console.log(error))
    }, [])
    return (
        <div>
            {parentComments.map(comt => (
                    <Comment
                        key={comt.id} 
                        comment={comt} 
                        replies={childComments(comt.id)}
                    />
                ))}
        </div>
        // <div className="antialiased mx-auto max-w-full px-2">
        //     <div className="space-y-4">
        //         {parentComments.map(comt => (
        //             <Comment
        //                 key={comt.id} 
        //                 comment={comt} 
        //                 replies={childComments(comt.id)}
        //             />
        //         ))}
        //         {/* <div className="flex">
        //             <div className="flex-shrink-0 mr-3">
        //                 <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt=""/>
        //             </div>
        //             <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
        //                 <strong>tên</strong> <span className="text-xs text-gray-400">3:34 PM</span>
        //                 <p className="text-sm md:text-base">nội dung cmt</p>
        //             </div>
        //         </div>

        //         <div className="space-y-4 ml-14" >
        //             <div className="flex">
        //                 <div className="flex-shrink-0 mr-3">
        //                     <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt=""/>
        //                 </div>
        //                 <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
        //                     <strong>tên</strong> <span className="text-xs text-gray-400">3:34 PM</span>
        //                     <p className="text-sm md:text-base">Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
        //                         sed diam nonumy eirmod tempor invidunt ut labore et dolore
        //                         magna aliquyam erat, sed diam voluptua.
        //                     </p>
        //                 </div>
        //             </div>
        //         </div> */}
        //     </div>    
        // </div> 
        // <div className="antialiased mx-auto max-w-5xl px-2">
        //     <h2 className="mb-4 text-lg font-bold text-gray-900">Comments</h2>
        //     {parentComments.map(comt => (
        //         <Comment 
        //             key={comt.id} 
        //             comment={comt} 
        //             replies={childComments(comt.id)}
        //         />
                
        //     ))

        //     }
        // </div>
    )
}