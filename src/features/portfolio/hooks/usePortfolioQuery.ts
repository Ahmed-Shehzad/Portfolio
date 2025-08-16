/**
 * Portfolio React Query Hooks
 *
 * Custom hooks using React Query for portfolio/projects-related API operations.
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/axios-client";
import { queryKeys } from "@/lib/query/config";
import type { PortfolioProject } from "../types";
import { PORTFOLIO_PROJECTS } from "../constants";

// Cache timing constants
const PROJECTS_STALE_TIME = 10 * 60 * 1000; // 10 minutes
const PROJECTS_GC_TIME = 30 * 60 * 1000; // 30 minutes
const PROJECT_DETAIL_STALE_TIME = 15 * 60 * 1000; // 15 minutes
const PROJECT_DETAIL_GC_TIME = 60 * 60 * 1000; // 1 hour
const FILTERED_PROJECTS_STALE_TIME = 2 * 60 * 1000; // 2 minutes

/**
 * Hook for fetching all portfolio projects
 */
export const usePortfolioProjects = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: queryKeys.projectsList(),

    queryFn: async (): Promise<PortfolioProject[]> => {
      // For now, return static data
      // In a real app, this would fetch from API
      return [...PORTFOLIO_PROJECTS];

      // Actual implementation would be:
      // const response = await api.get<PortfolioProject[]>('/projects');
      // if (!response.success) {
      //   throw new Error(response.error || 'Failed to fetch projects');
      // }
      // return response.data!;
    },

    enabled: options?.enabled ?? true,

    // Cache for 10 minutes since project data doesn't change often
    staleTime: PROJECTS_STALE_TIME,

    // Keep in cache for 30 minutes
    gcTime: PROJECTS_GC_TIME,
  });
};

/**
 * Hook for fetching a specific portfolio project by ID
 */
export const usePortfolioProject = (projectId: string, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: queryKeys.projectDetail(projectId),

    queryFn: async (): Promise<PortfolioProject | null> => {
      // Validate and sanitize projectId
      if (!projectId || typeof projectId !== "string" || projectId.trim().length === 0) {
        return null;
      }

      const sanitizedId = projectId.toLowerCase().trim();

      // For now, find from static data
      const project = PORTFOLIO_PROJECTS.find(
        (p) => p.title.toLowerCase().replace(/\s+/g, "-") === sanitizedId
      );

      return project ?? null;

      // Actual implementation would be:
      // const response = await api.get<PortfolioProject>(`/projects/${projectId}`);
      // if (!response.success) {
      //   throw new Error(response.error || 'Failed to fetch project');
      // }
      // return response.data!;
    },

    enabled: (options?.enabled ?? true) && !!projectId,

    // Cache for 15 minutes for individual projects
    staleTime: PROJECT_DETAIL_STALE_TIME,

    // Keep in cache for 1 hour
    gcTime: PROJECT_DETAIL_GC_TIME,

    // Throw error if project not found
    throwOnError: true,
  });
};

/**
 * Hook for fetching projects with filtering/search
 */
export const useFilteredProjects = (filters: {
  company?: string;
  year?: string;
  technology?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: queryKeys.projectsList(filters),

    queryFn: async (): Promise<PortfolioProject[]> => {
      // For now, filter static data
      let filteredProjects = [...PORTFOLIO_PROJECTS];

      if (filters.company) {
        filteredProjects = filteredProjects.filter((p) =>
          p.company.toLowerCase().includes(filters.company?.toLowerCase() ?? "")
        );
      }

      if (filters.year) {
        filteredProjects = filteredProjects.filter((p) => p.year === filters.year);
      }

      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredProjects = filteredProjects.filter(
          (p) =>
            p.title.toLowerCase().includes(searchLower) ||
            p.company.toLowerCase().includes(searchLower) ||
            p.results.some((r) => r.title.toLowerCase().includes(searchLower))
        );
      }

      return filteredProjects;

      // Actual implementation would be:
      // const response = await api.get<PortfolioProject[]>('/projects', {
      //   params: filters
      // });
      // if (!response.success) {
      //   throw new Error(response.error || 'Failed to fetch filtered projects');
      // }
      // return response.data!;
    },

    // Shorter cache time for filtered results since they can change more often
    staleTime: FILTERED_PROJECTS_STALE_TIME,

    // Enable the query only if we have at least one filter
    enabled: Object.values(filters).some((value) => Boolean(value)),
  });
};

/**
 * Hook for creating a new portfolio project (admin functionality)
 */
export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["projects", "create"],

    mutationFn: async (projectData: Omit<PortfolioProject, "image">): Promise<PortfolioProject> => {
      const response = await api.post<PortfolioProject>("/projects", projectData);

      if (!response.success || !response.data) {
        throw new Error(response.error ?? "Failed to create project");
      }

      return response.data;
    },

    onSuccess: (newProject) => {
      // Update the projects list cache
      queryClient.setQueryData<PortfolioProject[]>(queryKeys.projectsList(), (oldData) =>
        oldData ? [...oldData, newProject] : [newProject]
      );

      // Also set the individual project cache
      const projectId = newProject.title.toLowerCase().replace(/\s+/g, "-");
      queryClient.setQueryData(queryKeys.projectDetail(projectId), newProject);

      // Invalidate filtered queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.projects(),
        exact: false,
      });
    },
  });
};

/**
 * Hook for updating an existing portfolio project (admin functionality)
 */
export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["projects", "update"],

    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<PortfolioProject>;
    }): Promise<PortfolioProject> => {
      const response = await api.put<PortfolioProject>(`/projects/${id}`, data);

      if (!response.success || !response.data) {
        throw new Error(response.error ?? "Failed to update project");
      }

      return response.data;
    },

    onSuccess: (updatedProject, variables) => {
      // Update all relevant caches
      queryClient.setQueryData(queryKeys.projectDetail(variables.id), updatedProject);

      // Update the projects list
      queryClient.setQueryData<PortfolioProject[]>(
        queryKeys.projectsList(),
        (oldData) =>
          oldData?.map((project) =>
            project.title.toLowerCase().replace(/\s+/g, "-") === variables.id
              ? updatedProject
              : project
          ) ?? []
      );

      // Invalidate filtered queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.projects(),
        exact: false,
      });
    },
  });
};
