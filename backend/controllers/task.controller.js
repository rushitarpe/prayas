import Task from '../models/task.model.js';
import { errorHandler } from '../utils/error.js';

export const getTasks = async (req, res, next) => {
  try {
    let userId = req.user.id;
    if (req.user.isAdmin && req.query.userId) {
      userId = req.query.userId;
    }
    
    // Auto-resync: If taskCount is less than 45 or they have the old seeded Daily/Weekly locks (missing activeSubDay), trigger clean re-seed
    let taskCount = await Task.countDocuments({ userId });
    const hasOldTasks = await Task.findOne({ userId, activeSubDay: { $exists: false } });

    if (taskCount < 45 || hasOldTasks) {
      await Task.deleteMany({ userId });
      taskCount = 0;
    }
    
    if (taskCount === 0) {
      const defaultTasks = [
        // === DAILY (EASY) TASKS - 15 (Fully Unlocked, dayNumber: null) ===
        {
          userId,
          title: 'Gratitude Journaling',
          description: 'Write down 3 things you are grateful for today.',
          status: 'todo',
          priority: 'medium',
          frequency: 'daily',
          difficulty: 'easy',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/723072/pexels-photo-723072.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: 'Mindful Breathing',
          description: 'Take 5 minutes to focus on your breathing using the 4-4-4 technique.',
          status: 'todo',
          priority: 'high',
          frequency: 'daily',
          difficulty: 'easy',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: 'Positive Affirmations',
          description: 'Say 3 positive affirmations in front of a mirror to boost confidence.',
          status: 'todo',
          priority: 'low',
          frequency: 'daily',
          difficulty: 'easy',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/2682452/pexels-photo-2682452.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: 'Random Act of Kindness',
          description: 'Do something kind for someone today, no matter how small.',
          status: 'todo',
          priority: 'medium',
          frequency: 'daily',
          difficulty: 'easy',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: 'Hydration Check',
          description: 'Drink 8 glasses of water today to keep your body and mind energized.',
          status: 'todo',
          priority: 'low',
          frequency: 'daily',
          difficulty: 'easy',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/1458687/pexels-photo-1458687.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: 'Gentle Stretching',
          description: 'Spend 5 minutes doing light body stretches to release muscle tension.',
          status: 'todo',
          priority: 'medium',
          frequency: 'daily',
          difficulty: 'easy',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: 'De-clutter Workspace',
          description: 'Spend 5 minutes cleaning and organizing your desk or immediate room.',
          status: 'todo',
          priority: 'medium',
          frequency: 'daily',
          difficulty: 'easy',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/3747505/pexels-photo-3747505.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: 'Soothing Music Break',
          description: 'Close your eyes and listen to 3 relaxing songs without any distractions.',
          status: 'todo',
          priority: 'low',
          frequency: 'daily',
          difficulty: 'easy',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: 'Digital Screen Detox',
          description: 'Turn off all screens for 1 hour before going to bed to reset your mind.',
          status: 'todo',
          priority: 'high',
          frequency: 'daily',
          difficulty: 'easy',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/1251860/pexels-photo-1251860.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: 'Nourishing Meal',
          description: 'Enjoy a healthy, fresh snack or a well-balanced meal today.',
          status: 'todo',
          priority: 'low',
          frequency: 'daily',
          difficulty: 'easy',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: 'Posture Check',
          description: 'Sit straight, roll your shoulders back, and take a long breath.',
          status: 'todo',
          priority: 'low',
          frequency: 'daily',
          difficulty: 'easy',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/3758110/pexels-photo-3758110.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: 'Nature Sight',
          description: 'Look out the window or step outside for 2 minutes to look at trees or sky.',
          status: 'todo',
          priority: 'low',
          frequency: 'daily',
          difficulty: 'easy',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/518485/pexels-photo-518485.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: 'Send Appreciation',
          description: 'Send a quick text expressing gratitude to a friend who helped you recently.',
          status: 'todo',
          priority: 'medium',
          frequency: 'daily',
          difficulty: 'easy',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: 'Deep Belly Sighs',
          description: 'Take 3 slow, deep abdominal breaths to instantly calm your nerves.',
          status: 'todo',
          priority: 'low',
          frequency: 'daily',
          difficulty: 'easy',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/3759664/pexels-photo-3759664.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: 'Herbal Tea Time',
          description: 'Prepare and sip a warm cup of chamomile or green tea slowly.',
          status: 'todo',
          priority: 'low',
          frequency: 'daily',
          difficulty: 'easy',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/228967/pexels-photo-228967.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },

        // === WEEKLY (INTERMEDIATE) TASKS - 15 (Initially unlocked, dayNumber: null) ===
        {
          userId,
          title: '💫 Write a positive affirmation for yourself',
          description: 'Create 3 affirmations and repeat them daily for the week. (Why Easy+: Requires vulnerability and self-compassion)',
          status: 'todo',
          priority: 'low',
          frequency: 'weekly',
          difficulty: 'easy+',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/2682452/pexels-photo-2682452.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: '🥤 Try a new healthy snack or drink',
          description: 'Experiment with something new that\'s good for you. (Why Easy+: Requires trying something outside comfort zone)',
          status: 'todo',
          priority: 'low',
          frequency: 'weekly',
          difficulty: 'easy+',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/228967/pexels-photo-228967.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: '🚶 Go for a walk without your phone',
          description: 'Leave phone at home, focus on surroundings. (Why Easy+: Requires mindfulness and disconnection)',
          status: 'todo',
          priority: 'low',
          frequency: 'weekly',
          difficulty: 'easy+',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/518485/pexels-photo-518485.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: '✨ Write down your top 5 values in life',
          description: 'Identify what matters most to you. (Why Easy+: Requires introspection and honesty)',
          status: 'todo',
          priority: 'low',
          frequency: 'weekly',
          difficulty: 'easy+',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/723072/pexels-photo-723072.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: '🎁 Do something kind for yourself (not just basic)',
          description: 'Get a massage, facial, buy something special, or treat yourself. (Why Easy+: Requires self-investment and spending)',
          status: 'todo',
          priority: 'low',
          frequency: 'weekly',
          difficulty: 'easy+',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/228967/pexels-photo-228967.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: '🍷 Plan and host a small gathering with friends',
          description: 'Invite friends over, cook/prepare, spend quality time. (Why Medium+: Requires planning, hosting skills, and social energy)',
          status: 'todo',
          priority: 'medium',
          frequency: 'weekly',
          difficulty: 'medium+',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: '🏡 Complete a home improvement or decoration project',
          description: 'Rearrange furniture, paint a wall, organize a closet. (Why Medium+: Requires effort and vision)',
          status: 'todo',
          priority: 'medium',
          frequency: 'weekly',
          difficulty: 'medium+',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/3747505/pexels-photo-3747505.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: '💌 Write a detailed letter to someone you appreciate',
          description: 'Express gratitude and specific reasons why they matter. (Why Medium+: Requires emotional expression and time)',
          status: 'todo',
          priority: 'medium',
          frequency: 'weekly',
          difficulty: 'medium+',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/723072/pexels-photo-723072.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: '🎓 Take a short online class (30-60 mins)',
          description: 'TED Talk, workshop, or skill-building class. (Why Medium+: Requires active learning, not passive watching)',
          status: 'todo',
          priority: 'medium',
          frequency: 'weekly',
          difficulty: 'medium+',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: '🗺️ Plan a small adventure or outing',
          description: 'Research location, plan route, actually go. (Why Medium+: Requires planning and execution)',
          status: 'todo',
          priority: 'medium',
          frequency: 'weekly',
          difficulty: 'medium+',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/518485/pexels-photo-518485.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: '📖 Share your story/experience with someone (20+ mins)',
          description: 'Tell someone about your journey or a significant experience. (Why Hard-: Requires vulnerability and active sharing)',
          status: 'todo',
          priority: 'high',
          frequency: 'weekly',
          difficulty: 'hard-',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: '🎯 Set a specific goal and create an action plan',
          description: 'Define goal, identify steps, commit to timeline. (Why Hard-: Requires clarity and commitment)',
          status: 'todo',
          priority: 'high',
          frequency: 'weekly',
          difficulty: 'hard-',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/723072/pexels-photo-723072.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: '💪 Practice assertiveness - say "no" to something',
          description: 'Decline a request/invitation respectfully. (Why Hard-: Emotionally challenging, builds confidence)',
          status: 'todo',
          priority: 'high',
          frequency: 'weekly',
          difficulty: 'hard-',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/3768140/pexels-photo-3768140.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: '👥 Attend a social event or join a group activity',
          description: 'Class, meetup, event, or community gathering. (Why Hard-: Requires overcoming social anxiety)',
          status: 'todo',
          priority: 'high',
          frequency: 'weekly',
          difficulty: 'hard-',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: '🕊️ Explore one past trauma or difficult memory mindfully',
          description: 'Journal or meditate about something challenging. (Why Hard-: Emotionally demanding, requires courage)',
          status: 'todo',
          priority: 'high',
          frequency: 'weekly',
          difficulty: 'hard-',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },

        // === MONTHLY (INTERMEDIATE) TASKS - 15 (Initially unlocked, dayNumber: null) ===
        {
          userId,
          title: '✍️ Write down 3 things you accomplished this week',
          description: 'Reflect on your achievements, no matter how small. (Why Easy+: Requires self-reflection)',
          status: 'todo',
          priority: 'low',
          frequency: 'monthly',
          difficulty: 'easy+',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/723072/pexels-photo-723072.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: '📸 Take a photo of something beautiful and share it',
          description: 'Find beauty around you and share it with someone. (Why Easy+: Requires leaving home and social interaction)',
          status: 'todo',
          priority: 'low',
          frequency: 'monthly',
          difficulty: 'easy+',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/518485/pexels-photo-518485.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: '🤸 Do a 10-minute stretching routine',
          description: 'Follow a YouTube stretching video. (Why Easy+: Light exercise (slightly more effort than watching something))',
          status: 'todo',
          priority: 'low',
          frequency: 'monthly',
          difficulty: 'easy+',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: '🎵 Create a playlist of 10 songs that make you happy',
          description: 'Curate your own feel-good music collection. (Why Easy+: Requires decision-making and creativity)',
          status: 'todo',
          priority: 'low',
          frequency: 'monthly',
          difficulty: 'easy+',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: '👕 Wear something that makes you feel confident',
          description: 'Pick an outfit that boosts your mood. (Why Easy+: Requires intention and self-awareness)',
          status: 'todo',
          priority: 'low',
          frequency: 'monthly',
          difficulty: 'easy+',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/2682452/pexels-photo-2682452.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: '🥗 Plan a healthy meal for the entire week',
          description: 'Meal plan for 7 days, buy groceries, prep some meals. (Why Medium+: More complex than cooking one meal)',
          status: 'todo',
          priority: 'medium',
          frequency: 'monthly',
          difficulty: 'medium+',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/349610/pexels-photo-349610.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: '🏋️ Start an exercise routine (3 days, 20 mins each)',
          description: 'Commit to a consistent workout schedule. (Why Medium+: Requires consistency and scheduling)',
          status: 'todo',
          priority: 'medium',
          frequency: 'monthly',
          difficulty: 'medium+',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/3758105/pexels-photo-3758105.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: '🧠 Learn a new skill online (complete 2-3 lessons)',
          description: 'Duolingo, Codecademy, or any learning platform. (Why Medium+: Requires focus and multiple sessions)',
          status: 'todo',
          priority: 'medium',
          frequency: 'monthly',
          difficulty: 'medium+',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: '📞 Reach out to 5 people from your past',
          description: 'Text/call/email people you haven\'t spoken to in a while. (Why Medium+: More social effort than contacting 3 people)',
          status: 'todo',
          priority: 'medium',
          frequency: 'monthly',
          difficulty: 'medium+',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: '🌅 Create a personal wellness routine (morning/evening)',
          description: 'Design a 15-20 minute self-care ritual. (Why Medium+: Requires planning and daily commitment)',
          status: 'todo',
          priority: 'medium',
          frequency: 'monthly',
          difficulty: 'medium+',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/3759664/pexels-photo-3759664.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: '📝 Start a gratitude practice (daily for 2 weeks)',
          description: 'Write 3 things daily that you\'re grateful for. (Why Hard-: Requires discipline and daily habit building)',
          status: 'todo',
          priority: 'high',
          frequency: 'monthly',
          difficulty: 'hard-',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/723072/pexels-photo-723072.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: '💭 Have honest conversations with 2 people about feelings',
          description: 'Open up to friends/family about how you\'ve been feeling. (Why Hard-: Emotionally vulnerable, requires courage)',
          status: 'todo',
          priority: 'high',
          frequency: 'monthly',
          difficulty: 'hard-',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: '📅 Research and schedule a mental health appointment',
          description: 'Find a therapist/counselor and book a session. (Why Hard-: Requires initiative and vulnerability)',
          status: 'todo',
          priority: 'high',
          frequency: 'monthly',
          difficulty: 'hard-',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/3759657/pexels-photo-3759657.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: '🔍 Complete a personality or mental health assessment',
          description: 'Take a Myers-Briggs, StrengthsFinder, or mental health quiz. (Why Hard-: Requires deep self-reflection)',
          status: 'todo',
          priority: 'high',
          frequency: 'monthly',
          difficulty: 'hard-',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        },
        {
          userId,
          title: '📊 Create a 30-day personal improvement plan',
          description: 'Set goals, identify obstacles, plan actions. (Why Hard-: Requires planning and commitment)',
          status: 'todo',
          priority: 'high',
          frequency: 'monthly',
          difficulty: 'hard-',
          dayNumber: null,
          imageUrl: 'https://images.pexels.com/photos/723072/pexels-photo-723072.jpeg?auto=compress&cs=tinysrgb&w=600',
          dueDate: null,
          activeSubDay: 0,
          subDayLastCompletedAt: null
        }
      ];
      await Task.insertMany(defaultTasks);
    }

    // Daily active timing reset streak checks (36 hours)
    const activeWeekly = await Task.findOne({ userId, frequency: 'weekly', status: 'in-progress' });
    if (activeWeekly && activeWeekly.activeSubDay > 0 && activeWeekly.subDayLastCompletedAt) {
      const hoursElapsed = (new Date() - new Date(activeWeekly.subDayLastCompletedAt)) / (1000 * 60 * 60);
      if (hoursElapsed > 36) {
        activeWeekly.activeSubDay = 0;
        activeWeekly.subDayLastCompletedAt = null;
        await activeWeekly.save();
      }
    }

    const activeMonthly = await Task.findOne({ userId, frequency: 'monthly', status: 'in-progress' });
    if (activeMonthly && activeMonthly.activeSubDay > 0 && activeMonthly.subDayLastCompletedAt) {
      const hoursElapsed = (new Date() - new Date(activeMonthly.subDayLastCompletedAt)) / (1000 * 60 * 60);
      if (hoursElapsed > 36) {
        activeMonthly.activeSubDay = 0;
        activeMonthly.subDayLastCompletedAt = null;
        await activeMonthly.save();
      }
    }

    // Run the normal query with sorting/filtering
    const filter = { userId };
    
    if (req.query.status && req.query.status !== 'all') {
      filter.status = req.query.status;
    }
    if (req.query.priority && req.query.priority !== 'all') {
      filter.priority = req.query.priority;
    }
    if (req.query.frequency && req.query.frequency !== 'all') {
      filter.frequency = req.query.frequency;
    }
    if (req.query.difficulty && req.query.difficulty !== 'all') {
      filter.difficulty = req.query.difficulty;
    }

    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    const tasks = await Task.find(filter).sort({ [sortBy]: sortOrder });

    // Lock calculations: If a weekly or monthly task is 'in-progress', lock all OTHER tasks of that frequency.
    const activeWeeklyObj = await Task.findOne({ userId, frequency: 'weekly', status: 'in-progress' });
    const activeWeeklyId = activeWeeklyObj ? activeWeeklyObj._id.toString() : null;

    const activeMonthlyObj = await Task.findOne({ userId, frequency: 'monthly', status: 'in-progress' });
    const activeMonthlyId = activeMonthlyObj ? activeMonthlyObj._id.toString() : null;

    const tasksWithLock = tasks.map(task => {
      const taskObj = task.toObject();
      if (taskObj.frequency === 'weekly') {
        if (activeWeeklyId) {
          taskObj.isLocked = taskObj._id.toString() !== activeWeeklyId;
        } else {
          taskObj.isLocked = false;
        }
      } else if (taskObj.frequency === 'monthly') {
        if (activeMonthlyId) {
          taskObj.isLocked = taskObj._id.toString() !== activeMonthlyId;
        } else {
          taskObj.isLocked = false;
        }
      } else {
        taskObj.isLocked = false;
      }
      return taskObj;
    });

    res.status(200).json(tasksWithLock);
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'Only administrators can create new tasks'));
    }

    const { title, description, status, priority, frequency, difficulty, dayNumber, imageUrl, dueDate } = req.body;

    if (!title || title === '') {
      return next(errorHandler(400, 'Title is required'));
    }

    const newTask = new Task({
      userId: req.user.id,
      title,
      description,
      status,
      priority,
      frequency,
      difficulty,
      dayNumber,
      imageUrl,
      dueDate,
      activeSubDay: 0,
      subDayLastCompletedAt: null
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return next(errorHandler(404, 'Task not found'));
    }

    if (task.userId !== req.user.id && !req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to update this task'));
    }

    // Role restrictions: standard users can only modify status or activeSubDay progress
    if (!req.user.isAdmin) {
      const requestedUpdates = Object.keys(req.body);
      const allowedKeys = ['status', 'activeSubDay'];
      const hasDisallowedKeys = requestedUpdates.some(key => !allowedKeys.includes(key));
      if (hasDisallowedKeys) {
        return next(errorHandler(403, 'Only administrators can edit task details (title, description, priority, etc.)'));
      }
    }

    const updates = { ...req.body };

    // 1. Guard against starting multiple active tasks of the same scope
    if (updates.status === 'in-progress') {
      if (task.frequency === 'weekly' || task.frequency === 'monthly') {
        const existingActive = await Task.findOne({
          userId: task.userId,
          frequency: task.frequency,
          status: 'in-progress',
          _id: { $ne: task._id }
        });
        if (existingActive) {
          return next(errorHandler(400, `You already have an active ${task.frequency} task: "${existingActive.title}". Complete it first!`));
        }
        
        // Reset subday fields on start
        updates.activeSubDay = 0;
        updates.subDayLastCompletedAt = null;
      }
    }

    // 2. Toggles when completing or reverting
    if (updates.status === 'completed') {
      if (task.frequency === 'weekly' || task.frequency === 'monthly') {
        updates.activeSubDay = task.frequency === 'weekly' ? 7 : 30;
        updates.lastCompletedAt = new Date();
        updates.subDayLastCompletedAt = new Date();
      } else {
        updates.lastCompletedAt = new Date();
      }
    } else if (updates.status === 'todo') {
      updates.lastCompletedAt = null;
      updates.activeSubDay = 0;
      updates.subDayLastCompletedAt = null;
    }

    // 3. Sub-day sequential progression advance checks
    if (updates.activeSubDay !== undefined && updates.activeSubDay !== task.activeSubDay) {
      if (task.status !== 'in-progress' && updates.status !== 'in-progress') {
        return next(errorHandler(400, 'You must start this task ("I am currently doing this task") before you can check off daily sub-day progress.'));
      }
      
      // Allow progression strictly incrementing by 1 or resetting to 0
      if (updates.activeSubDay !== 0 && updates.activeSubDay !== task.activeSubDay + 1) {
        return next(errorHandler(400, 'You can only check off progression sub-days sequentially.'));
      }

      updates.subDayLastCompletedAt = new Date();

      // Check if task has reached completion threshold
      const targetDays = task.frequency === 'weekly' ? 7 : 30;
      if (updates.activeSubDay === targetDays) {
        updates.status = 'completed';
        updates.lastCompletedAt = new Date();
      }
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'Only administrators can delete tasks'));
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return next(errorHandler(404, 'Task not found'));
    }

    if (task.userId !== req.user.id && !req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to delete this task'));
    }

    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task has been deleted successfully' });
  } catch (error) {
    next(error);
  }
};
