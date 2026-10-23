const teamService = require("../services/team.service");

class TeamController {
  // GET /api/teams
  async getAll(req, res) {
    try {
      const teams = await teamService.getAllTeams();
      res.json(teams);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

  // GET /api/teams/:id/drivers
  async getDrivers(req, res) {
    try {
      const drivers = await teamService.getTeamDrivers(req.params.id);
      res.json(drivers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // POST /api/teams
  async create(req, res) {
    try {
      const newTeam = await teamService.createTeam(req.body);
      res.status(201).json(newTeam); // 201 Created
    } catch (error) {
      res.status(400).json({ message: error.message }); // 400 Bad Request
    }
  }

  // PUT /api/teams/:id
  async update(req, res) {
    try {
      const updatedTeam = await teamService.updateTeam(req.params.id, req.body);
      res.json(updatedTeam);
    } catch (error) {
      res.status(404).json({ message: error.message }); // 404 Not Found
    }
  }

  // DELETE /api/teams/:id
  async delete(req, res) {
    try {
      const result = await teamService.deleteTeam(req.params.id);
      res.json(result);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  // GET /api/teams/:id/sponsors
  async getSponsors(req, res) {
    try {
      const sponsors = await teamService.getSponsors(req.params.id);
      res.json(sponsors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new TeamController();
