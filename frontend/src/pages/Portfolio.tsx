"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaFileAlt,
  FaTimes as FaClose,
  FaMoon,
  FaSun,
} from "react-icons/fa";

type Project = {
  title: string;
  description: string;
  technologies: string[];
  detailedDescription: string[];
  imgs: string[];
  githubLink: string;
};

const projects: Project[] = [
  {
    title: "E-commerce Platform",
    description:
      "A full-stack e-commerce solution with user authentication, product management, and payment integration.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    detailedDescription: [
      "Comprehensive solution for online businesses",
      "Features user authentication and product catalog management",
      "Includes shopping cart functionality and secure payment processing using Stripe",
      "Frontend built with React for responsive and interactive UI",
      "Backend uses Node.js and Express to handle API requests and business logic",
      "MongoDB used as the database for product information, user data, and order details",
    ],
    imgs: [
      "https://res.cloudinary.com/dpisj0lfy/image/upload/v1727102078/uploads/g2ho8q1jkik2b29sfvnu.png",
      "/placeholder.svg?height=300&width=400",
    ],
    githubLink: "https://github.com/yourusername/ecommerce-platform",
  },
  {
    title: "Task Manager",
    description:
      "A React-based task management app with drag-and-drop functionality and real-time updates.",
    technologies: ["React", "Redux", "Firebase", "Material-UI"],
    detailedDescription: [
      "Efficient task creation, organization, and tracking",
      "Drag-and-drop interface for easy task prioritization and status updates",
      "React frontend with Redux for state management",
      "Firebase integration for real-time data synchronization and user authentication",
      "Material-UI used for clean and modern user interface design",
    ],
    imgs: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    githubLink: "https://github.com/yourusername/task-manager",
  },
  {
    title: "Weather App",
    description:
      "Real-time weather forecasting application with location-based services and interactive maps.",
    technologies: ["Vue.js", "OpenWeatherMap API", "Mapbox", "Axios"],
    detailedDescription: [
      "Provides real-time weather information and forecasts",
      "Uses OpenWeatherMap API for accurate weather data",
      "Features location-based services for personalized forecasts",
      "Includes interactive map powered by Mapbox for visual weather exploration",
      "Built with Vue.js for responsive and intuitive user interface",
      "Axios used for efficient API requests to fetch weather data",
    ],
    imgs: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    githubLink: "https://github.com/yourusername/weather-app",
  },
  {
    title: "Portfolio Website",
    description:
      "This responsive portfolio site showcasing my projects and skills.",
    technologies: ["React", "Tailwind CSS", "Next.js"],
    detailedDescription: [
      "Showcase of skills, projects, and professional experience",
      "Built with React and Next.js for fast loading times and optimal performance",
      "Responsive design implemented with Tailwind CSS",
      "Ensures great user experience across all devices",
      "Includes sections for about me, skills, project showcase, and contact information",
    ],
    imgs: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    githubLink: "https://github.com/yourusername/portfolio-website",
  },
];

const skills: string[] = [
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "SQL",
  "Git",
];

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  darkMode: boolean;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  darkMode,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className={`${
          darkMode ? "bg-black text-rose-50" : "bg-white text-black"
        } rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 ease-in-out transform hover:scale-[1.02]`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold">{project.title}</h3>
            <button
              onClick={onClose}
              className="text-current hover:text-gray-500 transition-colors duration-300"
            >
              <FaClose className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <ul className="list-disc pl-5 mb-4">
            {project.detailedDescription.map((point, index) => (
              <li key={index} className="mb-2">
                {point}
              </li>
            ))}
          </ul>
          <div className="mb-4">
            <h4 className="font-semibold text-lg mb-2">Technologies used:</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className={`${
                    darkMode ? "bg-white text-black" : "bg-black text-rose-50"
                  } px-2 py-1 rounded text-sm`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.imgs.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${project.title} screenshot ${index + 1}`}
                width={400}
                height={300}
                className="rounded-lg transition-transform duration-300 hover:scale-105"
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const TypewriterEffect: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 10);

    return () => clearInterval(typingInterval);
  }, [text]);

  return <span>{displayedText}</span>;
};

// interface PortfolioProps {
//   profileId?: string;
// }

const Portfolio: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [visibleProjects, setVisibleProjects] = useState<number>(2);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [profile, setProfile]: any = useState();
  const [valid, setValid] = useState(false);

  let params: any = useParams<{ profileId: string; name: string }>();
  let profileId = params.profileId;

  const getProfile = async () => {
    try {
      let response: any = await axios.get(
        `http://localhost:5100/api/user/details/${profileId}`
      );
      if (response.status === 200) {
        console.log("New PRofile is : ", profile);

        console.log("response is : ", response);
        setProfile(response.data.userProfile);
        console.log("New PRofile is : ", profile);
        console.log("skiils is : ", skills);

        setValid(true);
      } else {
        console.log("Failed to get data");
      }
    } catch (error) {
      console.log("failed to get Data", error);
      setValid(false);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const openProjectModal = (project: Project): void => {
    setSelectedProject(project);
  };

  const closeProjectModal = (): void => {
    setSelectedProject(null);
  };

  const toggleDarkMode = (): void => {
    setDarkMode(!darkMode);
  };

  const loadMoreProjects = (): void => {
    setVisibleProjects((prev) => Math.min(prev + 2, projects.length));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div>
      {valid ? (
        <div
          className={`min-h-screen ${
            darkMode ? "bg-black text-rose-50" : "bg-white text-black"
          } transition-colors duration-300`}
          style={{ fontFamily: "Times New Roman, serif" }}
        >
          {/* Navbar */}
          <nav
            className={`${
              darkMode ? "bg-black" : "bg-white"
            } shadow-lg sticky top-0 z-40 transition-colors duration-300`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    src="./1.svg?height=40&width=40"
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full mr-2 transition-transform duration-300 hover:scale-110"
                  />
                  <span className="text-xl font-bold transition-colors duration-300">
                    {profile.name}
                    {/* roshan patil */}
                  </span>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {["About", "Skills", "Projects", "Resume", "Contact"].map(
                    (item) => (
                      <button
                        key={item}
                        onClick={() => scrollToSection(item.toLowerCase())}
                        className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                      >
                        {item}
                      </button>
                    )
                  )}
                  <button
                    onClick={toggleDarkMode}
                    className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                    aria-label={
                      darkMode ? "Switch to light mode" : "Switch to dark mode"
                    }
                  >
                    {darkMode ? (
                      <FaSun className="transition-transform duration-300 hover:rotate-180" />
                    ) : (
                      <FaMoon className="transition-transform duration-300 hover:rotate-180" />
                    )}
                  </button>
                </div>
                <div className="flex items-center sm:hidden">
                  <button
                    onClick={toggleDarkMode}
                    className="mr-2 p-2 rounded-md transition-colors duration-300"
                    aria-label={
                      darkMode ? "Switch to light mode" : "Switch to dark mode"
                    }
                  >
                    {darkMode ? (
                      <FaSun className="transition-transform duration-300 hover:rotate-180" />
                    ) : (
                      <FaMoon className="transition-transform duration-300 hover:rotate-180" />
                    )}
                  </button>
                  <button
                    onClick={toggleMenu}
                    className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-300"
                  >
                    <span className="sr-only">Open main menu</span>
                    {isMenuOpen ? (
                      <FaTimes className="block h-6 w-6" />
                    ) : (
                      <FaBars className="block h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            {/* Mobile menu */}
            <div className={`${isMenuOpen ? "block" : "hidden"} sm:hidden`}>
              <div className="px-2 pt-2 pb-3 space-y-1">
                {["About", "Skills", "Projects", "Resume", "Contact"].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors duration-300"
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            </div>
          </nav>

          <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {/* Hero section with animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col md:flex-row items-center justify-between mb-16"
              >
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="md:w-1/2 mb-8 md:mb-0"
                >
                  <img
                    src="https://res.cloudinary.com/dpisj0lfy/image/upload/v1727793613/uploads/avatar/avatar_66f585cdf9aa8646e828bbf4_1727793611911.png"
                    alt="profile image"
                    width={250}
                    height={250}
                    className="rounded-full mx-auto md:mx-0 transition-transform duration-300 hover:scale-105"
                  />
                </motion.div>
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="md:w-1/2 text-center md:text-left"
                >
                  <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl mb-4">
                    {profile.name}
                  </h1>
                  <p className="text-xl sm:text-2xl mb-6">{profile.about}</p>
                  <p className="text-lg mb-8">{profile.descriptors}</p>
                  <div className="flex justify-center md:justify-start space-x-4">
                    <a
                      href="https://github.com"
                      className="transition-colors duration-300"
                    >
                      <span className="sr-only">GitHub</span>
                      <FaGithub className="h-8 w-8 transition-transform duration-300 hover:scale-110" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      className="transition-colors duration-300"
                    >
                      <span className="sr-only">LinkedIn</span>
                      <FaLinkedin className="h-8 w-8 transition-transform duration-300 hover:scale-110" />
                    </a>
                    <a
                      href="mailto:johndoe@example.com"
                      className="transition-colors duration-300"
                    >
                      <span className="sr-only">Email</span>
                      <FaEnvelope className="h-8 w-8 transition-transform duration-300 hover:scale-110" />
                    </a>
                  </div>
                </motion.div>
              </motion.div>

              {/* About Me with typing animation */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2 }}
                id="about"
                className="mb-16"
              >
                <h2 className="text-3xl font-bold mb-4">About Me</h2>
                <p className="text-lg">
                  <TypewriterEffect text="I'm a passionate full stack developer with experience in building web applications using modern technologies. I love solving complex problems and creating intuitive user experiences." />
                </p>
              </motion.section>

              {/* Skills with flowing animation */}
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                id="skills"
                className="mb-16"
              >
                <h2 className="text-3xl font-bold mb-6">Skills</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* <h1>{profile}</h1> */}
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`${
                        darkMode
                          ? "bg-white text-black"
                          : "bg-black text-rose-50"
                      } rounded-lg shadow p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-105`}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Projects with flowing animation */}
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                id="projects"
                className="mb-16"
              >
                <h2 className="text-3xl font-bold mb-6">Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.slice(0, visibleProjects).map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`${
                        darkMode
                          ? "bg-white text-black"
                          : "bg-black text-rose-50"
                      } rounded-lg shadow overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105`}
                    >
                      <div className="p-6">
                        <h3 className="font-bold text-xl mb-2">
                          {project.title}
                        </h3>
                        <p className="mb-4">{project.description}</p>
                        <div className="mb-4">
                          <h4 className="font-semibold text-sm mb-2">
                            Technologies used:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className={`${
                                  darkMode
                                    ? "bg-black text-rose-50"
                                    : "bg-white text-black"
                                } px-2 py-1 rounded text-sm`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <motion.button
                            onClick={() => openProjectModal(project)}
                            className={`w-full sm:w-auto ${
                              darkMode
                                ? "bg-black text-rose-50 hover:bg-gray-800"
                                : "bg-white text-black hover:bg-gray-200"
                            } font-bold py-2 px-4 rounded transition-all duration-300 hover:shadow-lg`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Read More
                          </motion.button>
                          <motion.a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-full sm:w-auto ${
                              darkMode
                                ? "bg-white text-black hover:bg-gray-200"
                                : "bg-black text-rose-50 hover:bg-gray-800"
                            } text-center font-bold py-2 px-4 rounded transition-all duration-300 hover:shadow-lg flex items-center justify-center`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FaGithub className="mr-2" />
                            GitHub
                          </motion.a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                {visibleProjects < projects.length && (
                  <div className="text-center mt-8">
                    <motion.button
                      onClick={loadMoreProjects}
                      className={`${
                        darkMode
                          ? "bg-white text-black hover:bg-gray-200"
                          : "bg-black text-rose-50 hover:bg-gray-800"
                      } font-bold py-2 px-6 rounded-full transition-all duration-300 hover:shadow-lg`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View More Projects
                    </motion.button>
                  </div>
                )}
              </motion.section>

              {/* Resume */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                id="resume"
                className="mb-16"
              >
                <h2 className="text-3xl font-bold mb-4">Resume</h2>
                <div
                  className={`${
                    darkMode ? "bg-white text-black" : "bg-black text-rose-50"
                  } rounded-lg shadow p-6 transition-all duration-300 hover:shadow-lg`}
                >
                  <p className="mb-4">
                    Download my resume to learn more about my work experience,
                    education, and skills.
                  </p>
                  <motion.a
                    href="/path-to-your-resume.pdf"
                    download
                    className={`inline-flex items-center ${
                      darkMode
                        ? "bg-black text-rose-50 hover:bg-gray-800"
                        : "bg-white text-black hover:bg-gray-200"
                    } font-bold py-2 px-4 rounded transition-all duration-300 hover:shadow-lg`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaFileAlt className="mr-2" />
                    Download Resume
                  </motion.a>
                </div>
              </motion.section>

              {/* Contact */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                id="contact"
                className="mb-16"
              >
                <h2 className="text-3xl font-bold mb-4">Contact</h2>
                <div className="flex justify-center space-x-4 mb-8">
                  <motion.a
                    href="https://github.com"
                    className="transition-colors duration-300"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="sr-only">GitHub</span>
                    <FaGithub className="h-8 w-8" />
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com"
                    className="transition-colors duration-300"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="sr-only">LinkedIn</span>
                    <FaLinkedin className="h-8 w-8" />
                  </motion.a>
                  <motion.a
                    href="mailto:johndoe@example.com"
                    className="transition-colors duration-300"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="sr-only">Email</span>
                    <FaEnvelope className="h-8 w-8" />
                  </motion.a>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className={`${
                    darkMode ? "bg-white text-black" : "bg-black text-rose-50"
                  } rounded-lg shadow p-6`}
                >
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-bold mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 border rounded-md ${
                        darkMode
                          ? "border-black text-black"
                          : "border-white text-rose-50"
                      } bg-transparent`}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 py-2 border rounded-md ${
                        darkMode
                          ? "border-black text-black"
                          : "border-white text-rose-50"
                      } bg-transparent`}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="message"
                      className="block text-sm font-bold mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className={`w-full px-3 py-2 border rounded-md ${
                        darkMode
                          ? "border-black text-black"
                          : "border-white text-rose-50"
                      } bg-transparent`}
                    ></textarea>
                  </div>
                  <motion.button
                    type="submit"
                    className={`${
                      darkMode
                        ? "bg-black text-rose-50 hover:bg-gray-800"
                        : "bg-white text-black hover:bg-gray-200"
                    } font-bold py-2 px-4 rounded transition-all duration-300 hover:shadow-lg`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send Message
                  </motion.button>
                </form>
              </motion.section>
            </div>
          </div>

          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={closeProjectModal}
              darkMode={darkMode}
            />
          )}
        </div>
      ) : (
        <h1 className="text-white bg-black h-max w-max flex ">
          {" "}
          No Such Profile
        </h1>
      )}
      <h1 className="text-black">Heyy : : : {valid} </h1>
    </div>
  );
};

export default Portfolio;
