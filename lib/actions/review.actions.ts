"use server"

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";


interface Params{
    text: String,
    rate: Number,
    movieId: number,
    year: String,
    title: String,
    posterLink: String,
    path: string,
}


export async function createReview({ text, rate, movieId, year, title, posterLink, path }: Params){
    try{
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        
        const response: any = await fetch(
          "http://localhost/Relioo/api/posts/createPost.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              movie_id: movieId,
              text: text,
              year: year,
              posterLink: posterLink,
              title: title,
              rate: rate,
            }),
          }
        );

        const res = await response.json();
        console.log(res);
        

    revalidatePath(path);
    }catch(error: any){
        throw new Error(`Error posting Review ${error.message}`)
    }
    
};

export async function fetchPosts(){
  
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
        
    const response: any = await fetch(
          "http://localhost/relioo/api/posts/Allposts.php",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );


        const res = await response.json();
        return(res);

};
export async function fetchBookmarks(){
  
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
        
    const response: any = await fetch(
          "http://localhost/relioo/api/posts/getBookmarkes.php",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );


        const res = await response.json();
        // console.log(res)
        return(res);

};

export async function fetchOnePost(postId: string){
  
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
        
    const response: any = await fetch(
          `http://localhost/Relioo/api/posts/getPost.php?post_id=${postId}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );


        const res = await response.json();
        // console.log(res)
        return(res);

};


export async function addRemoveLike(post_id: string){
    
    try{
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        
        const response: any = await fetch(
          "http://localhost/Relioo/api/posts/postLikeInsert.delete.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              post_id: post_id,
            }),
          }
        );

        const res = await response.json();
        console.log(res);
        
    }catch(error: any){
        throw new Error(`Error liking ${error.message}`)
    }
};


export async function addRemoveBookmark(post_id: string){
    
    try{
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        
        const response: any = await fetch(
          "http://localhost/Relioo/api/posts/bookmark.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              post_id: post_id,
            }),
          }
        );

        const res = await response.json();
        console.log(res);
        
    }catch(error: any){
        throw new Error(`Error liking ${error.message}`)
    }
};



export async function addComment(post_id: string, comment_text: string){
    
    try{
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        
        const response: any = await fetch(
          "http://localhost/Relioo/api/posts/postCommentInsert.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              post_id: post_id,
              text: comment_text,
            }),
          }
        );

        const res = await response.json();
        // const res = await response.text();
        return res;
        // console.log(res);
        // console.log("commenting on post_id:", post_id);

        
    }catch(error: any){
        throw new Error(`Error commenting ${error.message}`)
    }
};


