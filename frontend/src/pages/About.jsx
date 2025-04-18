import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen font-sans text-white bg-[#0f172a]">
      {/* Hero Section */}
      <div className="text-center py-16 px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-4">About PRAYAS</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Creating positive change through small, meaningful actions
        </p>
      </div>

      {/* Mission and Approach */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10 items-start">
        {/* Our Mission */}
        <div>
          <h2 className="text-3xl font-bold text-indigo-800 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-300 mb-4">
            PRAYAS was born from a simple yet powerful insight: small positive actions can create
            meaningful change in our mental well-being over time.
          </p>
          <p className="text-lg text-gray-300 mb-6">
            In a world where mental health challenges affect millions, PRAYAS offers a path toward
            well-being through simple, daily practices.
          </p>
          <div className="rounded-xl p-6 border-4 border-indigo-500 shadow-glow">
            <h3 className="text-xl font-bold text-indigo-700 mb-4">The Impact:</h3>
            <div className="grid grid-cols-2 gap-4 text-center text-black">
              <div>
                <p className="text-3xl font-bold text-indigo-600">700,000+</p>
                <p className="text-sm">People die due to suicide every year according to WHO</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-indigo-600">15+</p>
                <p className="text-sm">Carefully designed activities to improve mental well-being</p>
              </div>
              <div className="col-span-2">
                <p className="text-3xl font-bold text-indigo-600">4</p>
                <p className="text-sm">Key focus areas: Gratitude, Mindfulness, Self-care, and Connection</p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Approach */}
        <div>
          <h2 className="text-3xl font-bold text-indigo-800 mb-4">Our Approach</h2>
          <p className="text-lg text-gray-300 mb-4">
            In today's fast-paced and stressful world, depression and mental health struggles are
            increasingly prevalent.
          </p>
          <p className="text-lg text-gray-300 mb-8">
            Our platform provides an interactive and supportive environment where users can gradually
            build positive habits, feel a sense of accomplishment, and track their progress.
          </p>
          <h3 className="text-2xl font-bold text-indigo-700 mb-4">Featured Activities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Gratitude Journaling",
                desc: "Write down three things you're grateful for today.",
              },
              {
                title: "Mindful Breathing",
                desc: "Take 5 minutes to focus on your breathing using the 4-4-4 technique.",
              },
              {
                title: "Positive Affirmation",
                desc: "Say positive affirmations in front of a mirror.",
              },
              {
                title: "Acts of Kindness",
                desc: "Do something kind for someone today, no matter how small.",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="p-5 rounded-xl shadow-lg border-l-4 border-indigo-500 text-black hover:shadow-glow transition-all duration-300"
              >
                <h4 className="text-lg font-semibold text-indigo-700 mb-1">{activity.title}</h4>
                <p className="text-sm">{activity.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Meet the Team Section */}
      <div className="py-16 text-black">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-indigo-800 mb-2">The Team Behind PRAYAS</h2>
          <p className="mb-10">
            Meet the dedicated team creating positive change through technology
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Rushikesh Tarpe',
                role: 'Full Stack Developer',
                img: '/images/rushikesh.jpg',
              },
              {
                name: 'Harshal Chaudhari',
                role: 'Frontend Developer',
                img: '/images/shreya.jpg',
              },
              {
                name: '......',
                role: 'Backend Specialist',
                img: '/images/aarav.jpg',
              },
            ].map((member, idx) => (
              <div key={idx} className="text-center">
                <div className="w-36 h-36 mx-auto rounded-full overflow-hidden border-4 border-indigo-100 shadow-md hover:shadow-glow">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="mt-4 font-bold text-lg">{member.name}</h4>
                <p className="text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center my-10">
        <Link
          to="/sign-up"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full text-lg font-medium shadow-md transition-colors"
        >
          START YOUR JOURNEY
        </Link>
      </div>
    </div>
  );
};

export default About;
