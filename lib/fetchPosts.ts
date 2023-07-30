import useSWR from 'swr'
import { DEVTO_API_URL } from 'data/constants'
import axios, { AxiosResponse } from 'axios'

const API_URL = '/api/posts/'

type PostProps = {
  id: string
  slug: string
  title: string
  likes: number
  views: number
  createdAt: Date
}

type PostsPayload = {
  dbPosts: PostProps[]
}

async function getPosts(): Promise<PostsPayload> {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data;
}

export const getDbPosts = () => {
  const { data, error, mutate } = useSWR(API_URL, getPosts)
  return {
    dbPosts: data?.dbPosts,
    isLoading: !error && !data,
    isError: error,
  }
}

export const getDevtoPosts = async () => {
  try {
    const res = await fetch(
      `${DEVTO_API_URL}/articles/me`, {
      headers: {
        "api-key": process.env.DEVTO_APIKEY,
      },
    });

    if (res.status < 200 || res.status >= 300) {
      throw new Error(
        `Error fetching... Status code: ${res.status}, ${res.statusText}`
      );
    }

    const dev_posts = await res.json();
    return dev_posts;
  } catch (error) {
    console.error("Error fetching Dev.to posts:", error);
    throw error;
  }
}





