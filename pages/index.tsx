/* eslint-disable react-hooks/exhaustive-deps */
import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import {useMemo, useState} from 'react'
import BlogPreview from '../components/BlogPreview'
import {getBlogs} from '../server/blogs'
import {BlogPost} from '../types/blog'

const Home: NextPage = ({
  blogData,
  tags,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [filterWord, setFilterWord] = useState<string[]>([])
  const [selectedIdx, setSelectedIdx] = useState<number[]>([])
  const filteredBlog: BlogPost[] = useMemo(() => {
    return filterWord.length > 0
      ? blogData.filter((blog: BlogPost) => {
          return filterWord.every((filter) => blog.tags.includes(filter))
        })
      : blogData
  }, [filterWord])
  const filterLabel = (tag: any, idx: number) => {
    if (selectedIdx.includes(idx)) {
      setSelectedIdx(selectedIdx.filter((id) => id !== idx))
      setFilterWord(filterWord.filter((filter) => filter !== tag.innerText))
    } else {
      setSelectedIdx([idx])
      setFilterWord([tag.innerText])
    }
  }

  return (
    <main className="layout">
      <title> NgonRight</title>
      <section>
        <header className="mt-4 flex justify-center items-center flex-col h-screen ">
          <div className='section-image max w-48 h-48 relative flex justify-center items-center'>
            <div className='rounded-full text-8xl'>👨‍💻</div>
            <span className='p-24 rounded-full border-4 border-dashed border-sky-400 animate-spin-slow absolute'></span>
          </div>
          <div className='info mt-9'>
            <h1 className="text-center text-[2rem] font-medium"> Kieu Doan Nam </h1>
            <p className="text-center">
              Developer on Weekdays, Avid Writer on Weekends
            </p>
          </div>
          <h3 className='mt-6 mb-6 font-medium text-xl'>Software Alchemist</h3>
          <blockquote className='m-6 p-6 w-[calc(100%-2rem)] relative border-2 '> 
            <p>
              You are the only person you have to live with for the rest of your life
            </p>
            <small className='p-2 m-2 border-2 absolute -right-6 bg-slate-800 italic font-semibold'> - Anonymous</small>
          </blockquote>
        </header>
      </section>
      <section className="flex flex-col items-center text-[1.15rem] mt-12">
        <div className="flex gap-3 mb-12 ">
          <button 
            className='text-neutral-600 hover:text-white transition-all duration-300'
            onClick = {()=>{
              setSelectedIdx([]);
              setFilterWord([])
            }}
          >
            Home
          </button>
          {tags.map((tag: string, idx: number) => {
            return (
              <button
                className={`${
                  selectedIdx.includes(idx)
                    ? 'label-selected hover:bg-sky-400 transition-all duration-300'
                    : 'label hover:bg-sky-400 transition-all duration-300'
                }`}
                key={idx}
                onClick={(e) => filterLabel(e.target, idx)}
              >
                {tag}
              </button>
            )
          })}
        </div>
        {filteredBlog.map((blog: BlogPost) => {
          return (
            <div
              key={blog.id}
              className="max-w-[28em] max-h-[20em] overflow-hidden mx-6 mb-6 bg-neutral-300 text-zinc-800 rounded-lg p-4 hover:bg-neutral-500 hover:text-neutral-300 transition-all duration-300"
            >
              <a href={blog.url} target="_blank" rel="noreferrer">
                <BlogPreview
                  title={blog.title}
                  bodyText={blog.bodyText}
                  createdAt={blog.createdAt}
                  author={blog.author}
                  tags={blog.tags}
                />
              </a>
            </div>
          )
        })}
      </section>
    </main>
  )
}
export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  let blogs: BlogPost[] = await getBlogs()
  let tags: string[] = []
  for (const blog of blogs) {
    for (const tag of blog.tags) {
      if (!tags.includes(tag)) {
        tags.push(tag)
      }
    }
  }
  console.log(tags)
  return {
    props: {
      blogData: blogs,
      tags: tags,
    },
  }
}

