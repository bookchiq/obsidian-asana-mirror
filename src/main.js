import { Plugin } from 'obsidian';
import { AsanaMirrorSettingTab } from './settings';

const DEFAULT_SETTINGS = {
  apiKey: '',
  workspaceId: ''
};

export default class AsanaMirror extends Plugin {
  async onload() {
    console.log('Loading Asana Mirror plugin');

    // Load settings
    await this.loadSettings();

    // Add settings tab
    this.addSettingTab(new AsanaMirrorSettingTab(this.app, this));

    // Add a command to manually sync tasks
    this.addCommand({
      id: 'sync-asana-tasks',
      name: 'Sync Asana Tasks',
      callback: () => this.syncTasks()
    });

    // Optionally, set up periodic sync (e.g., every hour)
    this.intervalId = setInterval(() => this.syncTasks(), 3600000); // 1 hour in milliseconds
  }

  async onunload() {
    console.log('Unloading Asana Mirror plugin');

    // Clear the interval if it's set
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  async syncTasks() {
    console.log('Syncing Asana tasks...');

    // Fetch tasks from Asana API
    const tasks = await this.fetchAsanaTasks();

    // Format and update tasks in an Obsidian note
    await this.updateObsidianNote(tasks);
  }

  async fetchAsanaTasks() {
    if (!this.settings.apiKey) {
      console.error('Asana API key is not set.');
      return [];
    }

    const workspaceId = this.settings.workspaceId ? `?workspace=${this.settings.workspaceId}` : '';
    const assigneeId = this.settings.assigneeId ? `&assignee=${this.settings.assigneeId}` : '';
    const userSectionToExclude = this.settings.userSectionToExclude ? `&assignee_section.ne=${this.settings.userSectionToExclude}` : '';
    const optFields = 'name,completed,due_on,start_on,projects,projects.name,notes,uri,assignee_section,projects.gid,gid';
    const completedSince = new Date().toISOString();
    const apiURL = `https://app.asana.com/api/1.0/tasks${workspaceId}${assigneeId}${userSectionToExclude}&limit=100&opt_fields=${optFields}&completed_since=${completedSince}`;

    const response = await fetch(apiURL, {
      headers: {
        'Authorization': `Bearer ${this.settings.apiKey}`
      }
    });
    const data = await response.json();
    return data.data;
  }

  async updateObsidianNote(tasks) {
    // Get or create a specific note in Obsidian
    const file = await this.app.vault.getAbstractFileByPath('Asana Tasks.md');
    let fileContent = '';

    if (file) {
      fileContent = await this.app.vault.read(file);
    } else {
      await this.app.vault.create('Asana Tasks.md', '');
    }

    // Exclude tasks based on user-specified section IDs.
    if (this.settings.userSectionsToExclude) {
      let userSectionsToExclude = this.settings.userSectionsToExclude.split(',');
      // Trim whitespace from section IDs
      userSectionsToExclude = userSectionsToExclude.map(id => id.trim());
      tasks = tasks.filter(task => !userSectionsToExclude.includes(task.assignee_section.gid));
    }

    // Exclude tasks that have a start date (start_on) in the future
    tasks = tasks.filter(task => !task.start_on || new Date(task.start_on) <= new Date());

    // Exclude tasks based on user-specified project IDs
    if (this.settings.projectIdsToExclude) {
      let projectIdsToExclude = this.settings.projectIdsToExclude.split(',');
      // Trim whitespace from project IDs
      projectIdsToExclude = projectIdsToExclude.map(id => id.trim());
      tasks = tasks.filter(task => !task.projects.some(project => projectIdsToExclude.includes(project.gid)));
    }

    let taskTemplate = this.settings.taskTemplate;

    // Format tasks according to the user-specified template.
    let formattedTasks = tasks.map( function(task) {
      let formattedTask = taskTemplate
        .replace('{{assignee_section_id}}', task.assignee_section)
        .replace('{{completed}}', task.completed)
        .replace('{{due_date}}', task.due_on)
        .replace('{{notes}}', task.notes)
        .replace('{{task_id}}', task.gid)
        .replace('{{task_name}}', task.name);

        // Process project placeholders for tasks that have a project.
        if (
          task.projects &&
          task.projects.length > 0
      ) {
          formattedTask = formattedTask.replace('{{project_id}}', task.projects[0].gid);
          formattedTask = formattedTask.replace('{{project_name}}', task.projects[0].name);
      } else {
        formattedTask = formattedTask.replace('{{project_id}}', '0');
        formattedTask = formattedTask.replace('{{project_name}}', '');
      }

      return formattedTask;
    } ).join('\n');

    // Update the note content
    await this.app.vault.modify(file, formattedTasks);
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
