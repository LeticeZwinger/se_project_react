
# [Project WTWR (What to Wear?)](https://leticezwinger.com/)

# Table of Contents

# Description

A full-stack web app that helps users save outfits and decide what to wear based on the weather. Built with React, Node.js, and MongoDB, featuring user authentication, dynamic weather-based item suggestions, and responsive design.

This is a Triple10 web dev program project. In this project we practice:

- Built a responsive web app using HTML, CSS and semantic markup
- Design layouts using CSS Grid
- implement media queries for mobile responsiveness
- Integrate RESTful APIs for dynamic weather-based content
- Deploy the full-stack application on a virtual machine (VM) using Google Cloud Platform (GCP)
- Configure a custom domain to host the live project online

![desktop-view](/src/assets/wtwr.png)

# API

Posts are saved into [MongoDB](https://www.mongodb.com/) database and implemented API calls from [OpenWeather](https://openweathermap.org/):

* PUT : DELETE - updateLikeStatus = (itemId, isLiked)

* POST - const addItem = (name, imageURL, weatherType) 

* DETELE - const deleteItem = (itemId)



# Deploy

	Install Dependencies
	• npm install

	Development Mode
	• npm run dev

	Production Build
	• npm run build

	Deploying
	• npm run deploy
	

# System Requirements

* Node.js: v18.0.0 or later
* npm: v8.0.0 or later (or an equivalent package manager)
* Vite: Used for bundling and local development (installed as a dev dependency)



# Plugins
Vite
• vite v5.3.4 – A next-generation frontend build tool that provides fast development and optimized production builds.
• @vitejs/plugin-react v4.3.1 – A Vite plugin that integrates React, enabling fast refresh and improving the development experience.

ESLint
• eslint v8.57.0 – A highly configurable linter for JavaScript/TypeScript that helps catch errors and enforce code quality.
• eslint-plugin-react v7.34.3 – Provides React-specific linting rules to enforce best practices and maintain consistency in your React components.
• eslint-plugin-react-hooks v4.6.2 – Ensures proper usage of React Hooks by enforcing the rules around hook usage.
• eslint-plugin-react-refresh v0.4.7 – Enhances the development experience by integrating React Fast Refresh into your linting workflow.

Deployment
• gh-pages v6.3.0 – Automates the deployment process, making it easier to publish your built project to GitHub Pages.



# [Video Demo](https://youtu.be/TOht5NQbq64)

# [Figma Design](https://www.figma.com/design/dQLJwEKasIdspciJAJrCaf/Sprint-11_-WTWR?node-id=311-433&p=f&t=8heaDjekYZaoSaKv-0)
