import "./PostDetail.css";
import {useQuery} from "@tanstack/react-query";
import {fetchComments} from "./api.js";

export function PostDetail({post}) {

    const {data, isError, isLoading, error} = useQuery(
        {
            queryKey: ["postComments", post.id],
            queryFn: () => fetchComments(post.id)
        }
    )

    if (isLoading) {
        return (
            <div>
                <h3>Loading . . .</h3>
            </div>
        )
    }

    if (isError) {
        return (
            <div>
                <h3>Oops! something went wrong</h3>
                <p>{error.toString()}</p>
            </div>
        )
    }

    return (
        <>
            <h3 style={{color: "blue"}}>{post.title}</h3>
            <button>Delete</button>
            <button>Update title</button>
            <p>{post.body}</p>
            <h4>Comments</h4>
            {data?.map((comment) => (
                <li key={comment.id}>
                    {comment.email}: {comment.body}
                </li>
            ))}
        </>
    );
}
