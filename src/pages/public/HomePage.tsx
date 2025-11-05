const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-5xl font-bold text-gray-800 mb-4 text-center">
          Welcome to My Portfolio
        </h1>
        <div className="flex justify-center gap-4">
          <a
            href="/projects"
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-all"
          >
            View Projects
          </a>
          <a
            href="/skills"
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition-all"
          >
            My Skills
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
