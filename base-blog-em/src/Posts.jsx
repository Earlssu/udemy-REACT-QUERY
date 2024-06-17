import {useEffect, useState} from "react";
import {PostDetail} from "./PostDetail";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deletePost, fetchPosts, updatePost} from "./api.js";

const maxPostPage = 10;

export function Posts() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPost, setSelectedPost] = useState(null);

    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: (postId) => deletePost(postId)
    })

    const updateMutation = useMutation({
        mutationFn: (postId) => updatePost(postId)
    })

    const {data, isError, error, isLoading} = useQuery({
        queryKey: ["posts", currentPage],
        queryFn: () => fetchPosts(currentPage),
        staleTime: 2000,
    });

    useEffect(() => {
        if (currentPage < maxPostPage) {
            const nextPage = currentPage + 1;
            queryClient.prefetchQuery({
                queryKey: ["posts", nextPage],
                queryFn: () => fetchPosts(nextPage),
            });
        }
    }, [currentPage, queryClient]);

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
            <ul>
                {data.map((post) => (
                    <li
                        key={post.id}
                        className="post-title"
                        onClick={() => {
                            deleteMutation.reset();
                            updateMutation.reset();
                            setSelectedPost(post);
                        }}
                    >
                        {post.title}
                    </li>
                ))}
            </ul>
            <div className="pages">
                <button disabled={currentPage <= 1} onClick={() => {
                    setCurrentPage(currentPage - 1);
                }}>
                    Previous page
                </button>
                <span>Page {currentPage}</span>
                <button disabled={currentPage >= maxPostPage} onClick={() => {
                    setCurrentPage(currentPage + 1);
                }}>
                    Next page
                </button>
            </div>
            <hr/>
            {selectedPost &&
                <PostDetail post={selectedPost} deleteMutation={deleteMutation} updateMutation={updateMutation}/>}
        </>
    );
}
