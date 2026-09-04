import api from './api';

export const portfolioService = {
  getProfile: async () => {
    const res = await api.get('/profile');
    return res.data.data;
  },

  getSkills: async () => {
    const res = await api.get('/skills');
    return res.data.data;
  },

  getExperience: async () => {
    const res = await api.get('/experience');
    return res.data.data;
  },

  getProjects: async () => {
    const res = await api.get('/projects');
    return res.data.data;
  },

  getFeaturedProjects: async () => {
    const res = await api.get('/projects/featured');
    return res.data.data;
  },

  getProjectBySlug: async (slug) => {
    const res = await api.get(`/projects/${slug}`);
    return res.data.data;
  },

  getEducation: async () => {
    const res = await api.get('/education');
    return res.data.data;
  },

  getCertifications: async () => {
    const res = await api.get('/certifications');
    return res.data.data;
  },

  getAchievements: async () => {
    const res = await api.get('/achievements');
    return res.data.data;
  },

  getCodingProfiles: async () => {
    const res = await api.get('/coding-profiles');
    return res.data.data;
  },

  submitContact: async (data) => {
    const res = await api.post('/contact', data);
    return res.data;
  },
};
