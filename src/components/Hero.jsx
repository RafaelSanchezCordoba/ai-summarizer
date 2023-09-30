/* eslint-disable no-unused-vars */
import { logo } from '../assets'

export const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="logo" className="w-28 object-contain" />

        <button
          type="button"
          onClick={() => {
            window.open(
              "https://github.com/RafaelSanchezCordoba/ai-summarizer"
            );
          }}
          className="black_btn"
        >
          GitHub
        </button>
      </nav>

      <h1 className="head_text">
        Summarize Articles with <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI GTP-4</span>
      </h1>

      <h2 className="desc">
        Simplify your readig with Summize, an open-source article summarizer
        that trasnforms lengthy articles into clear and concice summaries.
      </h2>
    </header>
  );
}
