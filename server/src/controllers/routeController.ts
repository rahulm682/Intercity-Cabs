import type { Request, Response } from 'express';
import Route from '../models/Route.js'; // The model we created earlier

// @desc    Get all routes
// @route   GET /api/routes
// @access  Public
export const getRoutes = async (req: Request, res: Response) => {
  try {
    // Return only available routes, sorted by newest first
    const routes = await Route.find({ isAvailable: true }).sort({ createdAt: -1 });
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new route
// @route   POST /api/routes
// @access  Private (Admin only)
export const createRoute = async (req: Request, res: Response) => {
  const { source, destination, price, vehicleType, description } = req.body;

  // Validation
  if (!source || !destination || !price) {
    return res.status(400).json({ message: 'Please add all required fields' });
  }

  try {
    const route = await Route.create({
      source,
      destination,
      price,
      vehicleType,
      description,
    });
    res.status(201).json(route);
  } catch (error) {
    res.status(400).json({ message: 'Invalid route data' });
  }
};

// @desc    Update a route
// @route   PUT /api/routes/:id
// @access  Private
export const updateRoute = async (req: Request, res: Response) => {
  try {
    const route = await Route.findById(req.params.id);

    if (route) {
      route.source = req.body.source || route.source;
      route.destination = req.body.destination || route.destination;
      route.price = req.body.price || route.price;
      route.vehicleType = req.body.vehicleType || route.vehicleType;
      route.description = req.body.description || route.description;
      // route.isAvailable can be false, so we check undefined, not truthy
      if (req.body.isAvailable !== undefined) {
        route.isAvailable = req.body.isAvailable;
      }

      const updatedRoute = await route.save();
      res.json(updatedRoute);
    } else {
      res.status(404).json({ message: 'Route not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

// @desc    Delete a route
// @route   DELETE /api/routes/:id
// @access  Private
export const deleteRoute = async (req: Request, res: Response) => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) return res.status(404).json({ message: 'Route not found' });

    await route.deleteOne();
    res.json({ message: 'Route removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};