import { PluginSettingTab, Setting } from 'obsidian';

export class AsanaMirrorSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl('h2', { text: 'Settings for Obsidian Asana Mirror' });

    // Add a setting for the API key
    new Setting(containerEl)
      .setName('Asana API Key')
      .setDesc('Enter your Asana API key.')
      .addText(text => text
        .setPlaceholder('Enter your API key')
        .setValue(this.plugin.settings.apiKey || '')
        .onChange(async (value) => {
          this.plugin.settings.apiKey = value;
          await this.plugin.saveSettings();
        }));

    // Add a setting for the workspace ID
    new Setting(containerEl)
      .setName('Asana workspace ID')
      .setDesc('Enter your Asana workspace ID.')
      .addText(text => text
        .setPlaceholder('Enter your workspace ID')
        .setValue(this.plugin.settings.workspaceId || '')
        .onChange(async (value) => {
          this.plugin.settings.workspaceId = value;
          await this.plugin.saveSettings();
        }));
    
    // Add a setting for the assignee ID
    new Setting(containerEl)
      .setName('Asana assignee ID')
      .setDesc('Enter the assignee ID.')
      .addText(text => text
        .setPlaceholder('Enter the assignee ID')
        .setValue(this.plugin.settings.assigneeId || '')
        .onChange(async (value) => {
          this.plugin.settings.assigneeId = value;
          await this.plugin.saveSettings();
        }));

    // Add a setting for comma-separated user sections to exclude
    new Setting(containerEl)
      .setName('Asana user section to exclude')
      .setDesc('Enter the comma-separated user section IDs to exclude (optional).')
      .addText(text => text
        .setPlaceholder('Enter the user section IDs to exclude')
        .setValue(this.plugin.settings.userSectionsToExclude || '')
        .onChange(async (value) => {
          this.plugin.settings.userSectionsToExclude = value;
          await this.plugin.saveSettings();
        }));
    
    // Add a setting for comma-separated project IDs to exclude
    new Setting(containerEl)
      .setName('Asana project IDs to exclude')
      .setDesc('Enter the comma-separated project IDs to exclude (optional).')
      .addText(text => text
        .setPlaceholder('Enter the project IDs to exclude')
        .setValue(this.plugin.settings.projectIdsToExclude || '')
        .onChange(async (value) => {
          this.plugin.settings.projectIdsToExclude = value;
          await this.plugin.saveSettings();
        }));
    
    // Add a setting for task template
    new Setting(containerEl)
      .setName('Task template')
      .setDesc('Enter the task template. You can use the following placeholders: {{task_name}}, {{project_id}}, {{task_id}}, {{project_name}}, {{due_date}}, {{completed}}, {{notes}}, {{assignee_section_id}}.')
      .addTextArea(text => text
        .setPlaceholder('Enter the task template')
        .setValue(this.plugin.settings.taskTemplate || '')
        .onChange(async (value) => {
          this.plugin.settings.taskTemplate = value;
          await this.plugin.saveSettings();
        }));

    // Add a setting for the update interval
    new Setting(containerEl)
      .setName('Update interval')
      .setDesc('Enter the update interval in minutes.')
      .addText(text => text
        .setPlaceholder('Enter the update interval')
        .setValue(this.plugin.settings.updateInterval || '')
        .onChange(async (value) => {
          this.plugin.settings.updateInterval = value;
          await this.plugin.saveSettings();
        }));
  }
}
