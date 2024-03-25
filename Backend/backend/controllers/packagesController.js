import Package from '../models/packageModel.js';

// Rest of your controller code...


// Get all packages
export const getPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific package by ID
export const getPackageById = async (req, res) => {
  try {
    const specificpackage = await Package.findById(req.params.id);
    if (!specificpackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json(specificpackage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new package
export const createPackage = async (req, res) => {
  try {
    const newPackage = new Package(req.body);
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




// Update a package by ID
export const updatePackage = async (req, res) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json(updatedPackage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a package by ID
export const deletePackage = async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);
    if (!deletedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
