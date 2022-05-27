import React from 'react'

export default function Comment({comment, replies}) {
  return (
        <div className="space-y-4">
            <div className="flex">
                <div className="flex-shrink-0 mr-3">
                    <img className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10" src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80" alt=""/>
                </div>
                <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                    <strong>{comment.name}</strong> <span className="text-xs text-gray-400">3:34 PM</span>
                    <p className="text-sm md:text-base">{comment.content}</p>
                    {/* <h4 className="my-5 uppercase tracking-wide text-gray-400 font-bold text-xs">Replies</h4> */}
                </div>
            </div>
            <div className=''>
                {replies.length > 0 && (
                    <div>
                        {replies.map(reply => (
                            <Comment key={reply.id} comment={reply} replies={[]}/>
                        ))
                        }
                    </div>
                )}
            </div>
        </div>     
  )
}

