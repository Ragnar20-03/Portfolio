'use client'

import React, { useState, useEffect } from 'react'
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes, FaFileAlt, FaTimes as FaClose, FaMoon, FaSun } from 'react-icons/fa'

type Project = {
  title: string;
  description: string;
  technologies: string[];
  detailedDescription: string;
  imgs: string[];
  githubLink: string;
}

const projects: Project[] = [
  {
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce solution with user authentication, product management, and payment integration.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    detailedDescription: 'This e-commerce platform provides a comprehensive solution for online businesses. It features user authentication, product catalog management, shopping cart functionality, and secure payment processing using Stripe. The frontend is built with React for a responsive and interactive user interface, while the backend uses Node.js and Express to handle API requests and business logic. MongoDB is used as the database to store product information, user data, and order details.',
    imgs: ['https://res.cloudinary.com/dpisj0lfy/image/upload/v1727102078/uploads/g2ho8q1jkik2b29sfvnu.png', '/placeholder.svg?height=300&width=400'],
    githubLink: 'https://github.com/yourusername/ecommerce-platform'
  },
  {
    title: 'Task Manager',
    description: 'A React-based task management app with drag-and-drop functionality and real-time updates.',
    technologies: ['React', 'Redux', 'Firebase', 'Material-UI'],
    detailedDescription: 'This task management application allows users to create, organize, and track their tasks efficiently. It features a drag-and-drop interface for easy task prioritization and status updates. The app uses React for the frontend, with Redux for state management. Firebase is integrated for real-time data synchronization and user authentication. Material-UI is used for a clean and modern user interface design.',
    imgs: ['/placeholder.svg?height=300&width=400', '/placeholder.svg?height=300&width=400'],
    githubLink: 'https://github.com/yourusername/task-manager'
  },
  {
    title: 'Weather App',
    description: 'Real-time weather forecasting application with location-based services and interactive maps.',
    technologies: ['Vue.js', 'OpenWeatherMap API', 'Mapbox', 'Axios'],
    detailedDescription: "This weather application provides users with real-time weather information and forecasts. It uses the OpenWeatherMap API to fetch accurate weather data based on the user's location or a searched city. The app features an interactive map powered by Mapbox, allowing users to visually explore weather patterns. Built with Vue.js, the app offers a responsive and intuitive user interface. Axios is used for making API requests to fetch weather data efficiently.",
    imgs: ['/placeholder.svg?height=300&width=400', '/placeholder.svg?height=300&width=400'],
    githubLink: 'https://github.com/yourusername/weather-app'
  },
  {
    title: 'Portfolio Website',
    description: 'This responsive portfolio site showcasing my projects and skills.',
    technologies: ['React', 'Tailwind CSS', 'Next.js'],
    detailedDescription: 'This portfolio website serves as a showcase of my skills, projects, and professional experience. Built with React and Next.js, it offers fast loading times and optimal performance. The site features a responsive design implemented with Tailwind CSS, ensuring a great user experience across all devices. It includes sections for an about me, skills, project showcase, and contact information.',
    imgs: ['/placeholder.svg?height=300&width=400', '/placeholder.svg?height=300&width=400'],
    githubLink: 'https://github.com/yourusername/portfolio-website'
  },
]

const skills: string[] = ['TypeScript', 'React', 'Node.js', 'Python', 'SQL', 'Git']

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  darkMode: boolean;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, darkMode }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 ease-in-out transform hover:scale-[1.02]`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold">{project.title}</h3>
            <button onClick={onClose} className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'} transition-colors duration-300`}>
              <FaClose className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>{project.detailedDescription}</p>
          <div className="mb-4">
            <h4 className={`font-semibold text-lg ${darkMode ? 'text-gray-200' : 'text-gray-800'} mb-2`}>Technologies used:</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span key={index} className={`${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-200 text-gray-700'} px-2 py-1 rounded text-sm transition-colors duration-300`}>
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
      </div>
    </div>
  )
}

const Portfolio: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [darkMode, setDarkMode] = useState<boolean>(true)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  const openProjectModal = (project: Project): void => {
    setSelectedProject(project)
  }

  const closeProjectModal = (): void => {
    setSelectedProject(null)
  }

  const toggleDarkMode = (): void => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
      {/* Navbar */}
      <nav className={`${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-lg sticky top-0 z-40 transition-colors duration-300`}>
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
              <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} transition-colors duration-300`}> Roshan Patil</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {['About', 'Skills', 'Projects', 'Resume', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300`}
                >
                  {item}
                </button>
              ))}
              <button
                onClick={toggleDarkMode}
                className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300`}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <FaSun className="transition-transform duration-300 hover:rotate-180" /> : <FaMoon className="transition-transform duration-300 hover:rotate-180" />}
              </button>
            </div>
            <div className="flex items-center sm:hidden">
              <button
                onClick={toggleDarkMode}
                className={`mr-2 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} p-2 rounded-md transition-colors duration-300`}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <FaSun className="transition-transform duration-300 hover:rotate-180" /> : <FaMoon className="transition-transform duration-300 hover:rotate-180" />}
              </button>
              <button
                onClick={toggleMenu}
                className={`inline-flex items-center justify-center p-2 rounded-md ${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors duration-300`}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? <FaTimes className="block h-6 w-6" /> : <FaBars className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {['About', 'Skills', 'Projects', 'Resume', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors duration-300`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="text-center mb-12">
            <img
              src="/https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw11Mm2-012shxL-9dcGEi4r&ust=1727458667624000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKCp6pOT4YgDFQAAAAAdAAAAABAE"
              alt="Roshan Patil"
              width={150}
              height={150}
              className="rounded-full mx-auto mb-4 transition-transform duration-300 hover:scale-110"
            />
            <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} sm:text-5xl md:text-6xl transition-colors duration-300`}>
              Roshan Patil
            </h1>
            <p className={`mt-3 text-xl ${darkMode ? 'text-gray-300' : 'text-gray-500'} sm:mt-5 sm:text-2xl transition-colors duration-300`}>
              Full Stack Developer
            </p>
          </header>

          {/* About Me */}
          <section id="about" className="mb-12">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4 transition-colors duration-300`}>About Me</h2>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} transition-colors duration-300`}>
              I'm a passionate full stack developer with experience in building web applications
              using modern technologies. I love solving complex problems and creating intuitive
              user experiences.
            </p>
          </section>

          {/* Skills */}
          <section id="skills" className="mb-12">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4 transition-colors duration-300`}>Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <div key={skill} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-105`}>
                  {skill}
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section id="projects" className="mb-12">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4 transition-colors duration-300`}>Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <div key={index} className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105`}>
                  <div className="p-6">
                    <h3 className={`font-bold text-xl mb-2 ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>{project.title}</h3>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4 transition-colors duration-300`}>{project.description}</p>
                    <div className="mb-4">
                      <h4 className={`font-semibold text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2 transition-colors duration-300`}>Technologies used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className={`${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} px-2 py-1 rounded text-sm transition-colors duration-300`}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button 
                        onClick={() => openProjectModal(project)}
                        className={`w-full sm:w-auto ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white font-bold py-2 px-4 rounded transition-all duration-300 hover:shadow-lg`}
                      >
                        Read More
                      </button>
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full sm:w-auto ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} text-center font-bold py-2 px-4 rounded transition-all duration-300 hover:shadow-lg flex items-center justify-center`}
                      >
                        <FaGithub className="mr-2" />
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>  
          </section>

          {/* Resume */}
          <section id="resume" className="mb-12">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4 transition-colors duration-300`}>Resume</h2>
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6 transition-all duration-300 hover:shadow-lg`}>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4 transition-colors duration-300`}>
                Download my resume to learn more about my work experience, education, and skills.
              </p>
              <a
                href="/path-to-your-resume.pdf"
                download
                className={`inline-flex items-center ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white font-bold py-2 px-4 rounded transition-all duration-300 hover:shadow-lg`}
              >
                <FaFileAlt className="mr-2" />
                Download Resume
              </a>
            </div>
          </section>

          {/* Contact */}
          <section id="contact">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4 transition-colors duration-300`}>Contact</h2>
            <div className="flex justify-center space-x-4">
              <a href="https://github.com" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'} transition-colors duration-300`}>
                <span className="sr-only">GitHub</span>
                <FaGithub className="h-6 w-6 transition-transform duration-300 hover:scale-110" />
              </a>
              <a href="https://linkedin.com" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'} transition-colors duration-300`}>
                <span className="sr-only">LinkedIn</span>
                <FaLinkedin className="h-6 w-6 transition-transform duration-300 hover:scale-110" />
              </a>
              <a href="mailto:johndoe@example.com" className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'} transition-colors duration-300`}>
                <span className="sr-only">Email</span>
                <FaEnvelope className="h-6 w-6 transition-transform duration-300 hover:scale-110" />
              </a>
            </div>
          </section>
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeProjectModal} darkMode={darkMode} />
      )}
    </div>
  )
}

export default Portfolio