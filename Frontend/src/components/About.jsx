import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function About() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      bio: "Passionate about making education accessible to everyone through technology. With over 10 years of experience in ed-tech, Sarah leads our mission to democratize learning.",
      expertise: ["Education Technology", "Strategic Planning", "Team Leadership"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "sarah@bookvault.com"
      }
    },
    {
      name: "Michael Chen",
      role: "Head of Technology",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "Leading our technical innovations to create the best learning experience. Michael brings 8 years of software engineering expertise to build scalable, user-friendly platforms.",
      expertise: ["Full-Stack Development", "AI/ML", "Cloud Architecture"],
      social: {
        linkedin: "#",
        github: "#",
        email: "michael@bookvault.com"
      }
    },
    {
      name: "Emily Rodriguez",
      role: "Content Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      bio: "Curating the finest collection of educational content for our users. Emily has a PhD in Education and 12 years of experience in curriculum development and content strategy.",
      expertise: ["Curriculum Design", "Content Strategy", "Educational Psychology"],
      social: {
        linkedin: "#",
        twitter: "#",
        email: "emily@bookvault.com"
      }
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Students" },
    { number: "1000+", label: "Books Available" },
    { number: "95%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support Available" }
  ];

  const values = [
    {
      icon: "🎯",
      title: "Accessibility",
      description: "Making quality education accessible to everyone, regardless of their background or location."
    },
    {
      icon: "💡",
      title: "Innovation",
      description: "Continuously innovating our platform to provide the best learning experience possible."
    },
    {
      icon: "🤝",
      title: "Community",
      description: "Building a supportive community of learners who help each other grow and succeed."
    },
    {
      icon: "🌟",
      title: "Excellence",
      description: "Maintaining the highest standards of quality in all our content and services."
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
        <Navbar />
        <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
          {/* Header Section */}
          <div className="mt-28 items-center justify-center text-center">
            <h1 className="text-2xl md:text-4xl font-bold">
              About <span className="text-pink-500">BookVault</span>
            </h1>
            <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're passionate about democratizing education and making quality learning resources 
              accessible to everyone. Our mission is to empower individuals through knowledge and 
              create a world where learning knows no boundaries.
            </p>
            <Link to="/">
              <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
                Back to Home
              </button>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-pink-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Our Story Section */}
          <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                BookVault was founded in 2020 with a simple yet powerful vision: to make quality education 
                accessible to everyone. What started as a small collection of free educational resources 
                has grown into a comprehensive platform serving thousands of learners worldwide.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We believe that education should be a right, not a privilege. That's why we offer a 
                vast collection of free books alongside premium content, ensuring that everyone has 
                access to the knowledge they need to succeed.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Today, we're proud to serve a diverse community of learners, from students and professionals 
                to lifelong learners and educators. Our platform continues to evolve, incorporating 
                the latest technology and educational best practices to provide an exceptional learning experience.
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
              <div className="text-center">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold mb-2">Growing Together</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Every day, we're inspired by the stories of our users who are transforming their lives 
                  through learning. Join us on this incredible journey of growth and discovery.
                </p>
              </div>
            </div>
          </div>

          {/* Our Values Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mt-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Our diverse team of experts is passionate about education and technology. 
                Together, we're building the future of accessible learning.
              </p>
            </div>
            
            {/* Updated Team Layout - 3 members in horizontal row */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center max-w-xs">
                  {/* Circular Image */}
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mx-auto border-4 border-pink-200 dark:border-pink-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                  </div>
                  
                  {/* Member Info */}
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-pink-500 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">{member.bio}</p>
                  
                  {/* Expertise Tags */}
                  <div className="mb-4">
                    <div className="flex flex-wrap justify-center gap-2">
                      {member.expertise.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex justify-center space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                        title="LinkedIn"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                        title="Twitter"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </a>
                    )}
                    {member.social.github && (
                      <a
                        href={member.social.github}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                        title="GitHub"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                    <a
                      href={`mailto:${member.social.email}`}
                      className="text-gray-400 hover:text-pink-500 transition-colors duration-200"
                      title="Email"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Team Stats */}
            <div className="mt-16 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">3</div>
                  <div className="text-gray-600 dark:text-gray-300">Core Team Members</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">30+</div>
                  <div className="text-gray-600 dark:text-gray-300">Years Combined Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">9+</div>
                  <div className="text-gray-600 dark:text-gray-300">Expertise Areas</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Vision Section */}
          <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-pink-50 dark:bg-pink-900/20 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-600 dark:text-gray-300">
                To democratize education by providing free and affordable access to quality learning 
                resources, empowering individuals to achieve their full potential regardless of their 
                background or circumstances.
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-600 dark:text-gray-300">
                To become the world's leading platform for accessible education, creating a future 
                where knowledge is freely available to everyone and learning opportunities are limitless.
              </p>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-pink-200 dark:bg-pink-800 h-full"></div>
              <div className="space-y-12">
                <div className="flex items-center">
                  <div className="w-1/2 pr-8 text-right">
                    <h3 className="text-xl font-semibold">2020</h3>
                    <p className="text-gray-600 dark:text-gray-300">BookVault was founded with a mission to democratize education</p>
                  </div>
                  <div className="w-4 h-4 bg-pink-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                  <div className="w-1/2 pl-8"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-1/2 pr-8"></div>
                  <div className="w-4 h-4 bg-pink-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                  <div className="w-1/2 pl-8">
                    <h3 className="text-xl font-semibold">2021</h3>
                    <p className="text-gray-600 dark:text-gray-300">Reached 10,000 users and launched premium content</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-1/2 pr-8 text-right">
                    <h3 className="text-xl font-semibold">2022</h3>
                    <p className="text-gray-600 dark:text-gray-300">Expanded to 25,000 users and introduced mobile app</p>
                  </div>
                  <div className="w-4 h-4 bg-pink-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                  <div className="w-1/2 pl-8"></div>
                </div>
                <div className="flex items-center">
                  <div className="w-1/2 pr-8"></div>
                  <div className="w-4 h-4 bg-pink-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                  <div className="w-1/2 pl-8">
                    <h3 className="text-xl font-semibold">2023</h3>
                    <p className="text-gray-600 dark:text-gray-300">Achieved 50,000+ users and launched community features</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-20 text-center bg-gradient-to-r from-pink-500 to-purple-600 text-white p-12 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Ready to start your learning journey? Explore our vast collection of books and courses today.
            </p>
            <div className="space-x-4">
              <Link to="/course">
                <button className="bg-white text-pink-600 px-6 py-3 rounded-md hover:bg-gray-100 transition-colors duration-300">
                  Browse Courses
                </button>
              </Link>
              <Link to="/contact">
                <button className="border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-pink-600 transition-colors duration-300">
                  Get in Touch
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
