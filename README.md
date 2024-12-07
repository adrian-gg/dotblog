# dotBlog

Locate articles and breaking news headlines from news sources and blogs across the web with dotBlog. (This is a project for a technical test)

## 💻 Technologies Used

- **Frontend:**
  - [React](https://reactjs.org/)
  - [Typescript](https://www.typescriptlang.org/)
  - [Zustand](https://github.com/pmndrs/zustand)
- **API:**
  - [News API](https://newsapi.org/)
- **Version Control:**
  - [Git](https://git-scm.com/)

## 📋 Prerequisites

Before you start, make sure you have the following installed:

- Node.js
- npm (Node Package Manager)

## ⚙️ Installation and Usage

1. Clone the repository:

   ```bash
   git clone https://github.com/adrian-gg/dotblog.git
   ```

2. Navigate to the project directory:

   ```bash
   cd dotblog
   ```

3. Install the dependencies:

   ```bash
    npm install
   ```

4. Generate an API Key at [News API](https://newsapi.org/register) and add it to `./src/services/apiService.ts`.

5. Start the application in development mode:

   ```bash
   npm run dev
   ```

Open http://localhost:3000 in your browser to see the application.

## 📝 Additional Notes

- The demo of this project uses articles from a local file. To use the API, you need to generate an API Key at [News API](https://newsapi.org/register) and add it to `./src/services/apiService.ts`.
