import React, {useEffect, useState} from 'react';
import {postAPI} from "../services/PostService";
import PostItem from "./PostItem";
import {IPost} from "../models/IPost";

const PostContainer = () => {
    const [limit, setLimit] = useState(100)
    const {data: posts, error, isLoading} = postAPI.useGetPostsQuery(limit)
    const [createPost, {}] = postAPI.useCreatePostMutation()
    const [updatePost, {}] = postAPI.useUpdatePostMutation();
    const [deletePost, {}] = postAPI.useDeletePostMutation();

    useEffect(() => {
        setTimeout(() => {
            setLimit(50)
        }, 2000)
    }, [])

    const handleCreate = async () => {
        const title = prompt("title")
        await createPost({title, body: title} as IPost)
    }

    const handleRemove = async (post: IPost) => {
        await deletePost(post)
    }

    const handleUpdate = async (post: IPost) => {
        await updatePost(post)
    }

    return (
        <div>
            <div className="post__list">
                <button onClick={handleCreate}>Add new post</button>
                {isLoading && <h1>Loading...</h1>}
                {error && <h1>Error happened</h1>}
                {posts && posts.map(post =>
                    <PostItem key={post.id} post={post} remove={handleRemove} update={handleUpdate}/>
                )}
            </div>
        </div>
    );
};

export default PostContainer;
