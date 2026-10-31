const pool = require("../config/db"); // Або "../config/db.js" залежно від твого налаштування

class DynamicDAO {
  // Допоміжний метод для пошуку первинного ключа таблиці (наприклад, team_id)
  async getPrimaryKey(tableName) {
    const [rows] = await pool.query(
      `SHOW KEYS FROM \`${tableName}\` WHERE Key_name = 'PRIMARY'`,
    );
    if (rows.length > 0) return rows[0].Column_name;
    throw new Error(`Первинний ключ для таблиці ${tableName} не знайдено`);
  }

  async findAll(tableName) {
    const [rows] = await pool.query(`SELECT * FROM \`${tableName}\``);
    return rows;
  }

  async findById(tableName, id) {
    const pk = await this.getPrimaryKey(tableName);
    const [rows] = await pool.query(
      `SELECT * FROM \`${tableName}\` WHERE \`${pk}\` = ?`,
      [id],
    );
    return rows[0];
  }

  async create(tableName, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    // Формуємо динамічні плейсхолдери (?, ?, ?) і назви колонок (`name`, `salary_mln`)
    const placeholders = keys.map(() => "?").join(", ");
    const columns = keys.map((k) => `\`${k}\``).join(", ");

    const [result] = await pool.query(
      `INSERT INTO \`${tableName}\` (${columns}) VALUES (${placeholders})`,
      values,
    );
    return result.insertId;
  }

  async update(tableName, id, data) {
    const pk = await this.getPrimaryKey(tableName);
    const keys = Object.keys(data);
    const values = Object.values(data);

    // Формуємо динамічний SET (`name` = ?, `salary_mln` = ?)
    const setClause = keys.map((k) => `\`${k}\` = ?`).join(", ");

    const [result] = await pool.query(
      `UPDATE \`${tableName}\` SET ${setClause} WHERE \`${pk}\` = ?`,
      [...values, id],
    );
    return result.affectedRows;
  }

  async delete(tableName, id) {
    const pk = await this.getPrimaryKey(tableName);
    const [result] = await pool.query(
      `DELETE FROM \`${tableName}\` WHERE \`${pk}\` = ?`,
      [id],
    );
    return result.affectedRows;
  }
}

module.exports = new DynamicDAO();
