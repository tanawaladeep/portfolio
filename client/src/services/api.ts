import type { ApiResponse, ContactFormData, Project } from '../types';
import { fallbackProjects } from '../data/portfolioData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchProjects = async (): Promise<{ projects: Project[]; source: string }> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`${API_BASE_URL}/projects`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Server returned status ${res.status}`);
    }

    const data: ApiResponse<Project[]> = await res.json();
    if (data.success && data.data && data.data.length > 0) {
      return { projects: data.data, source: data.source || 'backend_api' };
    }

    return { projects: fallbackProjects, source: 'local_fallback' };
  } catch {
    console.info('[Projects API] Backend offline or unreachable, using local high-fidelity portfolio data.');
    return { projects: fallbackProjects, source: 'local_fallback' };
  }
};

export const fetchProjectBySlug = async (slug: string): Promise<Project | null> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`${API_BASE_URL}/projects/${slug}`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data: ApiResponse<Project> = await res.json();
      if (data.success && data.data) {
        return data.data;
      }
    }
  } catch {
    // Fallback to local
  }

  const match = fallbackProjects.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
  return match || null;
};

export const submitContactForm = async (
  formData: ContactFormData
): Promise<{ success: boolean; message: string; errors?: Array<{ field: string; message: string }> }> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || 'Failed to submit message. Please try again.',
        errors: data.errors,
      };
    }

    return {
      success: true,
      message: data.message || 'Your message has been sent successfully!',
    };
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return {
        success: false,
        message: 'Request timed out. Please check your connection or email directly to deeptanawala2006@gmail.com.',
      };
    }

    return {
      success: false,
      message: 'Unable to reach backend server. Please email directly to deeptanawala2006@gmail.com or call +91 7990233764.',
    };
  }
};

export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const res = await fetch(`${API_BASE_URL}/health`, { signal: AbortSignal.timeout(2000) });
    return res.ok;
  } catch {
    return false;
  }
};
