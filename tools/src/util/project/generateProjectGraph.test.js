import generateProjectGraph from './generateProjectGraph'

describe('generateProjectGraph', () => {
  test('generates graph for single node', async () => {
    const testProject = {
      dependsOn: [],
      modules: {},
      name: 'test-project',
      path: '/some/test/path',
      projects: {},
      scripts: {
        cleanse: './scripts/cleanse.sh',
        setup: './scripts/setup.sh'
      },
      version: '0.0.1'
    }
    const graph = generateProjectGraph(testProject)
    expect(graph.node('project:test-project')).toEqual(testProject)
    expect(graph.nodes()).toEqual(['project:test-project'])
    expect(graph.edges()).toEqual([])
  })

  test('generates graph for multiple projects', async () => {
    const testSubProject = {
      dependsOn: [],
      modules: {},
      name: 'test-sub-project',
      path: '/some/test/path/sub-path',
      projects: {},
      scripts: {
        cleanse: './scripts/cleanse.sh',
        setup: './scripts/setup.sh'
      },
      version: '0.0.1'
    }

    const testProject = {
      dependsOn: [testSubProject],
      modules: {},
      name: 'test-project',
      path: '/some/test/path',
      projects: {
        'test-sub-project': testSubProject
      },
      scripts: {
        cleanse: './scripts/cleanse.sh',
        setup: './scripts/setup.sh'
      },
      version: '0.0.1'
    }

    const graph = generateProjectGraph(testProject)
    expect(graph.node('project:test-project')).toEqual(testProject)
    expect(graph.node('project:test-sub-project')).toEqual(testSubProject)
    expect(graph.nodes()).toEqual(['project:test-project', 'project:test-sub-project'])
    expect(graph.edges()).toEqual([{ v: 'project:test-project', w: 'project:test-sub-project' }])
  })

  test('generates only top node graph for multiple projects when using only option', async () => {
    const testSubProject = {
      dependsOn: [],
      modules: {},
      name: 'test-sub-project',
      path: '/some/test/path/sub-path',
      projects: {},
      scripts: {
        cleanse: './scripts/cleanse.sh',
        setup: './scripts/setup.sh'
      },
      version: '0.0.1'
    }

    const testProject = {
      dependsOn: [testSubProject],
      modules: {},
      name: 'test-project',
      path: '/some/test/path',
      projects: {
        'test-sub-project': testSubProject
      },
      scripts: {
        cleanse: './scripts/cleanse.sh',
        setup: './scripts/setup.sh'
      },
      version: '0.0.1'
    }

    const graph = generateProjectGraph(testProject, { only: true })
    expect(graph.node('project:test-project')).toEqual(testProject)
    expect(graph.node('project:test-sub-project')).toEqual(undefined)
    expect(graph.nodes()).toEqual(['project:test-project'])
    expect(graph.edges()).toEqual([])
  })
})
