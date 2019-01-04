const db = {
  user: [],
  todo: [
    {
      id: 0,
      category: 'test',
      title: 'todo-title',
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
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
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
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
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      progress: 100,
      status: 'done',
      userId: 'jakeWu',
      createAt: new Date(2018, 12, 29, 13, 32, 11),
      modifiedAt: new Date(2018, 12, 31, 17, 21, 3)
    }
  ]
}

export default db;