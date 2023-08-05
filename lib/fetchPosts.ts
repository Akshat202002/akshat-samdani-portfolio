import useSWR from 'swr';
import { DEVTO_API_URL } from 'data/constants';
// import axios, { AxiosResponse } from 'axios';

const API_URL = '/api/posts/';

type PostProps = {
  id: string;
  slug: string;
  title: string;
  likes: number;
  views: number;
  createdAt: Date;
};

type PostsPayload = {
  dbPosts: PostProps[];
};

async function getPosts(): Promise<PostsPayload> {
  const res = await fetch(API_URL);
  return res.json();
}

// async function getPosts(): Promise<PostsPayload> {
//   try {
//     const res = await fetch(API_URL);
//     console.log("Response status:", res.status);
//     if (!res.ok) {
//       throw new Error(`Fetch failed with status ${res.status}`);
//     }
//     const data = await res.json();
//     console.log("Fetched data:", data);
//     return data;
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     throw error;
//   }
// }


export const getDbPosts = () => {
  const { data, error } = useSWR(API_URL, getPosts)
  // if (data?.dbPosts) { 

  //   console.log("data.dbPosts:", data.dbPosts);
  // }
  // else {
  //   console.log("data.dbPosts is null");
  // }
  return {
    dbPosts: data?.dbPosts,
    isLoading: !error && !data,
    isError: error,
  }
}

// export const getDevtoPosts = async () => {
//   try {
//     const res = await fetch(
//       `${DEVTO_API_URL}/articles/me`, {
//       headers: {
//         "api-key": process.env.DEVTO_APIKEY,
//       },
//     });

//     if (res.status < 200 || res.status >= 300) {
//       throw new Error(
//         `Error fetching... Status code: ${res.status}, ${res.statusText}`
//       );
//     }

//     const dev_posts = await res.json();
//     return dev_posts;
//   } catch (error) {
//     console.error("Error fetching Dev.to posts:", error);
//     throw error;
//   }
// }

export const getDevtoPosts = async () => {
  const res = await fetch(`${DEVTO_API_URL}/articles?username=${process.env.DEVTO_USERNAME}`);

  if (res.status < 200 || res.status >= 300) {
    throw new Error(`Error fetching... Status code: ${res.status}, ${res.statusText}`);
  }
  const dev_posts = await res.json();
  return dev_posts;
};

// export const getDevtoPosts = async () => {
//   const params = { username: process.env.DEVTO_USERNAME, per_page: 1000 };
//   const headers = { "api-key": process.env.DEVTO_APIKEY };

//   const { data }: AxiosResponse = await axios.get(
//     `${DEVTO_API_URL}/articles/me`,
//     {
//       params,
//       headers
//     }
//   );
//   return data;
// };



