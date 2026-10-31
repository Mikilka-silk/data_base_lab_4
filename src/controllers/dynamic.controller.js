const dynamicService = require("../services/dynamic.service");

class DynamicController {
  async getAll(req, res) {
    try {
      const data = await dynamicService.getAll(req.params.tableName);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const data = await dynamicService.getById(
        req.params.tableName,
        req.params.id,
      );
      res.json(data);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const result = await dynamicService.create(
        req.params.tableName,
        req.body,
      );
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const result = await dynamicService.update(
        req.params.tableName,
        req.params.id,
        req.body,
      );
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await dynamicService.delete(
        req.params.tableName,
        req.params.id,
      );
      res.json(result);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}

module.exports = new DynamicController();
