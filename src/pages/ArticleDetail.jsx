import React from 'react';
import { useParams } from 'react-router-dom';

function ArticleDetail() {
  const { slug } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-8">Article Detail</h1>
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <p className="text-gray-400">Article content for: {slug}</p>
      </div>
    </div>
  );
}

export default ArticleDetail;