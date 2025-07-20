import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import GmailPage from '../pages/GmailPage';
import ProfilePage from '../pages/ProfilePage';

import LoginPage from '../features/auth/LoginPage';
import Logout from '../features/auth/Logout';
import NotFoundPage from '../pages/NotFoundPage';
import TaskschedulerPage from '../pages/TaskschedulerPage'
import TaskPage from '../pages/TaskPage'
import Youtube_channel_page from '../pages/Youtube_channel_page'
import Youtube_keyword_page from '../pages/youtube_keyword_page';
import Youtube_video_page from '../pages/Youtube_video_page';

export default function AppRoutes() {
  return (
	<Routes>
	  	<Route path="/" element={<HomePage />} />
		<Route path="/gmail" element={<GmailPage />} />
		<Route path="/profile" element={<ProfilePage />} />
		<Route path="/youtube" element={<Youtube_channel_page />} />
		<Route path="/youtube/keywords" element={<Youtube_keyword_page />} />
		<Route path="/youtube/video" element={<Youtube_video_page />} />

		<Route path="/scheduler" element={<TaskschedulerPage />} />
		<Route path="/tasks" element={<TaskPage />} />


		<Route path="/login" element={<LoginPage />} />
		<Route path="/logout" element={<Logout />} />
		<Route path="*" element={<NotFoundPage />} />
	</Routes>
  );
}