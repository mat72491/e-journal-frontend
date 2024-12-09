e-Journal App ReadMe

Overview

The e-Journal app will allow users to create, view, edit, and delete journal entries. Users can write personal notes, add tags to entries for easy categorization, and track their journaling history. The app will store the journal entries in a database, offering the ability to search and filter by tags, date, and content.

Features and User Stories

1. User Authentication

Story 1: User Registration and Login
• As a new user, I want to be able to register for an account so that I can create and save journal entries securely.
• As a registered user, I want to log in to the app so I can access my personal journal entries.

Acceptance Criteria:
• Users can register with a username, email, and password.
• Users can log in using their username and password.
• Passwords are stored securely (hashed).

2. Creating Journal Entries

Story 2: Add a New Journal Entry
• As a user, I want to be able to create a new journal entry so that I can write and store my thoughts.
• I should be able to add a title, body text, and tags to categorize the entry.

Acceptance Criteria:
• The user can enter a title (optional) and body text (required).
• The user can add tags to the entry (optional), e.g., “mood”, “work”, “life”.
• The user can save the entry, which will store it in the database with the user’s information.

3. Viewing Journal Entries

Story 3: View All Journal Entries
• As a user, I want to see a list of all my journal entries so I can read and review them.
• The list should display the title, date created, and tags.

Acceptance Criteria:
• Users can see a list of all their journal entries.
• Entries are ordered by date created (newest first).
• Each entry shows the title, creation date, and tags.
• Clicking on a journal entry shows the full content.

4. Searching and Filtering Journal Entries

Story 4: Search and Filter Entries by Tag
• As a user, I want to search and filter journal entries by tags so that I can easily find entries on specific topics.
• I want to filter by date range (e.g., “last 7 days”, “this month”).

Acceptance Criteria:
• The user can search by tags and only see entries with matching tags.
• The user can filter by date, such as filtering entries within a specific timeframe (e.g., past week, past month).

5. Editing Journal Entries

Story 5: Edit an Existing Journal Entry
• As a user, I want to be able to edit an existing journal entry so I can update it with new thoughts or correct mistakes.

Acceptance Criteria:
• The user can edit the title, body text, and tags.
• After editing, the changes are saved and reflected in the list of journal entries.
• Users can only edit their own entries, not others’.

6. Deleting Journal Entries

Story 6: Delete a Journal Entry
• As a user, I want to be able to delete a journal entry if I no longer wish to keep it.

Acceptance Criteria:
• The user can delete an entry by clicking a “Delete” button next to the entry.
• A confirmation dialog appears to prevent accidental deletion.
• Once deleted, the entry is removed from the database and no longer shows in the user’s journal list.

7. User Dashboard and Profile

Story 7: User Dashboard
• As a user, I want to have a dashboard where I can see an overview of my journaling activity, including the number of entries, tags used, and recent entries.
• This will give me a quick snapshot of my journaling habits and progress.

Acceptance Criteria:
• The user’s dashboard shows the total number of entries.
• The user can see the most recent entries and how often specific tags have been used.

Database Models
1. User (Django’s default User model):
• username (unique)
• email (unique)
• password (hashed)
2. JournalEntry:
• user (ForeignKey to User)
• title (CharField, optional)
• body (TextField)
• tags (ManyToManyField to Tag)
• created_at (DateTimeField)
• updated_at (DateTimeField)
3. Tag:
• name (CharField, unique)

Tech Stack
• Backend: Django
• Frontend: React
• Database: PostgreSQL
• Authentication: Django’s built-in authentication system

Django CRUD Operations
• Create: Users can create new journal entries by filling out a form that includes the title, body, and tags.
• Read: The app displays a list of entries for the user, with the option to view full details of an individual entry.
• Update: Users can edit any of their journal entries, including title, body, and tags.
• Delete: Users can delete an entry from the app with a confirmation step.

Optional Features for Future Development
Export entries to PDF or text file.
Responsive design so users can use the app on mobile or tablet.
• Password reset functionality.
• Dark mode toggle for a better user experience.
• Share entries functionality, where users can share their entries via email or social media.
