import { type RouteConfig, route } from '@react-router/dev/routes';

export default [
  route('/', './routes/home.tsx'),
  route('resources', './routes/resources.tsx'),
] satisfies RouteConfig;
