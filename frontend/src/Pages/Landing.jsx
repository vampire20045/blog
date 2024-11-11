import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-green-400 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Our Blog</h1>
          <p className="text-xl mb-8">Discover amazing articles and insights from our community.</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate('/signup')}
              className="bg-white text-blue-600 font-bold py-2 px-4 rounded hover:bg-gray-200"
            >
              Sign Up
            </button>
            <button
              onClick={() => navigate('/login')}
              className="bg-white text-blue-600 font-bold py-2 px-4 rounded hover:bg-gray-200"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Featured Articles Section */}
      <div className="container mx-auto py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Article 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-2">Article Title 1</h3>
            <p className="text-gray-700 mb-4">A brief description of the article goes here.</p>
            <button
              onClick={() => navigate('/category/blog')}
              className="text-blue-600 font-bold hover:underline"
            >
              Read More
            </button>
          </div>
          {/* Article 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-2">Article Title 2</h3>
            <p className="text-gray-700 mb-4">A brief description of the article goes here.</p>
            <button
              onClick={() => navigate('/category/blog')}
              className="text-blue-600 font-bold hover:underline"
            >
              Read More
            </button>
          </div>
          {/* Article 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-2">Article Title 3</h3>
            <p className="text-gray-700 mb-4">A brief description of the article goes here.</p>
            <button
              onClick={() => navigate('/category/blog')}
              className="text-blue-600 font-bold hover:underline"
            >
              Read More
            </button>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gray-200 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl mb-8">Sign up today and start sharing your own articles.</p>
          <button
            onClick={() => navigate('/signup')}
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          >
            Sign Up Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;