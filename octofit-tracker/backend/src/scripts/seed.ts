import 'dotenv/config';
import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await User.insertMany([
      {
        username: 'alex.chen',
        displayName: 'Alex Chen',
        email: 'alex.chen@example.com',
        profile: {
          fitnessLevel: 'advanced',
          weeklyGoalMinutes: 300,
          preferredActivities: ['cycling', 'strength training', 'rowing'],
        },
      },
      {
        username: 'maya.patel',
        displayName: 'Maya Patel',
        email: 'maya.patel@example.com',
        profile: {
          fitnessLevel: 'intermediate',
          weeklyGoalMinutes: 240,
          preferredActivities: ['running', 'yoga', 'hiking'],
        },
      },
      {
        username: 'jordan.rivera',
        displayName: 'Jordan Rivera',
        email: 'jordan.rivera@example.com',
        profile: {
          fitnessLevel: 'beginner',
          weeklyGoalMinutes: 180,
          preferredActivities: ['walking', 'bodyweight training', 'swimming'],
        },
      },
    ]);

    await Team.insertMany([
      {
        name: 'Trail Blazers',
        description: 'Outdoor cardio crew focused on weekly distance goals.',
        captain: 'maya.patel',
        members: ['maya.patel', 'jordan.rivera'],
        weeklyGoalPoints: 1200,
      },
      {
        name: 'Core Crushers',
        description: 'Strength and conditioning team with structured gym sessions.',
        captain: 'alex.chen',
        members: ['alex.chen'],
        weeklyGoalPoints: 1000,
      },
    ]);

    await Activity.insertMany([
      {
        username: 'alex.chen',
        type: 'cycling',
        durationMinutes: 75,
        distanceKm: 31.4,
        caloriesBurned: 780,
        points: 210,
        loggedAt: new Date('2026-07-05T14:30:00.000Z'),
      },
      {
        username: 'maya.patel',
        type: 'running',
        durationMinutes: 42,
        distanceKm: 7.2,
        caloriesBurned: 430,
        points: 165,
        loggedAt: new Date('2026-07-06T11:15:00.000Z'),
      },
      {
        username: 'jordan.rivera',
        type: 'swimming',
        durationMinutes: 35,
        distanceKm: 1.1,
        caloriesBurned: 310,
        points: 120,
        loggedAt: new Date('2026-07-07T18:45:00.000Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      {
        rank: 1,
        username: 'alex.chen',
        displayName: 'Alex Chen',
        team: 'Core Crushers',
        points: 210,
        trend: 'up',
      },
      {
        rank: 2,
        username: 'maya.patel',
        displayName: 'Maya Patel',
        team: 'Trail Blazers',
        points: 165,
        trend: 'steady',
      },
      {
        rank: 3,
        username: 'jordan.rivera',
        displayName: 'Jordan Rivera',
        team: 'Trail Blazers',
        points: 120,
        trend: 'up',
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Endurance Ride Builder',
        activityType: 'cycling',
        difficulty: 'advanced',
        durationMinutes: 60,
        targetUsers: ['alex.chen'],
        exercises: ['10 minute warmup', '4 x 8 minute tempo intervals', 'cooldown spin'],
      },
      {
        title: 'Balanced Runner Reset',
        activityType: 'running',
        difficulty: 'intermediate',
        durationMinutes: 45,
        targetUsers: ['maya.patel'],
        exercises: ['easy 5K run', 'mobility circuit', 'guided cooldown stretch'],
      },
      {
        title: 'Foundations Swim Session',
        activityType: 'swimming',
        difficulty: 'beginner',
        durationMinutes: 30,
        targetUsers: ['jordan.rivera'],
        exercises: ['kickboard warmup', '6 x 50 meter freestyle', 'breathing drills'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
