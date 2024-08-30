import React, { useState } from 'react'
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes, FaFileAlt, FaTimes as FaClose } from 'react-icons/fa'
import Button from '../components/Button';
// import img from 'next/img'

type Project = {
  title: string;
  description: string;
  technologies: string[];
  detailedDescription: string;
  imgs: string[];
}

const projects: Project[] = [
  {
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce solution with user authentication, product management, and payment integration.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
    detailedDescription: 'This e-commerce platform provides a comprehensive solution for online businesses. It features user authentication, product catalog management, shopping cart functionality, and secure payment processing using Stripe. The frontend is built with React for a responsive and interactive user interface, while the backend uses Node.js and Express to handle API requests and business logic. MongoDB is used as the database to store product information, user data, and order details.',
    imgs: ['/placeholder.svg?height=300&width=400', '/placeholder.svg?height=300&width=400']
  },
  {
    title: 'Task Manager',
    description: 'A React-based task management app with drag-and-drop functionality and real-time updates.',
    technologies: ['React', 'Redux', 'Firebase', 'Material-UI'],
    detailedDescription: 'This task management application allows users to create, organize, and track their tasks efficiently. It features a drag-and-drop interface for easy task prioritization and status updates. The app uses React for the frontend, with Redux for state management. Firebase is integrated for real-time data synchronization and user authentication. Material-UI is used for a clean and modern user interface design.',
    imgs: ['/placeholder.svg?height=300&width=400', '/placeholder.svg?height=300&width=400']
  },
  {
    title: 'Weather App',
    description: 'Real-time weather forecasting application with location-based services and interactive maps.',
    technologies: ['Vue.js', 'OpenWeatherMap API', 'Mapbox', 'Axios'],
    detailedDescription: "This weather application provides users with real-time weather information and forecasts. It uses the OpenWeatherMap API to fetch accurate weather data based on the user's location or a searched city. The app features an interactive map powered by Mapbox, allowing users to visually explore weather patterns. Built with Vue.js, the app offers a responsive and intuitive user interface. Axios is used for making API requests to fetch weather data efficiently.'",
    imgs: ['/placeholder.svg?height=300&width=400', '/placeholder.svg?height=300&width=400']
  },
  {
    title: 'Portfolio Website',
    description: 'This responsive portfolio site showcasing my projects and skills.',
    technologies: ['React', 'Tailwind CSS', 'Next.js'],
    detailedDescription: 'This portfolio website serves as a showcase of my skills, projects, and professional experience. Built with React and Next.js, it offers fast loading times and optimal performance. The site features a responsive design implemented with Tailwind CSS, ensuring a great user experience across all devices. It includes sections for an about me, skills, project showcase, and contact information.',
    imgs: ['/placeholder.svg?height=300&width=400', '/placeholder.svg?height=300&width=400']
  },
]

const skills: string[] = ['TypeScript', 'React', 'Node.js', 'Python', 'SQL', 'Git']

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaClose className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <p className="text-gray-700 mb-4">{project.detailedDescription}</p>
          <div className="mb-4">
            <h4 className="font-semibold text-lg text-gray-800 mb-2">Technologies used:</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">
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
                className="rounded-lg"
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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <img
                src="./1.svg?height=40&width=40"
                alt="John Doe"
                width={40}
                height={40}
                className="rounded-full mr-2"
              />
              <span className="text-xl font-bold text-gray-800">John Doe</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {['About', 'Skills', 'Projects', 'Resume', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
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
                className="text-gray-600 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
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
              src="/placeholder.svg?height=150&width=150"
              alt="John Doe"
              width={150}
              height={150}
              className="rounded-full mx-auto mb-4"
            />
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              John Doe
            </h1>
            <p className="mt-3 text-xl text-gray-500 sm:mt-5 sm:text-2xl">
              Full Stack Developer
            </p>
          </header>

          {/* About Me */}
          <section id="about" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About Me</h2>
            <p className="text-gray-700">
              I'm a passionate full stack developer with experience in building web applications
              using modern technologies. I love solving complex problems and creating intuitive
              user experiences.
            </p>
          </section>

          {/* Skills */}
          <section id="skills" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <div key={skill} className="bg-white rounded-lg shadow p-4 text-center">
                  {skill}
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section id="projects" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                    <p className="text-gray-700 mb-4">{project.description}</p>
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm text-gray-600 mb-2">Technologies used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className='  md:grid-cols-1  sm:grid-cols-1 sm : col-span-1 '>
                    <Button 
                      onClickHandler={() => openProjectModal(project)}
                    >
                      Read More
                    </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>  
          </section>

          {/* Resume */}
          <section id="resume" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Resume</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-700 mb-4">
                Download my resume to learn more about my work experience, education, and skills.
              </p>
              <a
                href="/path-to-your-resume.pdf"
                download
                className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                <FaFileAlt className="mr-2" />
                Download Resume
              </a>
            </div>
          </section>

          {/* Contact */}
          <section id="contact">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
            <div className="flex justify-center space-x-4">
              <a href="https://github.com" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <FaGithub className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">LinkedIn</span>
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a href="mailto:johndoe@example.com" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Email</span>
                <FaEnvelope className="h-6 w-6" />
              </a>
            </div>
          </section>
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeProjectModal} />
      )}
    </div>
  )
}

export default Portfolio