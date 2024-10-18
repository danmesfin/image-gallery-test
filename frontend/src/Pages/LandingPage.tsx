import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-100">
      <nav className="flex justify-between w-full p-4 z-50">
        <div className="text-2xl font-bold">IMAGE GALLERY</div>
        <div>
          <Link
            to="/login"
            className="px-6 py-2 mr-4 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-2 text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition duration-300"
          >
            Sign up
          </Link>
        </div>
      </nav>

      <main className="flex-grow">
        <section className="hero flex flex-col items-center justify-center p-20 text-center">
          <h1 className="text-7xl font-bold text-gray-800 mb-6">
            Capture. Store. Analyze.
          </h1>
          <p className="max-w-2xl text-xl text-gray-600 mb-10">
            Discover a seamless way to upload, store, and analyze your images
            with our innovative platform. Unleash your creativity and manage
            your visual world effortlessly.
          </p>
          <Link
            to="/register"
            className="px-10 py-4 text-xl font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
          >
            Get Started Free
          </Link>
        </section>

        <section className="features bg-white py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
              Why Choose Image Gallery?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <FeatureCard
                icon="🚀"
                title="Lightning Fast"
                description="Upload and access your images at breakneck speeds."
              />
              <FeatureCard
                icon="🔍"
                title="Smart Analysis"
                description="AI-powered image recognition and tagging for easy organization."
              />
              <FeatureCard
                icon="🔒"
                title="Secure Storage"
                description="Your images are safe with our top-notch encryption."
              />
            </div>
          </div>
        </section>

        <section className="cta bg-indigo-600 text-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Ready to elevate your image management?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of satisfied users and start your journey today.
            </p>
            <Link
              to="/register"
              className="px-10 py-4 text-xl font-semibold bg-white text-indigo-600 rounded-full hover:bg-gray-100 transition duration-300"
            >
              Sign Up Now
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>
            &copy; {new Date().getFullYear()} Image Gallery. All rights
            reserved.
          </p>
        </div>
      </footer>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => (
  <div className="bg-gray-50 rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition duration-300">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default LandingPage;
