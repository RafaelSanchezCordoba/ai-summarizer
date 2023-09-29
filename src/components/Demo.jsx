/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { copy, linkIcon, loader, tick } from '../assets'

export const Demo = () => {
  const [article, setArticle] = useState({
    url: '',
    summary: ''
  });

  const handleSubmit = (e) => {
    alert('submitted')
  }

  return (
    <section className='w-full max-w-xl mt-16'>
      {/* Search */}
      <div className="flex flex-col w-full gap-2">
        <form 
          className="relative flex items-center justify-center"
          onSubmit={handleSubmit}
        >
          <img 
            src={linkIcon}
            alt="link_icon" 
            className='absolute left-0 w-5 my-2 ml-3'
          />

          <input 
            type='url'
            placeholder='Enter a URL'
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value})}
            required
            className='url_input peer'
          />

          <button
            type='submit'
            className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'
          >
            <p>↵</p>
          </button>

        </form>
          {/* Browse URL History */}
      </div>
      {/* Display Resutls */}
    </section>
  )
}