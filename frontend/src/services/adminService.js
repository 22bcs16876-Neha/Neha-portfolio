import api from './api';

export const adminService = {
  login: async (credentials) => {
    const res = await api.post('/auth/login', credentials);
    return res.data.data;
  },

  sendOtp: async (target = '') => {
    const res = await api.post('/auth/otp/send', target ? { target } : {});
    return res.data.data;
  },

  verifyOtp: async (otp, email = '') => {
    const res = await api.post('/auth/otp/verify', { otp, email });
    return res.data.data;
  },

  changePassword: async (passwordData) => {
    const res = await api.post('/auth/change-password', passwordData);
    return res.data;
  },

  getAdminAccount: async () => {
    const res = await api.get('/admin/account');
    return res.data.data;
  },

  updateAdminEmail: async (email) => {
    const res = await api.put('/admin/account/email', { email });
    return res.data.data;
  },

  updateEmailJsConfig: async (config) => {
    const res = await api.put('/admin/account/emailjs', config);
    return res.data.data;
  },

  getDashboardStats: async () => {
    const res = await api.get('/admin/dashboard');
    return res.data.data;
  },

  // Profile Management
  updateProfile: async (data) => {
    const res = await api.put('/admin/profile', data);
    return res.data.data;
  },

  updateDefaultTheme: async (theme) => {
    const res = await api.put('/admin/profile/theme', { defaultTheme: theme });
    return res.data.data;
  },

  // Projects CRUD
  createProject: async (data) => {
    const res = await api.post('/admin/projects', data);
    return res.data.data;
  },
  updateProject: async (id, data) => {
    const res = await api.put(`/admin/projects/${id}`, data);
    return res.data.data;
  },
  deleteProject: async (id) => {
    const res = await api.delete(`/admin/projects/${id}`);
    return res.data;
  },

  // Skills CRUD
  createSkill: async (data) => {
    const res = await api.post('/admin/skills', data);
    return res.data.data;
  },
  updateSkill: async (id, data) => {
    const res = await api.put(`/admin/skills/${id}`, data);
    return res.data.data;
  },
  deleteSkill: async (id) => {
    const res = await api.delete(`/admin/skills/${id}`);
    return res.data;
  },

  // Experience CRUD
  createExperience: async (data) => {
    const res = await api.post('/admin/experience', data);
    return res.data.data;
  },
  updateExperience: async (id, data) => {
    const res = await api.put(`/admin/experience/${id}`, data);
    return res.data.data;
  },
  deleteExperience: async (id) => {
    const res = await api.delete(`/admin/experience/${id}`);
    return res.data;
  },

  // Education CRUD
  createEducation: async (data) => {
    const res = await api.post('/admin/education', data);
    return res.data.data;
  },
  updateEducation: async (id, data) => {
    const res = await api.put(`/admin/education/${id}`, data);
    return res.data.data;
  },
  deleteEducation: async (id) => {
    const res = await api.delete(`/admin/education/${id}`);
    return res.data;
  },

  // Certifications CRUD
  createCertification: async (data) => {
    const res = await api.post('/admin/certifications', data);
    return res.data.data;
  },
  updateCertification: async (id, data) => {
    const res = await api.put(`/admin/certifications/${id}`, data);
    return res.data.data;
  },
  deleteCertification: async (id) => {
    const res = await api.delete(`/admin/certifications/${id}`);
    return res.data;
  },

  // Achievements CRUD
  createAchievement: async (data) => {
    const res = await api.post('/admin/achievements', data);
    return res.data.data;
  },
  updateAchievement: async (id, data) => {
    const res = await api.put(`/admin/achievements/${id}`, data);
    return res.data.data;
  },
  deleteAchievement: async (id) => {
    const res = await api.delete(`/admin/achievements/${id}`);
    return res.data;
  },

  // Coding Profiles CRUD
  createCodingProfile: async (data) => {
    const res = await api.post('/admin/coding-profiles', data);
    return res.data.data;
  },
  updateCodingProfile: async (id, data) => {
    const res = await api.put(`/admin/coding-profiles/${id}`, data);
    return res.data.data;
  },
  deleteCodingProfile: async (id) => {
    const res = await api.delete(`/admin/coding-profiles/${id}`);
    return res.data;
  },

  // Messages Management
  getMessages: async (status = '') => {
    const res = await api.get('/admin/messages', { params: { status } });
    return res.data.data;
  },
  updateMessageStatus: async (id, status) => {
    const res = await api.put(`/admin/messages/${id}/status`, { status });
    return res.data.data;
  },
  deleteMessage: async (id) => {
    const res = await api.delete(`/admin/messages/${id}`);
    return res.data;
  },

  // File Upload (Images, PDFs, etc.)
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await api.post('/admin/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data.data;
  },
};
