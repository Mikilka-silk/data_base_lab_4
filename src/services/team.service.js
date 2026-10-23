const teamDao = require("../dao/team.dao");

class TeamService {
  // Отримання всіх команд (з формуванням DTO)
  async getAllTeams() {
    const teams = await teamDao.findAll();
    // DTO (Data Transfer Object) - повертаємо лише потрібні поля у зручному форматі
    return teams.map((t) => ({
      id: t.team_id,
      teamName: t.name,
    }));
  }

  // Отримання пілотів конкретної команди (M:1)
  async getTeamDrivers(teamId) {
    return await teamDao.getDriversByTeam(teamId);
  }

  async createTeam(teamData) {
    if (!teamData.name || !teamData.base_location || !teamData.team_principal) {
      throw new Error(
        "Необхідно вказати name, base_location та team_principal",
      );
    }
    const newId = await teamDao.create(teamData);
    return { id: newId, ...teamData };
  }

  async updateTeam(id, teamData) {
    if (!teamData.name || !teamData.base_location || !teamData.team_principal) {
      throw new Error(
        "Необхідно вказати name, base_location та team_principal",
      );
    }
    const affected = await teamDao.update(id, teamData);
    if (affected === 0) {
      throw new Error("Команду з таким ID не знайдено");
    }
    return { id, ...teamData };
  }

  // Видалення команди
  async deleteTeam(id) {
    const affected = await teamDao.delete(id);
    if (affected === 0) {
      throw new Error("Команду з таким ID не знайдено");
    }
    return { message: "Команду успішно видалено" };
  }

  // Отримання спонсорів команди (M:M)
  async getSponsors(teamId) {
    return await teamDao.getTeamSponsors(teamId);
  }
}

module.exports = new TeamService();
