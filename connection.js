const { faker } = require('@faker-js/faker');
const {Sequelize} = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const KanbanTasks = require('./models/tasks');

// Seed 100 dummy tasks
const Task = require('./models/tasks');

const seedTasks = async () => {
    const statuses = [0, 1, 2, 3];

    const tasks = Array.from({ length: 100 }).map(() => ({
      name: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      stage: statuses[Math.floor(Math.random() * statuses.length)],
    }));
  
    await Task.bulkCreate(tasks);
    console.log('✅ Seeded 100 tasks');
};

return sequelize.authenticate()
    .then(result => {
        console.log(`SQLite successfully connected!`);
        return KanbanTasks.sync();
    })
    .then(async result => {
        console.log(`Kanban Board table created`);
        await seedTasks();
        return result;
    })
    .catch(error => {
        console.error('Unable to connect to SQLite database:', error);
    })
