import { useState } from "react";
import { Box, CircularProgress } from '@mui/material';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import ProjectsView from './ProjectsView';
import CategoriesView from './CategoriesView';
import TechnologiesView from './TechnologiesView';
import BusinessTypesView from './BusinessTypesView';
import { useProjects } from './hooks/useProjects';
import { useCategories } from './hooks/useCategories';
import { useTechnologies } from './hooks/useTechnologies';
import { useBusinessTypes } from './hooks/useBusinessTypes';

const AdminPanelContent = () => {
  const [view, setView] = useState("projects");

  // Custom hooks for data management
  const {
    projects,
    loading: projectsLoading,
    createProject,
    updateProject,
    deleteProject,
    fetchProjects
  } = useProjects();

  const {
    categories,
    loading: categoriesLoading,
    createCategory,
    updateCategory,
    deleteCategory
  } = useCategories();

  const {
    technologies,
    loading: technologiesLoading,
    createTechnology,
    updateTechnology,
    deleteTechnology
  } = useTechnologies();

  const {
    businessTypes,
    loading: businessTypesLoading,
    createBusinessType,
    updateBusinessType,
    deleteBusinessType
  } = useBusinessTypes();

  const loading = projectsLoading || categoriesLoading || technologiesLoading || businessTypesLoading;

  // Project handlers - simplified without snackbar
  const handleCreateProject = async (projectData) => {
    const result = await createProject(projectData);
    return result;
  };

  const handleUpdateProject = async (id, projectData) => {
    const result = await updateProject(id, projectData);
    return result;
  };

  const handleDeleteProject = async (id) => {
    const result = await deleteProject(id);
    return result;
  };

  // Category handlers - simplified without snackbar
  const handleCreateCategory = async (categoryData) => {
    const result = await createCategory(categoryData);
    if (result.success) {
      // Refresh projects in case category relationships changed
      fetchProjects();
    }
    return result;
  };

  const handleUpdateCategory = async (id, categoryData) => {
    const result = await updateCategory(id, categoryData);
    if (result.success) {
      // Refresh projects in case category relationships changed
      fetchProjects();
    }
    return result;
  };

  const handleDeleteCategory = async (id) => {
    const result = await deleteCategory(id);
    if (result.success) {
      // Refresh projects in case category relationships changed
      fetchProjects();
    }
    return result;
  };

  // Business type handlers - simplified without snackbar
  const handleCreateBusinessType = async (businessTypeData) => {
    const result = await createBusinessType(businessTypeData);
    if (result.success) {
      // Refresh projects in case business type relationships changed
      fetchProjects();
    }
    return result;
  };

  const handleUpdateBusinessType = async (id, businessTypeData) => {
    const result = await updateBusinessType(id, businessTypeData);
    if (result.success) {
      // Refresh projects in case business type relationships changed
      fetchProjects();
    }
    return result;
  };

  const handleDeleteBusinessType = async (id) => {
    const result = await deleteBusinessType(id);
    if (result.success) {
      // Refresh projects in case business type relationships changed
      fetchProjects();
    }
    return result;
  };

  // Technology handlers - simplified without snackbar
  const handleCreateTechnology = async (technologyData) => {
    const result = await createTechnology(technologyData);
    if (result.success) {
      // Refresh projects in case technology relationships changed
      fetchProjects();
    }
    return result;
  };

  const handleUpdateTechnology = async (id, technologyData) => {
    const result = await updateTechnology(id, technologyData);
    if (result.success) {
      // Refresh projects in case technology relationships changed
      fetchProjects();
    }
    return result;
  };

  const handleDeleteTechnology = async (id) => {
    const result = await deleteTechnology(id);
    if (result.success) {
      // Refresh projects in case technology relationships changed
      fetchProjects();
    }
    return result;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <AdminHeader />
      
      {/* Main Layout Container - positioned below fixed header */}
      <Box sx={{ display: 'flex', flexGrow: 1, mt: 8 }}>
        {/* Sidebar */}
        <AdminSidebar view={view} setView={setView} />
        
        {/* Main Content */}
        <Box sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
          <Box sx={{ 
            maxWidth: 1200, 
            mx: 'auto'
          }}>
            {view === 'projects' && (
              <ProjectsView
                projects={projects}
                categories={categories}
                businessTypes={businessTypes}
                technologies={technologies}
                loading={loading}
                onCreateProject={handleCreateProject}
                onUpdateProject={handleUpdateProject}
                onDeleteProject={handleDeleteProject}
                onRefreshProjects={fetchProjects}
              />
            )}
            
            {view === 'categories' && (
              <CategoriesView
                categories={categories}
                loading={loading}
                onCreateCategory={handleCreateCategory}
                onUpdateCategory={handleUpdateCategory}
                onDeleteCategory={handleDeleteCategory}
              />
            )}

            {view === 'businessTypes' && (
              <BusinessTypesView
                businessTypes={businessTypes}
                loading={loading}
                onCreateBusinessType={handleCreateBusinessType}
                onUpdateBusinessType={handleUpdateBusinessType}
                onDeleteBusinessType={handleDeleteBusinessType}
              />
            )}

            {view === 'technologies' && (
              <TechnologiesView
                technologies={technologies}
                loading={loading}
                onCreateTechnology={handleCreateTechnology}
                onUpdateTechnology={handleUpdateTechnology}
                onDeleteTechnology={handleDeleteTechnology}
              />
            )}
          </Box>
        </Box>
      </Box>
        
      {/* Loading Spinner Overlay */}
      {loading && (
        <Box sx={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100vw', 
          height: '100vh', 
          bgcolor: 'rgba(255,255,255,0.4)', 
          zIndex: 2000, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <CircularProgress size={60} thickness={5} />
        </Box>
      )}
    </Box>
  );
};

const AdminPanel = () => {
  return <AdminPanelContent />;
};

export default AdminPanel;