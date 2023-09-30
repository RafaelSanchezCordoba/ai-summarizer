/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { copy, linkIcon, loader, tick } from '../assets'
import axios from 'axios';

export const Demo = () => {
  const [article, setArticle] = useState({
    url: '',
    summary: ''
  });

  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState('');

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'));

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const options = {
    method: 'GET',
    url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
    params: {
      url: article.url,
      length: '3'
    },
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
      'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.request(options);
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      
      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
    } catch (error) {
      setError(error);
      console.log(error);
    }
    setLoading(false);
  }

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
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
        <div className="flex flex-col gap-1 overflow-y-auto max-h-60">
          {allArticles.map((article, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(article)}
              className='link_card'
            >
              <div className="copy_btn" onClick={() => {handleCopy(article.url)}}>
                <img 
                  src={copied === article.url ? tick : copy}
                  alt="copy_icon" 
                  className='w-[40%] h-[40%] object-contain'
                />
              </div>
              <p className='flex-1 text-sm font-medium text-blue-700 truncate font-satoshi'>
                {article.url}
              </p>
            </div>
          ))}
        </div>

      </div>
      {/* Display Resutls */}
      <div className='flex items-center justify-center max-w-full my-10'>
        {loading ? (
          <img src={loader} alt='loader' className='object-contain w-20 h-20' />
        ) : error ? (
          <p className='font-bold text-center text-black font-inter'>
            Well, that was not supposed to happen...
            <br />
            <span className='font-normal text-gray-700 font-satoshi'>
              {error?.message}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='text-xl font-bold text-gray-600 font-satoshi'>
                Article <span className='blue_gradient'>Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='text-sm font-medium text-gray-700 font-inter'>
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>

    </section>
  )
}