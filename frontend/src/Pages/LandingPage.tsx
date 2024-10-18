import React, { useState } from "react";
import { Link } from "react-router-dom";

interface DarkModeProps {
  isDarkMode: boolean;
}

const LandingPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = (): void => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${
        isDarkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-b from-white to-gray-100 text-gray-800"
      }`}
    >
      <nav className="flex justify-between items-center w-full p-4 z-50">
        <div className="text-2xl font-bold">IMAGE GALLERY</div>
        <div className="flex items-center">
          <button
            onClick={toggleDarkMode}
            className={`mr-4 p-2 rounded-full ${
              isDarkMode
                ? "bg-yellow-400 text-gray-900"
                : "bg-gray-800 text-yellow-400"
            }`}
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
          <Link
            to="/login"
            className={`px-6 py-2 mr-4 border rounded-full transition duration-300 ${
              isDarkMode
                ? "border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-gray-900"
                : "border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
            }`}
          >
            Login
          </Link>
          <Link
            to="/register"
            className={`px-6 py-2 rounded-full transition duration-300 ${
              isDarkMode
                ? "bg-purple-500 text-white hover:bg-purple-600"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Sign up
          </Link>
        </div>
      </nav>

      <main className="flex-grow">
        <Banner isDarkMode={isDarkMode} />
        <Features isDarkMode={isDarkMode} />
        <Showcase isDarkMode={isDarkMode} />
        <Testimonials isDarkMode={isDarkMode} />
        <Pricing isDarkMode={isDarkMode} />
        <FAQ isDarkMode={isDarkMode} />
        <CTA isDarkMode={isDarkMode} />
      </main>

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

const Banner: React.FC<DarkModeProps> = ({ isDarkMode }) => (
  <section className="banner relative overflow-hidden py-20">
    <div className="container mx-auto px-6 relative z-10">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1
            className={`text-5xl md:text-6xl font-bold mb-6 ${
              isDarkMode ? "text-purple-300" : "text-gray-800"
            }`}
          >
            Transform Your Visual World
          </h1>
          <p
            className={`text-xl mb-10 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Upload, organize, and analyze your images with AI-powered insights.
            Elevate your creativity and streamline your workflow.
          </p>
          <div className="flex space-x-4">
            <Link
              to="/register"
              className={`px-8 py-3 text-lg font-semibold rounded-full transition duration-300 ${
                isDarkMode
                  ? "bg-purple-500 text-white hover:bg-purple-600"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              Get Started Free
            </Link>
            <Link
              to="/demo"
              className={`px-8 py-3 text-lg font-semibold rounded-full transition duration-300 ${
                isDarkMode
                  ? "bg-transparent border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
                  : "bg-transparent border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
              }`}
            >
              Watch Demo
            </Link>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="relative">
            <div
              className={`w-full h-80 rounded-lg ${
                isDarkMode ? "bg-gray-700" : "bg-gray-200"
              } animate-pulse`}
            ></div>
            <div
              className={`absolute -top-4 -left-4 w-24 h-24 rounded-lg ${
                isDarkMode ? "bg-purple-500" : "bg-indigo-500"
              } animate-bounce`}
            ></div>
            <div
              className={`absolute -bottom-4 -right-4 w-32 h-32 rounded-full ${
                isDarkMode ? "bg-blue-500" : "bg-pink-500"
              } animate-pulse`}
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div
      className={`absolute top-0 left-0 w-full h-full ${
        isDarkMode
          ? "bg-gradient-to-br from-purple-900 to-gray-900"
          : "bg-gradient-to-br from-indigo-100 to-pink-100"
      } opacity-50`}
    ></div>
  </section>
);

const Features: React.FC<DarkModeProps> = ({ isDarkMode }) => (
  <section
    className={`features py-20 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
  >
    <div className="container mx-auto px-6">
      <h2
        className={`text-4xl font-bold text-center mb-12 ${
          isDarkMode ? "text-purple-300" : "text-gray-800"
        }`}
      >
        Why Choose Image Gallery?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <FeatureCard
          icon="🚀"
          title="Lightning Fast"
          description="Upload and access your images at breakneck speeds."
          isDarkMode={isDarkMode}
        />
        <FeatureCard
          icon="🔍"
          title="Smart Analysis"
          description="AI-powered image recognition and tagging for easy organization."
          isDarkMode={isDarkMode}
        />
        <FeatureCard
          icon="🔒"
          title="Secure Storage"
          description="Your images are safe with our top-notch encryption."
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  </section>
);

const FeatureCard: React.FC<{
  icon: string;
  title: string;
  description: string;
  isDarkMode: boolean;
}> = ({ icon, title, description, isDarkMode }) => (
  <div
    className={`rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition duration-300 ${
      isDarkMode ? "bg-gray-700" : "bg-gray-50"
    }`}
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h3
      className={`text-2xl font-semibold mb-2 ${
        isDarkMode ? "text-purple-300" : "text-gray-800"
      }`}
    >
      {title}
    </h3>
    <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
      {description}
    </p>
  </div>
);

const Showcase: React.FC<DarkModeProps> = ({ isDarkMode }) => (
  <section
    className={`showcase py-20 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
  >
    <div className="container mx-auto px-6">
      <h2
        className={`text-4xl font-bold text-center mb-12 ${
          isDarkMode ? "text-purple-300" : "text-gray-800"
        }`}
      >
        Stunning Visual Showcase
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Placeholder for images */}
        <div
          className={`w-full h-64 rounded-lg ${
            isDarkMode ? "bg-gray-700" : "bg-gray-200"
          } animate-pulse`}
        ></div>
        <div
          className={`w-full h-64 rounded-lg ${
            isDarkMode ? "bg-gray-700" : "bg-gray-200"
          } animate-pulse`}
        ></div>
      </div>
    </div>
  </section>
);

const Testimonials: React.FC<DarkModeProps> = ({ isDarkMode }) => (
  <section
    className={`testimonials py-20 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}
  >
    <div className="container mx-auto px-6">
      <h2
        className={`text-4xl font-bold text-center mb-12 ${
          isDarkMode ? "text-purple-300" : "text-gray-800"
        }`}
      >
        What Our Users Are Saying
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Testimonial cards */}
        <TestimonialCard
          quote="This tool has revolutionized the way I work with images."
          author="Jane Doe"
          isDarkMode={isDarkMode}
        />
        <TestimonialCard
          quote="Incredibly fast and reliable. I love it!"
          author="John Smith"
          isDarkMode={isDarkMode}
        />
        <TestimonialCard
          quote="The AI analysis is a game-changer for my workflow."
          author="Sarah Connor"
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  </section>
);

const TestimonialCard: React.FC<{
  quote: string;
  author: string;
  isDarkMode: boolean;
}> = ({ quote, author, isDarkMode }) => (
  <div
    className={`rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition duration-300 ${
      isDarkMode ? "bg-gray-700" : "bg-gray-50"
    }`}
  >
    <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>"{quote}"</p>
    <h3
      className={`mt-4 text-lg font-semibold ${
        isDarkMode ? "text-purple-300" : "text-gray-800"
      }`}
    >
      - {author}
    </h3>
  </div>
);

const Pricing: React.FC<DarkModeProps> = ({ isDarkMode }) => (
  <section
    className={`pricing py-20 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
  >
    <div className="container mx-auto px-6">
      <h2
        className={`text-4xl font-bold text-center mb-12 ${
          isDarkMode ? "text-purple-300" : "text-gray-800"
        }`}
      >
        Pricing Plans
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <PricingCard
          plan="Free"
          price="$0"
          features={["5 GB Storage", "Basic AI Analysis"]}
          isDarkMode={isDarkMode}
        />
        <PricingCard
          plan="Pro"
          price="$19/mo"
          features={["50 GB Storage", "Advanced AI Analysis"]}
          isDarkMode={isDarkMode}
        />
        <PricingCard
          plan="Enterprise"
          price="Contact Us"
          features={["Unlimited Storage", "Custom AI Solutions"]}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  </section>
);

const PricingCard: React.FC<{
  plan: string;
  price: string;
  features: string[];
  isDarkMode: boolean;
}> = ({ plan, price, features, isDarkMode }) => (
  <div
    className={`rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition duration-300 ${
      isDarkMode ? "bg-gray-700" : "bg-gray-50"
    }`}
  >
    <h3
      className={`text-2xl font-semibold mb-4 ${
        isDarkMode ? "text-purple-300" : "text-gray-800"
      }`}
    >
      {plan}
    </h3>
    <p
      className={`text-4xl font-bold mb-4 ${
        isDarkMode ? "text-purple-300" : "text-gray-800"
      }`}
    >
      {price}
    </p>
    <ul className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
      {features.map((feature, index) => (
        <li key={index} className="mb-2">
          {feature}
        </li>
      ))}
    </ul>
    <button
      className={`mt-6 px-6 py-2 rounded-full font-semibold transition duration-300 ${
        isDarkMode
          ? "bg-purple-500 text-white hover:bg-purple-600"
          : "bg-indigo-600 text-white hover:bg-indigo-700"
      }`}
    >
      Choose {plan}
    </button>
  </div>
);

const FAQ: React.FC<DarkModeProps> = ({ isDarkMode }) => (
  <section className={`faq py-20 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
    <div className="container mx-auto px-6">
      <h2
        className={`text-4xl font-bold text-center mb-12 ${
          isDarkMode ? "text-purple-300" : "text-gray-800"
        }`}
      >
        Frequently Asked Questions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <FAQItem
          question="How secure is my data?"
          answer="Your images are stored securely with industry-standard encryption."
          isDarkMode={isDarkMode}
        />
        <FAQItem
          question="What AI features are available?"
          answer="We offer AI-powered image recognition, tagging, and analysis."
          isDarkMode={isDarkMode}
        />
        <FAQItem
          question="Can I upgrade my plan later?"
          answer="Yes, you can upgrade at any time from your account dashboard."
          isDarkMode={isDarkMode}
        />
        <FAQItem
          question="Is there a free trial available?"
          answer="Yes, we offer a free trial with limited features."
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  </section>
);

const FAQItem: React.FC<{
  question: string;
  answer: string;
  isDarkMode: boolean;
}> = ({ question, answer, isDarkMode }) => (
  <div>
    <h3
      className={`text-2xl font-semibold mb-2 ${
        isDarkMode ? "text-purple-300" : "text-gray-800"
      }`}
    >
      {question}
    </h3>
    <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>{answer}</p>
  </div>
);

const CTA: React.FC<DarkModeProps> = ({ isDarkMode }) => (
  <section className={`cta py-20 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
    <div className="container mx-auto px-6 text-center">
      <h2
        className={`text-4xl font-bold mb-6 ${
          isDarkMode ? "text-purple-300" : "text-gray-800"
        }`}
      >
        Ready to Elevate Your Image Workflow?
      </h2>
      <Link
        to="/register"
        className={`px-8 py-4 text-lg font-semibold rounded-full transition duration-300 ${
          isDarkMode
            ? "bg-purple-500 text-white hover:bg-purple-600"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        }`}
      >
        Get Started Today
      </Link>
    </div>
  </section>
);

const Footer: React.FC<DarkModeProps> = ({ isDarkMode }) => (
  <footer className={`footer py-8 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
    <div className="container mx-auto px-6 text-center">
      <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
        &copy; 2024 Image Gallery. All rights reserved.
      </p>
    </div>
  </footer>
);

export default LandingPage;
