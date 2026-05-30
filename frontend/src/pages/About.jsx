import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, ShieldCheck, Sparkles, Users } from 'lucide-react';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen font-sans text-white bg-[#030712] relative overflow-hidden pt-24 pb-16">
      {/* Premium Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Hero Section */}
        <div className="text-center py-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            {t('about.title')}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('about.subtitle')}
          </p>
        </div>

        {/* Mission and Approach */}
        <div className="grid md:grid-cols-2 gap-12 items-start my-16">
          {/* Our Mission */}
          <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800/80 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6 text-purple-400">
              <Heart className="w-8 h-8" />
              <h2 className="text-3xl font-extrabold text-white">{t('about.missionTitle')}</h2>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-4 text-base">
              {t('about.missionP1')}
            </p>
            <p className="text-gray-300 leading-relaxed mb-8 text-base">
              {t('about.missionP2')}
            </p>
            
            <div className="border-t border-gray-800/60 pt-6">
              <h3 className="text-lg font-bold text-gray-200 mb-4">{t('about.impactTitle')}</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-gray-950/40 border border-gray-800/50 p-4 rounded-2xl">
                  <span className="block text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">{t('about.impactStat1')}</span>
                  <span className="text-xs text-gray-400 mt-1 block">{t('about.impactStat1Desc')}</span>
                </div>
                <div className="bg-gray-950/40 border border-gray-800/50 p-4 rounded-2xl">
                  <span className="block text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{t('about.impactStat2')}</span>
                  <span className="text-xs text-gray-400 mt-1 block">{t('about.impactStat2Desc')}</span>
                </div>
              </div>
              <div className="mt-4 bg-gray-950/40 border border-gray-800/50 p-4 rounded-2xl text-center">
                <span className="block text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">{t('about.impactStat3')}</span>
                <span className="text-xs text-gray-400 mt-1 block">{t('about.impactStat3Desc')}</span>
              </div>
            </div>
          </div>

          {/* Our Approach */}
          <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-800/80 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6 text-blue-400">
              <Sparkles className="w-8 h-8" />
              <h2 className="text-3xl font-extrabold text-white">{t('about.approachTitle')}</h2>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-4 text-base">
              {t('about.approachP1')}
            </p>
            <p className="text-gray-300 leading-relaxed mb-8 text-base">
              {t('about.approachP2')}
            </p>

            <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-850 pb-2">{t('about.featuredActivities')}</h3>
            <ul className="space-y-4">
              {[
                { title: t('about.activity1Title'), desc: t('about.activity1Desc') },
                { title: t('about.activity2Title'), desc: t('about.activity2Desc') },
                { title: t('about.activity3Title'), desc: t('about.activity3Desc') },
                { title: t('about.activity4Title'), desc: t('about.activity4Desc') },
              ].map((activity, index) => (
                <li key={index} className="bg-gray-950/40 p-4 rounded-2xl border border-gray-800/50 flex items-start gap-4 hover:border-purple-900/40 transition-colors duration-300">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-purple-400 font-bold text-sm border border-purple-500/20">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-white mb-1">{activity.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{activity.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-gray-900/20 backdrop-blur-xl border border-gray-850/60 rounded-3xl p-8 md:p-12 shadow-xl my-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex justify-center mb-4 text-purple-400">
              <Users className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-3">{t('about.teamTitle')}</h2>
            <p className="text-base text-gray-400 leading-relaxed">
              {t('about.teamSubtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: t('about.member1Name'),
                role: t('about.member1Role'),
              },
              {
                name: t('about.member2Name'),
                role: t('about.member2Role'),
              },
              {
                name: t('about.member3Name'),
                role: t('about.member3Role'),
              },
            ].map((member, idx) => (
              <div key={idx} className="text-center group bg-gray-950/40 border border-gray-850/60 hover:border-purple-900/40 p-6 rounded-2xl transition-all duration-300">
                <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-gray-800 bg-gray-900 flex items-center justify-center text-3xl font-bold bg-gradient-to-tr from-blue-500/10 to-purple-600/10 text-cyan-400 group-hover:border-purple-600 transition-all duration-300">
                  {member.name.charAt(0)}
                </div>
                <h4 className="mt-4 font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">{member.name}</h4>
                <p className="text-sm text-gray-400 mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center my-12">
          <Link
            to="/sign-up"
            className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-purple-950/30 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            {t('about.startJourney')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
