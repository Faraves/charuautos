---
name: app-server-lifecycle
description: >-
  Use this skill whenever the user requests any modification, adjustment, or feature in CharuAutos while the local application server is running. It stops the server immediately, applies all changes, and restarts the server once all adjustments are ready.
---

# CharuAutos App Server Lifecycle

This skill dictates the exact operational procedure when the user asks for code, UI, or logic modifications while `serve_local_app.py` is running.

## Procedure

### Step 1: Immediately Stop the Server
Before modifying any files:
- List running tasks with `manage_task` (Action: `list`).
- If `serve_local_app.py` or port 8080 is running, kill the task using `manage_task` (Action: `kill`, TaskId: `<taskId>`), or stop the process bound to port 8080.

### Step 2: Apply Modifications
- Perform all file edits (`replace_file_content`, `write_to_file`).
- Verify bracket balance, tag parity, and code correctness.

### Step 3: Restart the Server
- Once all adjustments are complete, start the server:
  `python D:\Proyectos\CharuAutos\app\serve_local_app.py`
  (using `run_command` with `IsDaemon: true` and `WaitMsBeforeAsync: 2000`).
- Verify port 8080 is listening.

### Step 4: Notify the User
- Present the changes to the user and confirm that the local server has been cleanly restarted on `http://localhost:8080`.
