import React from "react";
import { BlogPost } from "../../types/types";
import useBlogPosts from "./useBlogPosts";



const BlogPostTable: React.FC = () =>{
  const { blogPosts, itemsPerPage, selectedPost, currentPage, currentItems, handlePostClick, handlePageChange, handleResetTable } = useBlogPosts();

    return(
        <div className="bg-yellow-500">
            <h1 className="text-center text-xl font-bold text-white">{selectedPost ? "Post Detail" : "Blog Posts"}</h1>
            <hr className="bg-white my-4 mx-4 h-1" />
            <table className="my-0 mx-4 border-separate border-slate-400 table-fixed">
                <thead>
                    <tr>
                        <th className="bg-blue-300 border border-slate-300 text-white px-4 py-2"></th>
                        <th className="bg-blue-300 border border-slate-300 text-white px-4 py-2">Title</th>
                        <th className="bg-blue-300 border border-slate-300 text-white px-4 py-2">Body</th>
                    </tr>
                </thead>
                <tbody>
                    {!selectedPost ? currentItems.map((post: BlogPost) => (
                        <tr key={post.id} >
                            <td className="bg-white border border-slate-300 px-4 py-2 hover:bg-blue-200 cursor-pointer" onClick = {() => handlePostClick(post.id)}>{post.id}</td>
                            <td className="bg-white border border-slate-300 px-4 py-2">{post.title}</td>
                            <td className="bg-white border border-slate-300 px-4 py-2">{post.body}</td>
                        </tr>
                    )) :
                    <tr key={selectedPost.id}>
                        <td className="bg-white border border-slate-300 px-4 py-2">{selectedPost.id}</td>
                        <td className="bg-white border border-slate-300 px-4 py-2">{selectedPost.title}</td>
                        <td className="bg-white border border-slate-300 px-4 py-2">{selectedPost.body}</td>
                    </tr>               
                    }
                </tbody>
            </table>
            {/* Pagination */}
            {!selectedPost ? 
                <div className="flex justify-center mt-4">
                    {Array(Math.ceil(blogPosts.length / itemsPerPage))
                    .fill(0)
                    .map((_, index) => (
                        <button
                        key={index}
                        className={`mx-1 px-4 py-2 rounded ${
                            currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                        onClick={() => handlePageChange(index + 1)}
                        >
                        {index + 1}
                        </button>
                    ))}
                </div>
            : <button className="mx-4 px-4 py-2 rounded bg-blue-500 text-white" onClick = {() => handleResetTable()}>Reset</button>}
        </div>
    );
}

export default BlogPostTable;

