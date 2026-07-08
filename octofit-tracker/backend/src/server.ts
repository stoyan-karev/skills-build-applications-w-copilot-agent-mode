import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import './config/database';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import teamsRouter from './routes/teams';
import usersRouter from './routes/users';
import workoutsRouter from './routes/workouts';

const defaultPort = '8000';
const port = process.env.PORT || defaultPort;
const codespaceName = process.env.CODESPACE_NAME;
const defaultCodespaceBaseUrl = `https://${codespaceName}-8000.app.github.dev`;

export const apiPort = port;

export const apiBaseUrl = codespaceName
  ? port === defaultPort
    ? defaultCodespaceBaseUrl
    : `https://${codespaceName}-${port}.app.github.dev`
  : `http://localhost:${port}`;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    name: 'OctoFit Tracker API',
    baseUrl: apiBaseUrl,
    routes: [
      '/api/users/',
      '/api/teams/',
      '/api/activities/',
      '/api/leaderboard/',
      '/api/workouts/',
    ],
  });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.listen(apiPort, () => {
  console.log(`OctoFit Tracker API listening at ${apiBaseUrl}`);
});