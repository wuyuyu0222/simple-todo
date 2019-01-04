const db = {
  user: [],
  todo: [
    {
      id: 0,
      category: 'test',
      title: 'todo-title',
      content: 'todo-content',
      progress: 0,
      status: 'ready',
      userId: 'jakeWu',
      createAt: new Date(2018, 12, 6, 14, 30, 7),
      modifiedAt: new Date(2018, 12, 21, 8, 59, 20)
    },
    {
      id: 1,
      category: 'test',
      title: 'progressing-title',
      content: 'progressing-content',
      progress: 50,
      status: 'progressing',
      userId: 'jakeWu',
      createAt: new Date(2018, 12, 8, 17, 42, 23),
      modifiedAt: new Date(2018, 12, 24, 23, 51, 30)
    },
    {
      id: 2,
      category: 'test-done',
      title: 'done-title',
      content: 'done-content',
      progress: 100,
      status: 'done',
      userId: 'jakeWu',
      createAt: new Date(2018, 12, 29, 13, 32, 11),
      modifiedAt: new Date(2018, 12, 31, 17, 21, 3)
    }
  ]
}

export default db;