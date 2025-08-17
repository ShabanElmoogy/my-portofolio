import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper function to format project response
const formatProject = (project) => ({
  id: project.id,
  title: project.title,
  businessTypeId: project.businessTypeId,
  categoryId: project.categoryId,
  imgPath: project.imgPath,
  images: project.images || [],
  githubUrl: project.githubUrl,
  previewUrl: project.previewUrl,
  featured: project.featured,
  businessType: project.businessType || null,
  category: project.category || null,
  technologies: project.technologies?.map(pt => pt.technology) || [],
  descriptions: project.descriptions?.map(desc => ({
    id: desc.id,
    category: desc.category,
    title: desc.title,
    points: JSON.parse(desc.points || '[]'),
    order: desc.order
  })).sort((a, b) => a.order - b.order) || [],
  createdAt: project.createdAt,
  updatedAt: project.updatedAt
});

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        businessType: true,
        category: true,
        technologies: { include: { technology: true } },
        images: { orderBy: { order: 'asc' } },
        descriptions: { orderBy: { order: 'asc' } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(projects.map(formatProject));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        businessType: true,
        category: true,
        technologies: { include: { technology: true } },
        images: { orderBy: { order: 'asc' } },
        descriptions: { orderBy: { order: 'asc' } }
      }
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(formatProject(project));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get projects by business type
export const getProjectsByBusinessType = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { businessTypeId: Number(req.params.businessTypeId) },
      include: {
        businessType: true,
        category: true,
        technologies: { include: { technology: true } },
        images: { orderBy: { order: 'asc' } },
        descriptions: { orderBy: { order: 'asc' } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(projects.map(formatProject));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get projects by category
export const getProjectsByCategory = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { categoryId: Number(req.params.categoryId) },
      include: {
        businessType: true,
        category: true,
        technologies: { include: { technology: true } },
        images: { orderBy: { order: 'asc' } },
        descriptions: { orderBy: { order: 'asc' } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(projects.map(formatProject));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get projects by technology
export const getProjectsByTechnology = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        technologies: { some: { technologyId: Number(req.params.technologyId) } }
      },
      include: {
        businessType: true,
        category: true,
        technologies: { include: { technology: true } },
        images: { orderBy: { order: 'asc' } },
        descriptions: { orderBy: { order: 'asc' } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(projects.map(formatProject));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get featured projects
export const getFeaturedProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { featured: true },
      include: {
        businessType: true,
        category: true,
        technologies: { include: { technology: true } },
        images: { orderBy: { order: 'asc' } },
        descriptions: { orderBy: { order: 'asc' } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(projects.map(formatProject));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { 
      title, 
      businessTypeId, 
      categoryId, 
      imgPath, 
      images = [],
      githubUrl,
      previewUrl,
      technologyIds, 
      featured = false,
      descriptions = []
    } = req.body;

    console.log('Creating project with data:', req.body);
    console.log('Images received:', images);

    // Validation
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }
    if (!imgPath) {
      return res.status(400).json({ error: "Main image is required" });
    }
    if (!githubUrl) {
      return res.status(400).json({ error: "GitHub URL is required" });
    }
    if (!previewUrl) {
      return res.status(400).json({ error: "Preview URL is required" });
    }
    if (!descriptions || descriptions.length === 0) {
      return res.status(400).json({ error: "At least one description section is required" });
    }

    // Validate descriptions
    for (const desc of descriptions) {
      if (!desc.category || !desc.category.trim()) {
        return res.status(400).json({ error: "Description category is required" });
      }
      if (!desc.title || !desc.title.trim()) {
        return res.status(400).json({ error: "Description section title is required" });
      }
      if (!desc.points || !Array.isArray(desc.points) || desc.points.length === 0) {
        return res.status(400).json({ error: "Description section must have at least one point" });
      }
      for (const point of desc.points) {
        if (!point || typeof point !== 'string' || !point.trim()) {
          return res.status(400).json({ error: "All description points must be non-empty strings" });
        }
      }
    }

    // Clean and validate images - NEVER allow undefined imageUrl
    const validImages = images
      .filter(img => {
        const hasValidUrl = img && img.imageUrl && typeof img.imageUrl === 'string' && img.imageUrl.trim();
        console.log('Image validation:', img, 'hasValidUrl:', hasValidUrl);
        return hasValidUrl;
      })
      .map((img, index) => ({
        imageUrl: img.imageUrl.trim(),
        altText: (img.altText || '').toString(),
        order: typeof img.order === 'number' ? img.order : index
      }));

    console.log('Valid images after filtering:', validImages);

    // Build data object
    const projectData = {
      title,
      businessTypeId: businessTypeId ? Number(businessTypeId) : null,
      categoryId: categoryId ? Number(categoryId) : null,
      imgPath,
      githubUrl,
      previewUrl,
      featured: Boolean(featured),
      technologies: {
        create: technologyIds?.map(techId => ({
          technologyId: Number(techId)
        })) || []
      },
      descriptions: {
        create: descriptions.map((desc, index) => ({
          category: desc.category,
          title: desc.title,
          points: JSON.stringify(desc.points),
          order: desc.order !== undefined ? desc.order : index
        }))
      }
    };

    // Only add images if we have valid ones
    if (validImages.length > 0) {
      projectData.images = {
        create: validImages
      };
    }

    console.log('Final project data:', JSON.stringify(projectData, null, 2));

    const project = await prisma.project.create({
      data: projectData,
      include: {
        businessType: true,
        category: true,
        technologies: { include: { technology: true } },
        images: { orderBy: { order: 'asc' } },
        descriptions: { orderBy: { order: 'asc' } }
      },
    });

    console.log('Project created successfully:', project.id);
    res.status(201).json(formatProject(project));
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(400).json({ error: error.message });
  }
};

// Update a project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      title, 
      businessTypeId, 
      categoryId, 
      imgPath, 
      images = [],
      githubUrl,
      previewUrl,
      technologyIds, 
      featured,
      descriptions = []
    } = req.body;

    console.log('Updating project with data:', req.body);
    console.log('Images received:', images);

    // Validation
    if (title && !title.trim()) {
      return res.status(400).json({ error: "Title cannot be empty" });
    }
    if (imgPath && !imgPath.trim()) {
      return res.status(400).json({ error: "Main image cannot be empty" });
    }
    if (githubUrl && !githubUrl.trim()) {
      return res.status(400).json({ error: "GitHub URL cannot be empty" });
    }
    if (previewUrl && !previewUrl.trim()) {
      return res.status(400).json({ error: "Preview URL cannot be empty" });
    }
    if (descriptions && descriptions.length === 0) {
      return res.status(400).json({ error: "At least one description section is required" });
    }

    // Validate descriptions if provided
    if (descriptions && descriptions.length > 0) {
      for (const desc of descriptions) {
        if (!desc.category || !desc.category.trim()) {
          return res.status(400).json({ error: "Description category is required" });
        }
        if (!desc.title || !desc.title.trim()) {
          return res.status(400).json({ error: "Description section title is required" });
        }
        if (!desc.points || !Array.isArray(desc.points) || desc.points.length === 0) {
          return res.status(400).json({ error: "Description section must have at least one point" });
        }
        for (const point of desc.points) {
          if (!point || typeof point !== 'string' || !point.trim()) {
            return res.status(400).json({ error: "All description points must be non-empty strings" });
          }
        }
      }
    }

    // Check for duplicate (excluding current project)
    if (title) {
      const existingProject = await prisma.project.findFirst({
        where: {
          title,
          categoryId: categoryId ? Number(categoryId) : null,
          NOT: { id: Number(id) },
        },
      });

      if (existingProject) {
        return res.status(409).json({
          error: "A project with the same title and category already exists."
        });
      }
    }

    // Clean and validate images - NEVER allow undefined imageUrl
    const validImages = images
      .filter(img => {
        const hasValidUrl = img && img.imageUrl && typeof img.imageUrl === 'string' && img.imageUrl.trim();
        console.log('Image validation:', img, 'hasValidUrl:', hasValidUrl);
        return hasValidUrl;
      })
      .map((img, index) => ({
        imageUrl: img.imageUrl.trim(),
        altText: (img.altText || '').toString(),
        order: typeof img.order === 'number' ? img.order : index
      }));

    console.log('Valid images after filtering:', validImages);

    // Delete existing relationships
    await prisma.projectTechnology.deleteMany({
      where: { projectId: Number(id) }
    });
    await prisma.projectImage.deleteMany({
      where: { projectId: Number(id) }
    });
    await prisma.projectDescription.deleteMany({
      where: { projectId: Number(id) }
    });

    // Build update data
    const updateData = {
      ...(title && { title }),
      ...(businessTypeId !== undefined && { 
        businessTypeId: businessTypeId ? Number(businessTypeId) : null 
      }),
      ...(categoryId !== undefined && { 
        categoryId: categoryId ? Number(categoryId) : null 
      }),
      ...(imgPath && { imgPath }),
      ...(githubUrl && { githubUrl }),
      ...(previewUrl && { previewUrl }),
      ...(featured !== undefined && { featured: Boolean(featured) }),
      technologies: {
        create: technologyIds?.map(techId => ({
          technologyId: Number(techId)
        })) || []
      },
      descriptions: {
        create: descriptions.map((desc, index) => ({
          category: desc.category,
          title: desc.title,
          points: JSON.stringify(desc.points),
          order: desc.order !== undefined ? desc.order : index
        }))
      }
    };

    // Only add images if we have valid ones
    if (validImages.length > 0) {
      updateData.images = {
        create: validImages
      };
    }

    console.log('Final update data:', JSON.stringify(updateData, null, 2));

    const project = await prisma.project.update({
      where: { id: Number(id) },
      data: updateData,
      include: {
        businessType: true,
        category: true,
        technologies: { include: { technology: true } },
        images: { orderBy: { order: 'asc' } },
        descriptions: { orderBy: { order: 'asc' } }
      },
    });

    console.log('Project updated successfully:', project.id);
    res.json(formatProject(project));
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(400).json({ error: error.message });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  try {
    await prisma.project.delete({ where: { id: Number(req.params.id) } });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};