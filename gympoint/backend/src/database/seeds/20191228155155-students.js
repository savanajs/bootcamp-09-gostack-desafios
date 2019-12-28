module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'students',
      [
        {
          name: 'Rafael Cruz',
          email: 'rafaeldriveme@gmail.com',
          age: '34',
          height: '1.73',
          weight: '78',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Carlos Alberto',
          email: 'carlos.alberto@gmail.com',
          age: '30',
          height: '1.68',
          weight: '70',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('students', null, {});
  },
};
