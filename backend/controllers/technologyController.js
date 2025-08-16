import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all technologies
export const getAllTechnologies = async (req, res) => {
  try {
    const technologies = await prisma.technology.findMany({
      orderBy: { name: 'asc' }
    });
    res.json(technologies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new technology
export const createTechnology = async (req, res) => {
  try {
    const { name } = req.body;
    const technology = await prisma.technology.create({ data: { name } });
    res.status(201).json(technology);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a technology
export const updateTechnology = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const technology = await prisma.technology.update({
      where: { id: Number(id) },
      data: { name },
    });
    res.json(technology);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a technology
export const deleteTechnology = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.technology.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};