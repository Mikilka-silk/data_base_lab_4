const pool = require("../config/db");

class TeamDAO {
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM teams");
    return rows;
  }

  async getDriversByTeam(teamId) {
    const [rows] = await pool.query(
      `
            SELECT d.* 
            FROM drivers d
            JOIN teams t ON d.team_id = t.team_id 
            WHERE t.team_id = ?`,
      [teamId],
    );
    return rows;
  }

  async create(teamData) {
    const { name, base_location, team_principal } = teamData;
    const [result] = await pool.query(
      "INSERT INTO teams (name, base_location, team_principal) VALUES (?, ?, ?)",
      [name, base_location, team_principal],
    );
    return result.insertId;
  }

  async update(id, teamData) {
    const { name, base_location, team_principal } = teamData;
    const [result] = await pool.query(
      "UPDATE teams SET name = ?, base_location = ?, team_principal = ? WHERE team_id = ?",
      [name, base_location, team_principal, id],
    );
    return result.affectedRows;
  }

  // Видалення запису (DELETE)
  async delete(id) {
    const [result] = await pool.query("DELETE FROM teams WHERE team_id = ?", [
      id,
    ]);
    return result.affectedRows;
  }

  // Зв'язок М:М
  async getTeamSponsors(teamId) {
    const [rows] = await pool.query(
      `
            SELECT s.* 
            FROM sponsors s
            JOIN team_sponsorships ts ON s.sponsor_id = ts.sponsor_id
            WHERE ts.team_id = ?
        `,
      [teamId],
    );
    return rows;
  }
}

module.exports = new TeamDAO();
