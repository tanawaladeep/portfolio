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

const WEB3FORMS_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '6253c3d7-970c-4be9-8cc5-098477c1bb15';

export const submitContactForm = async (
  formData: ContactFormData
): Promise<{ success: boolean; message: string; errors?: Array<{ field: string; message: string }> }> => {
  try {
    // 1. Asynchronously persist to backend MongoDB Atlas (non-blocking fallback)
    fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).catch(() => {
      // Backend log or fallback
    });

    // 2. Deliver email directly to Deep Tanawala's Gmail inbox via Web3Forms
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        name: formData.name,
        email: formData.email,
        subject: `[Portfolio Inquiry] ${formData.subject}`,
        message: formData.message,
        from_name: `${formData.name} (via Portfolio)`,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const result = await response.json();

    if (result.success) {
      return {
        success: true,
        message: `Thank you, ${formData.name}! Your message has been sent directly to Deep's Gmail inbox (deeptanawala2006@gmail.com). Deep will reply shortly!`,
      };
    } else {
      return {
        success: false,
        message: result.message || 'Failed to dispatch email. Please email directly to deeptanawala2006@gmail.com.',
      };
    }
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return {
        success: false,
        message: 'Request timed out. Please email directly to deeptanawala2006@gmail.com or call +91 7990233764.',
      };
    }

    return {
      success: false,
      message: 'Network error. Please email directly to deeptanawala2006@gmail.com or call +91 7990233764.',
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
