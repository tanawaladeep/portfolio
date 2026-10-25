import { Request, Response } from 'express';
import { Project } from '../models/Project';
import { initialProjects } from '../data/seedProjects';
import mongoose from 'mongoose';

export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected) {
      let projects = await Project.find().sort({ order: 1, createdAt: -1 });

      // If database is empty, seed it with initial projects
      if (projects.length === 0) {
        console.log('[Projects] Empty collection detected, seeding initial project records...');
        await Project.insertMany(initialProjects);
        projects = await Project.find().sort({ order: 1, createdAt: -1 });
      }

      res.status(200).json({
        success: true,
        count: projects.length,
        source: 'database',
        data: projects,
      });
      return;
    }

    // Fallback when MongoDB is offline
    res.status(200).json({
      success: true,
      count: initialProjects.length,
      source: 'static_fallback',
      data: initialProjects,
    });
  } catch (error: any) {
    console.error('[Projects] Error fetching projects:', error);
    // Graceful fallback to initial projects on any error
    res.status(200).json({
      success: true,
      count: initialProjects.length,
      source: 'static_fallback_on_error',
      data: initialProjects,
      message: 'Serving fallback project catalog.',
    });
  }
};

export const getProjectBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected) {
      const project = await Project.findOne({ slug });
      if (project) {
        res.status(200).json({
          success: true,
          data: project,
        });
        return;
      }
    }

    // Fallback search in seed data
    const fallbackProject = initialProjects.find(
      (p) => p.slug.toLowerCase() === slug.toLowerCase()
    );

    if (fallbackProject) {
      res.status(200).json({
        success: true,
        data: fallbackProject,
      });
      return;
    }

    res.status(404).json({
      success: false,
      message: `Project with slug '${slug}' was not found.`,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Internal server error retrieving project details.',
      error: error.message,
    });
  }
};
