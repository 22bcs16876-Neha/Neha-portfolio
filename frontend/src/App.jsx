import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProfile } from './pages/admin/AdminProfile';
import { AdminProjects } from './pages/admin/AdminProjects';
import { AdminSkills } from './pages/admin/AdminSkills';
import { AdminExperience } from './pages/admin/AdminExperience';
import { AdminEducation } from './pages/admin/AdminEducation';
import { AdminCertifications } from './pages/admin/AdminCertifications';
import { AdminAchievements } from './pages/admin/AdminAchievements';
import { AdminCodingProfiles } from './pages/admin/AdminCodingProfiles';
import { AdminMessages } from './pages/admin/AdminMessages';
import { AdminSettings } from './pages/admin/AdminSettings';
import { ProtectedRoute } from './components/common/ProtectedRoute';

export const App = () => {
  return (
    <Routes>
      {/* Public Portfolio Route */}
      <Route path="/" element={<Home />} />

      {/* Admin Authentication - Redirect to popup modal on homepage */}
      <Route path="/admin/login" element={<Navigate to="/?admin_login=true" replace />} />

      {/* Protected Admin CMS Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/skills" element={<AdminSkills />} />
          <Route path="/admin/experience" element={<AdminExperience />} />
          <Route path="/admin/education" element={<AdminEducation />} />
          <Route path="/admin/certifications" element={<AdminCertifications />} />
          <Route path="/admin/achievements" element={<AdminAchievements />} />
          <Route path="/admin/coding-profiles" element={<AdminCodingProfiles />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>
      </Route>

      {/* Fallback to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
