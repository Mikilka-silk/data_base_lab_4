const teamDao = require("../dao/team.dao");

class TeamService {
  async getAllTeams() {
    const teams = await teamDao.findAll();
    return teams.map((t) => ({
      id: t.team_id,
      teamName: t.name,
    }));
  }

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

  async deleteTeam(id) {
    const affected = await teamDao.delete(id);
    if (affected === 0) {
      throw new Error("Команду з таким ID не знайдено");
    }
    return { message: "Команду успішно видалено" };
  }

  async getSponsors(teamId) {
    return await teamDao.getTeamSponsors(teamId);
  }

  // ЛАБКА 5

  async addSponsor(data) {
    if (!data.name || !data.industry) {
      throw new Error("Необхідно вказати name та industry");
    }
    await teamDao.callAddSponsor(data.name, data.industry);
    return { message: "Спонсора успішно додано через процедуру" };
  }

  async addSponsorshipByNames(data) {
    const { teamName, sponsorName, contractMln, startYear } = data;
    if (!teamName || !sponsorName || !contractMln || !startYear) {
      throw new Error(
        "Необхідно вказати teamName, sponsorName, contractMln, startYear",
      );
    }
    await teamDao.callAddSponsorshipByNames(
      teamName,
      sponsorName,
      contractMln,
      startYear,
    );
    return { message: "Спонсорський контракт успішно створено" };
  }

  async generateTestSponsors() {
    await teamDao.callGenerateTestSponsors();
    return { message: "10 тестових спонсорів успішно згенеровано" };
  }

  async getMaxDriverSalary() {
    const data = await teamDao.callShowMaxDriverSalary();
    return data;
  }

  async splitDrivers() {
    await teamDao.callSplitDriversRandomly();
    return {
      message:
        "Гонщиків успішно розподілено по нових динамічних таблицях курсором",
    };
  }
}

module.exports = new TeamService();
