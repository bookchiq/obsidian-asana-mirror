# Obsidian Asana Mirror

**Obsidian Asana Mirror** is a plugin for [Obsidian](https://obsidian.md) that syncs your Asana tasks with an Obsidian note. The plugin allows you to manually or periodically sync tasks, providing a seamless way to keep your task list up to date.

## Features

- Sync tasks from Asana to a specified Obsidian note.
- Configure API key, workspace ID, and assignee ID through the settings screen.
- Exclude specific user sections and project IDs from synchronization.
- Customize the task template to control how tasks are displayed in Obsidian.
- Set up periodic sync (e.g., every hour) to keep your task list up to date automatically.

## Installation

1. **Clone or Download the Plugin:**
   - Clone this repository or download the ZIP file and extract it.

2. **Move to Obsidian Plugins Folder:**
   - Move the `obsidian-asana-mirror` folder to your Obsidian plugins directory, typically located at `.obsidian/plugins/`.

3. **Install Dependencies:**
   - Navigate to the plugin folder in your terminal and run:
     ```bash
     npm install
     ```

4. **Build the Plugin:**
   - Build the plugin by running:
     ```bash
     npm run build
     ```

5. **Enable the Plugin:**
   - Open Obsidian, go to `Settings` -> `Community plugins` -> `Installed plugins`, and enable "Obsidian Asana Mirror".

## Configuration

1. **Open Plugin Settings:**
   - Go to `Settings` -> `Community plugins` -> `Obsidian Asana Mirror`.

2. **Set Asana API Key:**
   - Enter your Asana API key. You can generate a new API key from your Asana account settings.

3. **Set Workspace ID:**
   - Enter your Asana workspace ID. This is optional but recommended for filtering tasks.

4. **Set Assignee ID:**
   - Enter the assignee ID. This is optional but can be useful for filtering tasks assigned to a specific user.

5. **Exclude User Sections:**
   - Enter comma-separated user section IDs to exclude certain sections from synchronization.

6. **Exclude Project IDs:**
   - Enter comma-separated project IDs to exclude certain projects from synchronization.

7. **Task Template:**
   - Customize the task template using placeholders:
     - `{{task_name}}`: Task name
     - `{{project_id}}`: Project ID
     - `{{task_id}}`: Task ID
     - `{{project_name}}`: Project name
     - `{{due_date}}`: Due date
     - `{{completed}}`: Task completion status
     - `{{notes}}`: Task notes
     - `{{assignee_section_id}}`: Assignee section ID

## Usage

- **Manual Sync:**
  - Use the command palette (`Cmd/Ctrl + P`) to run the `Sync Asana Tasks` command and manually sync tasks.

- **Periodic Sync:**
  - The plugin is configured to sync tasks every hour by default. You can change the interval in the plugin code if needed.

## Development

1. **Fork and Clone the Repository:**
   - Fork this repository and clone it to your local machine.

2. **Install Dependencies:**
   - Navigate to the plugin folder and run:
     ```bash
     npm install
     ```

3. **Build the Plugin:**
   - Build the plugin by running:
     ```bash
     npm run build
     ```

4. **Develop and Test:**
   - Make your changes and test them in Obsidian. Ensure the plugin is reloaded after each change.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

*Happy task managing with Obsidian and Asana!*
