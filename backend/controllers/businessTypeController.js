import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all business types
export const getAllBusinessTypes = async (req, res) => {
  try {
    const businessTypes = await prisma.businessType.findMany();
    res.json(businessTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new business type
export const createBusinessType = async (req, res) => {
  try {
    const { name } = req.body;
    const businessType = await prisma.businessType.create({ data: { name } });
    res.status(201).json(businessType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a business type
export const updateBusinessType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const businessType = await prisma.businessType.update({
      where: { id: Number(id) },
      data: { name },
    });
    res.json(businessType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a business type
export const deleteBusinessType = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.businessType.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};