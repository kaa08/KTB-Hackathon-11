import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});


api.interceptors.request.use((config) => {
    const email = localStorage.getItem("login_email");

    if (email && config.headers) {
        config.headers.set("email", email);
    }

    return config;
});

export interface AnalyzeResponse {
  jobId: string;
  message: string;
}

export interface JobStatus {
  jobId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  message: string;
  video_id?: string;
}

export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
  note?: string;
}

export interface Step {
  step_number: number;
  instruction: string;
  timestamp: number;
  duration?: string;
  tips?: string;
}

export interface Recipe {
  title: string;
  description?: string;
  servings?: string;
  total_time?: string;
  difficulty?: string;
  ingredients: Ingredient[];
  steps: Step[];
  tips?: string[];
}

export interface Frame {
  step_number: number;
  timestamp: number;
  frame_path: string;
  frame_filename: string;
}

export interface VideoInfo {
  video_id: string;
  title: string;
  duration: number;
  url: string;
}

export interface AnalysisResult {
  recipe: Recipe;
  frames: Frame[];
  video_info: VideoInfo;
  transcript: {
    full_text: string;
    segments: Array<{
      start: number;
      end: number;
      text: string;
    }>;
  };
}

export const analyzeVideo = async (url: string): Promise<AnalyzeResponse> => {
  const response = await api.post('/recipes/analyze', { url });
  console.log('analyzeVideo response:', response.data);
  return response.data;
};

export const getJobStatus = async (jobId: string): Promise<JobStatus> => {
  const response = await api.get(`/recipes/status/${jobId}`);
  return response.data;
};

export const getResult = async (jobId: string): Promise<AnalysisResult> => {
  const response = await api.get(`/recipes/result/${jobId}`);
  return response.data;
};

export const getFrameUrl = (jobId: string, filename: string): string => {
  return `/api/frames/${jobId}/${filename}`;
};

export const downloadExport = async (jobId: string, format: 'markdown' | 'pdf'): Promise<Blob> => {
  const response = await api.get(`/export/${jobId}`, {
    params: { format },
    responseType: 'blob',
  });
  return response.data;
};

export default api;
