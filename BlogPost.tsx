
import React from 'react';
import { BlogPost, Page } from '../types';

interface BlogPostPageProps {
  post: BlogPost;
  onNavigate: (page: Page) => void;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, onNavigate }) => {
  return (
    <div className="bg-white py-12 sm:py-16 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
            <button onClick={() => onNavigate(Page.Blog)} className="text-blue-600 hover:text-blue-800 font-semibold flex items-center group">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 12h14" />
                </svg>
                العودة إلى المدونة
            </button>
        </div>

        <figure>
          <img
            className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-lg mb-8"
            src={post.imageUrl}
            alt={post.title}
          />
        </figure>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 text-center mb-6 leading-tight">
          {post.title}
        </h1>

        <div 
          className="prose prose-lg prose-blue max-w-none text-right mx-auto"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-center text-center sm:text-right">
            <div className="flex-shrink-0 mb-4 sm:mb-0">
                <img className="h-16 w-16 rounded-full" src={post.author.imageUrl} alt={post.author.name} />
            </div>
            <div className="sm:mr-4">
                <div className="text-lg font-bold text-gray-900">بقلم: {post.author.name}</div>
                <div className="text-gray-600">تاريخ النشر: {post.date}</div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default BlogPostPage;