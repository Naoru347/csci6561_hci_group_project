# Design Read-me & Documentation Notes
## Executive Summary
FOCUSWRITE is a secure, browser-based academic writing environment designed to help students demonstrate independent writing skills without reliance on generative AI. Built for classroom and exam use, it supports undistracted and limited-access modes, simulates real-world writing conditions, and empowers instructors to review student performance through detailed system logs and violation reports.

## Outline of What Users (Students) Can Do
This app allows students to complete the following tasks:
- view a list of assignments to be completed and their deadlines
- select an assignment and read its description
- compose a response to the assignment in one the following two modes specified for this assignment by the teacher
      - **Undistracted Writing** allows no acccess to resources outside the app. The copy/paste functionality is disabled.
      - **Writing With Resources** allows access to such teacher-approved resources as the student’s past assignments with the feedback from the teacher, files uploaded by the student or the teacher, and some websites. Copying from the allowed resources and pasting into the current work is enabled.
- submit the written assignment
- view and add comments to a report that is submitted with the assignment and that details system failures occurring during the completion of the assignment and the student’s attempts to performed restricted actions during the completion of the assignment
- upload files that, after the teacher’s approval, can be accessed in the Limited Access mode

### Section Ownership
- Primary Owner: Dmitri Stanchevici
- Contributor: J. M. Paiz

## Concepts Needed to Know How to Interact
- **Protected Composition Space**: A protected composition space refers to a workspace for students to engage in the act of composing--the intentional arrangement of knowledge in written form for a critical dialogue (e.g., Copenhagen Business School, 2022)--in a sheltered, distraction-free environment. Specifically, it is one that encourages undistracted writing and focusing solely on the student-writer deploying those resources and knowledge-bases overwhich they have the most immedidate/direct control with the goal of encouraging them to grow these skills through targeted practice and application activities (Gessell, 2021). We can see this as operating in a customizable set of modes from most- to least-protectred, based on the needs of the assignment/stage of writing. 
- **Undistracted Writing**: Undistracted writing here refers to the purest mode of composition, one in which the student-writer only has access to their immediate knowledgebases, linguistic toolkits, and rhetorical repetiors. In undistracted writing, it is just the student, the WYSIWYG editor, and their embodied cognitive affordances. 
- **Supported Writing**: Supported writing here refers to the act of composing with some form(s) of external cognitive/linguistic affordance(s), such as a source article on a topic, an academic word list, an AI-powered grammar checker (which is all of them post-2013 (Park, 2019)). 
   - **Writing with Resources**: A related sub-concept. Writing with resources serves as a synonym for supported writing and will be used in in-app feedback to the user to signal when they will be able to make selective and limited use of external resources to aid them in their compositional processes. This mode of writing most closely mirrors what professional, technical, and academic writers do in their daily practice. 
- **Overarching Metaphor - The Stoplight**: Users will need to be aware of the overarching metaphor that governs the visual feedback of this application, viz. the stoplight. Composition spaces will be color-coded to provide immediate visual feedback to the user as to whether they're working in "Undistracted" (red light), "Writing with Resources" (yellow light), or "Unrestricted" (green light) modes, akin to the stoplight which signals restricted movement (red light), limited movement (yellow light), and free movement (green light).
- **Professor/Student Selected Resources**: Users will also need to understand what professor and student selected resources are and their role in the composition space/process. Here, their shared property is that they are pre-selected and pre-vetted resources that can be used by a student-writer when an assignment is working in the Writing with Resources mode. The key difference is the source of either being student curated and instructor curated. 
- **Submission Reports**: Users will be need to be aware of the submission reports and how these reports outline any restricted actions that the user attempted to take while making use of the application. 

### Section Ownership
- Primary Owner: J. M. Paiz
- Contributor: Dmitri Stanchevici

## Description of Intended User Experience 
Our app aims for a positive user experience in terms of usability, accessibility and inclusion, and emotional response (Sharpe et al., 2019).

We strive to make our app usable for students. It is effective because students can use it to demonstrate their ability to compose and submit written assignments with no or limited access to external or device-based resources. It is also efficient because it enables students to get down to the composing and the submitting with the minimum necessary clicks. A simple and logical sequence of steps-- composing, consulting allowed resources, and submitting assignments together with an accompanying report--should ensure easy learnability and memorability. Finally, and very importantly, we strive for safety. While the app is unlikely to cause any direct physical harm, it serves as a medium for a high-stakes activity--graded assignments. In case of a system failure, the app assures the student that their composition has been saved and that the student can retrieve it and continue working. If the student clicks submit, the app assures them that the composition has indeed been submitted. If the student performs a disallowed activity, alerts tell the student about an error and provide ways to rectify it.

We try to accommodate students with different abilities and disabilities by allowing to adjust the size of the text and by supporting color-coded messages with written instructions and feedback. Our app also caters to users from various cultural backgrounds by using words for months in dates, as in "February 12" rather than "2/12" or "12/2."

We want students to feel that our app is a timely and competent response to the problem of limited opportunity to develop and demonstrate one’s ability to write without generative AI. The function of our app--to restrict access to advanced tools--may evoke in students a feeling that they have to deal with something oppressive and outdated. To counteract this emotional response, we use a visual design that creates a modern look that may appeal to a younger user (we assume that most students using our app will be young). We also avoid words with a negative connotation in the interface, such as “lockdown.” Instead, we use such words as “independent writing” or “undistracted writing” to create for the student a sense of opportunity and achievement. 

For a more detailed view of the general workflow when using this application, please see the user_journey_general.md file include in the root of this directory.

### Section Ownership
- Primary Ownder: Dmitri Stanchevici
- Contributor: J. M. Paiz

## Project Management
For project management, we utilized a highly collaborative team approach with members sharing roughly equally in the majority of tasks through a primary owner/contributor model. In this model, the primary owner would be responsible for between 51-75% of a given sub-task and contributors expected to contribute the remaining 25-49% of effort. The goal being that, on average, each group member contributed equally to project labor. 

To aid in this, we made regular use of GitHub projects to assign tasks, manage project deliverables, and maintain open, clear communication (see Figures, below, for an early example)

### GitHub Project Dashboard Sample
![Sample GitHub Project Dashboard Screen Grab](./Documentation_Images/project_dashboard_stage0.png "Dashboard Screengrab")

### GitHub Project Assignee Dashboard Sample
![Sample GitHub Project Assignee Screen Grab](./Documentation_Images/assignee_dashboard_stage0.png "Assignee Screengrab")

### Project Management Ownership
- Primary Owner: J. M. Paiz
- Contributor: D. Stanchevici

## Rationale for Bootstrap Selection

For the front-end framework of FOCUSWRITE, we chose Bootstrap over alternatives like Tailwind CSS based on several key factors related to usability, consistency, and ease of implementation.

### Design Considerations & Implications

- Ease of Learning and Implementation: Bootstrap provides a straightforward, well-documented framework with prebuilt components that significantly reduce development time. Unlike Tailwind CSS, which requires extensive customization and manual design decisions, Bootstrap allows us to implement features with minimal configuration, ensuring a shorter learning curve for our team (W3C, 2023).

- Consistency in UI Design: Since our application relies on a structured tabbed navigation system, Bootstrap’s nav-tabs component ensures consistent visual design and interaction patterns across the interface (Nielsen, 1993). This guarantees a predictable and user-friendly experience, reducing cognitive load for users who need to navigate between different writing modes and assignment sections.

- Built-in Accessibility & Responsiveness: Bootstrap adheres to accessibility standards (WCAG) and includes keyboard navigation, ARIA roles, and mobile-first responsiveness (Lidwell, Holden, & Butler, 2023). Given that our app will be used across different devices, Bootstrap’s responsive grid system ensures seamless adaptation to various screen sizes without additional configuration.

- Prebuilt UI Components & Simplified Styling: Bootstrap offers a rich set of UI components, including buttons, modals, and form controls that align with our design needs. By leveraging these predefined styles, we ensure that our app maintains a professional and polished look without requiring extensive custom CSS (Sharp, Rogers, & Preece, 2019).

- Tabbed Interface Implementation: One of the core features of our app is a tabbed workspace that allows users to toggle between different writing environments. Bootstrap’s nav-tabs component provides an out-of-the-box solution for managing tabbed content efficiently, reducing development complexity and ensuring a smooth user transition between writing modes (e.g., Undistracted Writing vs. Writing with Resources) (Bootstrap, n.d.).

### Implications for User Experience

- Improved Usability: Students can navigate tasks efficiently without excessive clicks or complex interactions.

- Enhanced Learnability: Consistent UI patterns reduce the time needed to learn and adapt to the platform.

- Visual Coherence: Predefined styles ensure a modern, professional look without requiring manual fine-tuning.

- Reduced Development Overhead: Faster implementation allows the team to focus on core functionality rather than UI customization.

### Section Ownership
- Primary research owner: J. M. Paiz
- Primary technical owner: Dmitri Stanchevici
- Research and technical contributors: Dmitri Stanchevici, J. M. Paiz

## Documentation Notes
This section outlines early thoughts on what to include in final documentation to be submitted upon project submission.
### Documentation Reqs per Assignment Prompt
- File Name: conceptual_model.pdf
- Front matter: Each group members name on top of page (ABC, Ascending)
- Outline of what users can do - 20%
   - Assigned
- Concepts needed to understand how to interact - 20%
      - Assigned
- Functionality - 20%
- Description of intended user experience - 20%
      - Assigned
- Metaphor and interaction types - 20%

Note for each section be prepared to:
- Justify design decisions
- Discuss possible issues related to course terms (see note below for an example)
- Discuss group members roles/ownership

### Notes
- Discuss the choice of the stop light as metaphor
   - What *inclusivity* issues might exist?
   - What *accessibility issues might exist?
      - What compensating controls have you implemented to attempt to overcome/mitigate these issues (e.g., using web-safe colors).

### Documentation Ownership
- Primary Text Documentation Owner: Dmitri Stanchevici
- Text Documentation Contributor: J. M. Paiz
- Primary Video Documentation Owner: Dmitri Stanchevici & J. M. Paiz
- Primary Video Documentation Editing Owner: J. M. Paiz

## Final List of Functionalities - NEEDS UPDATING
0. Data file structure/storage template (JMP)
1. Functionning Login (DS/JMP)
2. User-controlled body text size (JMP)
3. Dynamic population of assignments and assignment information (JMP)
4. Ability to view resources in-browser during composition (DS)
5. Tabbed composition space (DS)
6. Submission report with ability for student comments (JMP)
7. Grade report dynamically populates from save file (JMP)
8. Ability to save in-progress work (DS)
9. Ability to load in-progress work (DS)
10. WYSIWYG editor (DS)
11. Project documentation/management (JMP)

## File Structure & Responsibilities
### `node_modules/`

This directory contains all of the project’s external dependencies managed by Node.js and defined in `package.json`. It is automatically generated when running `npm install` and includes libraries required for development and runtime support. You should not manually edit any files in this folder.

> **Note**: Since this directory is auto-generated and can be quite large, it is typically excluded from version control using `.gitignore`.

### `public/`

The `public/` directory contains all static files and assets used by the FOCUSWRITE application. This includes HTML pages, styling, scripts, sample files, mock data, and visual documentation.

#### `public/Data/`

This folder contains mock data files that simulate the application's backend behavior. These JSON files allow the front-end interface to interact with pre-defined user accounts, assignments, violation reports, and grading feedback. This enables full testing of features like login, assignment retrieval, writing mode enforcement, and violation tracking—all without needing a live server.

- **`database.json`**  
  The primary mock database used by the application. It stores:
  - **User accounts** with roles (e.g., `student`), hashed passwords, and login metadata.
  - **Assignment records** linked to each user, which include submission status, text content, grading results, and any violations flagged during use of the app (e.g., window/tab switching, copy/paste behavior).
  - **Grading feedback** and scores, including detailed teacher comments and student explanations for violations&#8203;:contentReference[oaicite:0]{index=0}.
  - A global list of **assignment metadata**, including prompts, point values, composition modes (e.g., *Protected Composition*, *Unlocked Composition*), and allowed resources (uploaded files or external links).

- **`starter_db.json`**  
  A clean-slate version of the database file intended for resetting the DB during demonstrations. 

#### `public/Documentation_Images/`

This folder contains image assets used to document the project’s development process, project management strategy, and application interface. These visuals are referenced throughout the `README.md` and accompanying documentation files to provide visual context for the development lifecycle and UX design.

Typical contents include:

- **GitHub Project Board Screenshots**  
  Images like `project_dashboard_stage0.png` and `assignee_dashboard_stage0.png` capture the task distribution and workflow management strategy using GitHub Projects.

- **Interface Snapshots**  
  Screenshots of the live app (e.g., composition editor, resource viewer, submission report screens) used for documentation or walkthroughs.

These images serve as supporting evidence of team collaboration and iterative design and are especially helpful for instructors, reviewers, or future developers working on the codebase.

#### `public/SampleFiles/`

This directory contains PDF documents that serve as sample or instructor-approved resources available to students when completing writing assignments in “Writing with Resources” mode. These files are referenced dynamically by the app during composition sessions and represent realistic materials students may consult in academic settings.

##### Current Files

- **`Gilson_et_al_GAI_and_Medical_Exams.pdf`**  
  A research article evaluating ChatGPT’s performance on U.S. Medical Licensing Exams. The study highlights both the strengths and limitations of large language models in academic testing contexts, proposing implications for medical education&#8203;:contentReference[oaicite:0]{index=0}.

- **`LiteratureReviewPrompt.pdf`**  
  A detailed assignment prompt that guides students in composing a 1,200–1,400-word literature review. It outlines expectations for structure (introduction, body, conclusion), citation format (APA), source requirements, and grading criteria&#8203;:contentReference[oaicite:1]{index=1}.

- **`Warschauer_et_al_Affordances_and_Contradictions.pdf`**  
  A scholarly article analyzing the role of AI-generated text in second language writing. It discusses the affordances and contradictions of tools like ChatGPT for ESL/EFL writers and proposes an AI literacy framework for instructional use&#8203;:contentReference[oaicite:2]{index=2}.

These files are preloaded into the application as exemplars of the types of academic and pedagogical content students may access during protected composition tasks. Their inclusion allows the application to realistically simulate limited-access writing conditions while supporting authentic academic engagement.

#### `public/Scripts/`

This folder contains all the JavaScript files that support the interactive and dynamic behavior of the FOCUSWRITE application. These scripts manage core app functionality such as user authentication, assignment navigation, writing interface behavior, violation tracking, and UI elements like modals and accessibility controls.

##### File Breakdown

- **`login.js`**  
  Handles user login logic, including basic validation and storage of session credentials.

- **`logout.js`**  
  Clears session data and returns the user to the login interface.

- **`landing.js`**  
  Manages post-login navigation and loads relevant user data (e.g., upcoming assignments, system messages) onto the landing page.

- **`task.js`**  
  Controls the main assignment workspace. Loads assignment content, monitors writing mode settings, and handles data persistence for user submissions.

- **`reports.js`**  
  Generates and displays the submission report. Pulls from logged violations (e.g., copy/paste attempts, window switching) and appends student comments.

- **`additionalResourcesModal.js`**  
  Manages the modal window that allows students to view teacher- or student-approved resources when in “Writing with Resources” mode.

- **`modal_scripts.js`**  
  Provides shared modal logic and event bindings used across multiple HTML views.

- **`font_slider.js`**  
  Enables real-time font size adjustment for accessibility. Responds to user input and stores preferences locally.

- **`contents.txt`**  
  A developer-facing index describing the purpose of each script file in the folder&#8203;:contentReference[oaicite:0]{index=0}.

These scripts work together to deliver a seamless and secure writing experience, dynamically adapting the interface based on user role, writing mode, and system feedback.

#### `public/Styles/`

This directory contains all custom CSS stylesheets used to define the look and feel of the FOCUSWRITE interface. These styles enhance the Bootstrap foundation with tailored rules for layout, interactivity, accessibility, and assignment-specific components.

##### File Breakdown

- **`landing_styles.css`**  
  Contains layout and design enhancements for the student landing page and dashboard. Defines styles for card components, primary/secondary buttons, and list formatting to improve user experience and visual clarity&#8203;:contentReference[oaicite:0]{index=0}.

- **`report_styles.css`**  
  Customizes the look of the submission report interface, including card headers, Bootstrap accordion components, and a consistent color scheme. Defines `.custom-accordion` to override default Bootstrap variables and control UI spacing&#8203;:contentReference[oaicite:1]{index=1}.

- **`font_slider.css`**  
  Styles the dynamic font size adjustment slider, ensuring usability and full responsiveness. Also includes rules for flexible UI elements such as `.w-33` and hover states for expandable sections (e.g., accordions)&#8203;:contentReference[oaicite:2]{index=2}.

- **`contents.txt`**  
  Developer-facing notes describing the purpose of each stylesheet and its role in the app's visual theming&#8203;:contentReference[oaicite:3]{index=3}.

These stylesheets work in tandem with Bootstrap to ensure the application is accessible, visually consistent, and responsive across screen sizes and composition modes.

#### Static HTML Files (`public/`)

The root of the `public/` directory contains several static HTML pages that drive the main user interface of the FOCUSWRITE application. These files define the structure and layout of the login flow, task environment, violation report viewer, and development/test views.

##### Main Application Views

- **`index.html`**  
  The login interface where students enter their email and password to authenticate. Includes basic form validation, accessibility features, and developer-provided default values for testing&#8203;:contentReference[oaicite:0]{index=0}.

- **`landing.html`**  
  The main dashboard students see after logging in. Displays a list of available, submitted, and graded assignments, and uses modals to show detailed assignment info before redirecting users to begin writing&#8203;:contentReference[oaicite:1]{index=1}.

- **`task.html`**  
  The core writing environment. This page includes a fullscreen WYSIWYG editor, assignment instructions, resource accordions (prompt, uploaded files, external links), font size slider, and modals for submission confirmation and violation handling&#8203;:contentReference[oaicite:2]{index=2}.

- **`submission_report.html`**  
  Displays post-assignment submission reports, including grading feedback and logs of any violations (e.g., fullscreen exits, copy/paste attempts). Students can review and comment on these logs before final submission&#8203;:contentReference[oaicite:3]{index=3}.

##### Development & Experimental Files

- **`tabbed_test1.html`**  
  A prototype interface using horizontal tab navigation for composing assignments, reviewing prompts, and accessing allowed resources&#8203;:contentReference[oaicite:4]{index=4}.

- **`tabbed_test2.html`**  
  An alternative prototype using vertical tab (pill) navigation with a sidebar layout for similar functions as `tabbed_test1.html`&#8203;:contentReference[oaicite:5]{index=5}.

- **`test.html`**  
  A humorous and informal page used for development testing. Serves as a visual placeholder and redirect confirmation screen, with stylized messages and placeholder images for UI feedback&#8203;:contentReference[oaicite:6]{index=6}.

These HTML files are progressively enhanced with Bootstrap for layout and responsiveness and are wired to JavaScript in `/public/Scripts/` to

#### `Version_0_Files/`

This directory contains early static prototypes of the FOCUSWRITE application. These HTML files represent initial interface concepts developed during the design phase of the project, before dynamic scripting and data integration were implemented.

##### File Breakdown

- **`demo.html`**  
  A general prototype of the writing interface demonstrating layout and design ideas for the composition space.

- **`lockdown_demo.html`** and **`lockdown_demo_2.html`**  
  Early conceptual mockups of the “Undistracted Writing” mode interface, including fullscreen warnings and restricted UI elements. Helped shape the eventual secure writing environment seen in `task.html`.

- **`alt_demo.html`**  
  An alternative layout exploration experimenting with different UI/UX metaphors and navigation logic.

These files are not used in the final application but are preserved as part of the design history and iterative prototyping process.

#### `candidate_app_names.md`

A brainstorming document created during the initial phase of the project. It contains a list of potential names for the application, reflecting early ideation around branding, user experience themes, and metaphor selection.

While not used in the final implementation, this file provides insight into the project’s creative development process and the evolution of the app's identity—eventually landing on the name **FOCUSWRITE** to emphasize undistracted, independent writing.

#### `package.json` and `package-lock.json`

These files define and lock the dependencies for the FOCUSWRITE project.

- **`package.json`**  
  Specifies the metadata for the project (e.g., project name, version, description) and lists the required dependencies and scripts used in development or deployment. It serves as the blueprint for reproducing the app’s environment via `npm install`.

- **`package-lock.json`**  
  Automatically generated by npm to lock exact versions of every installed package and their dependencies. Ensures consistency across development environments and prevents version drift.

These files are essential for managing the Node.js project lifecycle, particularly when testing the app locally or deploying it with consistent behavior.

#### `server.js`

A lightweight Express.js server used to serve static files and simulate backend functionality for the FOCUSWRITE application. It supports several API endpoints to interact with the mock database (`database.json`), making it possible to test app behavior without deploying a full backend.

##### Key Features

- **Static File Serving**  
  Hosts the contents of the `/Public` directory, including HTML, CSS, JS, and resource files.

- **API Endpoints**  
  - `GET /api/database`  
    Returns the full contents of the current mock database as a JSON object for use by front-end scripts.

  - `POST /api/submit`  
    Receives assignment submission data from the student writing interface. Updates the `database.json` file with the student's written response, submission timestamp, violation logs, and a placeholder grading record.

  - `POST /api/violation-comment`  
    Accepts a comment from the student about a specific violation and appends it to the corresponding violation object in the database.

  - `POST /update`  
    A generic endpoint used during early testing to confirm that submitted text could be received and logged.

##### Development Use

This server is meant for local development and testing only. It simulates backend behavior through file I/O using Node’s built-in `fs` module to read and write to `database.json`. No authentication, session handling, or persistent storage is implemented beyond file edits.

#### `user_journey_general.md` and `user_journey_detailed.pdf`

These documents describe the intended user flow through the FOCUSWRITE application, from login to assignment submission, and help ground the interface design in the lived experience of student users.

- **`user_journey_general.md`**  
  A written narrative outlining the overall workflow of a student using the application. It covers stages such as logging in, selecting an assignment, composing a response in different writing modes, and reviewing feedback. This file offers a high-level overview for readers who want to understand the pedagogical arc of the app.

- **`user_journey_detailed.pdf`**  
  A visual user journey map organized into six key phases: *Aware*, *Authenticate*, *Task Selection*, *Instruct*, *Protected Composition*, and *Supported Composition*. For each stage, the diagram identifies:
  - The user’s goals and actions
  - The platform being used (e.g., laptop, in-person)
  - Potential barriers or challenges (e.g., confusion over login, formatting limitations, anxiety over restricted tools)
  - Design implications and instructional strategies

  This document serves as a user-centered design artifact, helping the development team anticipate user friction points and design for clarity, support, and accessibility&#8203;:contentReference[oaicite:0]{index=0}.

#### Section Ownership
- J. M. Paiz


## Launching & Testing the Application

To run the FOCUSWRITE application locally for development or demonstration purposes, follow the instructions below. This app uses Node.js with Express to serve static files and simulate backend logic through a local JSON file.

### Prerequisites

- Node.js (v16 or higher)
- A terminal or command-line interface

### Quick Start

1. Clone the repository:

   ```
   git clone https://github.com/Naoru347/csci6561_hci_group_project.git
   cd csci6561_hci_group_project
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. (Optional) Reset the mock database:

   If you wish to reset the application to a fresh state, copy the starter file:

   ```
   cp ./Public/Data/starter_db.json ./Public/Data/database.json
   ```

4. Start the server:

   ```
   node server.js
   ```

5. Open your browser and visit:

   ```
   http://localhost:3000
   ```

### Test User Credentials

The app comes preloaded with mock users in `database.json`. Use the following credentials to log in and explore functionality:

| Name           | Email                   | Password            | Notes                                               |
|----------------|-------------------------|----------------------|-----------------------------------------------------|
| Test User      | testuser@example.com    | hashedpassword123    | Has 5 assignments, 3 submitted, 2 graded            |
| Diana Troi     | exampleuser@example.com | hashedpassword456    | All assignments available, none submitted           |
| Rey Skywalker  | sampleuser@example.com  | password             | 3 assignments in progress, 1 graded, 1 in review    |

Once logged in, you'll be taken to the Landing Page where you can:
- View assignment details (available, submitted, and graded)
- Begin a new writing task with mode-specific access controls
- Interact with the Protected Composition or Unlocked Composition modes
- Submit your assignment and review your Violation Report
- Add comments to any flagged violations during writing

### Data Persistence & Editing

All data (e.g., assignment responses, violation logs, student comments) are saved to:

```
/Public/Data/database.json
```

To start fresh or debug:
- Use `starter_db.json` as a clean backup
- Delete or modify existing entries manually as needed

### Caution

- This app does not implement real user authentication or password hashing. It is intended for demonstration only.
- Do not deploy this server to production without significant modifications and security hardening.

#### Section Ownership
- J. M. Paiz


## References

- Bootstrap. (2024). *Introduction to Bootstrap 5*. https://getbootstrap.com/docs/5.3/getting-started/introduction/
- Bootstrap. (n.d.). *Introduction*. https://getbootstrap.com/docs/5.2/getting-started/introduction/
- Copenhagen Business School. (2022). *Scholarly composition*. Library of the Copenhagen Business School. https://inframethodology.cbs.dk/?p=5065
- GeeksforGeeks. (n.d.). *Bootstrap*. https://www.geeksforgeeks.org/bootstrap/
- Gessell, B. (2021). *Deliberate practice for academic writers: A three-step process to improve academic writing*. Writing is Thinking. https://writingisthinking.com/wp-content/uploads/2021/05/Deliberate-Practice-Part-3-Bryce-Gessell.pdf
- Krug, S. (2014). *Don't make me think, revisited: A common sense approach to web usability* (3rd ed.). New Riders.
- Lidwell, W., Holden, K., & Butler, J. (2023). *Universal principles of design*. Rockport Publishers.
- Mozilla Developer Network (MDN). (n.d.). *HTML: HyperText Markup Language*. https://developer.mozilla.org/en-US/docs/Web/HTML
- Nielsen, J. (1993). *Usability engineering*. Morgan Kaufmann.
- Norman, D. A. (2013). *The design of everyday things: Revised and expanded edition*. Basic Books.
- Sharp, H., Rogers, Y., & Preece, J. (2019). *Interaction design: Beyond human-computer interaction* (6th ed.). Wiley.
- Sweller, J. (1988). Cognitive load during problem solving: Effects on learning. *Cognitive Science, 12*(2), 257–285. https://doi.org/10.1207/s15516709cog1202_4
- TinyMCE. (n.d.). *What is TinyMCE*. Tiny Cloud Docs. https://www.tiny.cloud/docs/tinymce/latest/introduction-to-tinymce/
- W3C. (2023). *Web Content Accessibility Guidelines (WCAG) 2.2*. https://www.w3.org/WAI/standards-guidelines/wcag/
- W3Schools. (n.d.). *Bootstrap 5 Tutorial*. https://www.w3schools.com/bootstrap5/index.php
- Warschauer, M., Liaw, M.-L., & Markham, P. (2022). Affordances and contradictions of AI writing tools in second language writing. *TESOL Journal, 13*(4),
