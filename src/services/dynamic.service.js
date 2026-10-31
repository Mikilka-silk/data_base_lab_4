const dynamicDao = require("../dao/dynamic.dao");

class DynamicService {
  async getAll(tableName) {
    return await dynamicDao.findAll(tableName);
  }

  async getById(tableName, id) {
    const record = await dynamicDao.findById(tableName, id);
    if (!record)
      throw new Error(`Запис з ID ${id} у таблиці ${tableName} не знайдено`);
    return record;
  }

  async create(tableName, data) {
    if (Object.keys(data).length === 0) throw new Error("Тіло запиту порожнє");
    const newId = await dynamicDao.create(tableName, data);
    return { id: newId, ...data };
  }

  async update(tableName, id, data) {
    if (Object.keys(data).length === 0) throw new Error("Тіло запиту порожнє");
    const affected = await dynamicDao.update(tableName, id, data);
    if (affected === 0)
      throw new Error(`Запис з ID ${id} не знайдено для оновлення`);
    return { id, ...data };
  }

  async delete(tableName, id) {
    const affected = await dynamicDao.delete(tableName, id);
    if (affected === 0)
      throw new Error(`Запис з ID ${id} не знайдено для видалення`);
    return { message: `Запис успішно видалено з таблиці ${tableName}` };
  }
}

module.exports = new DynamicService();
