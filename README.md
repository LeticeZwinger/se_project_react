
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

Posts are saved into [OpenWeather](https://openweathermap.org/) database via implemented API calls:

* PUT : DELETE - updateLikeStatus = (itemId, isLiked)

* POST - const addItem = (name, imageURL, weatherType) 

* DETELE - const deleteItem = (itemId)



# Deploy

	Install Dependencies
	•	npm install

	Development Mode
	•	npm run dev

	Production Build
	•      npm run build

	Deploying
	•	npm run deploy
	

# System Requirements

* Node.js: v18.0.0 or later
* npm: v8.0.0 or later (or an equivalent package manager)
* Vite: Used for bundling and local development (installed as a dev dependency)



# Plugins
* @vitejs/plugin-react: Enables React fast refresh and JSX transformation in Vite
  
	ESLint Plugins:
* eslint-plugin-react
* eslint-plugin-react-hooks
* eslint-plugin-react-refresh



# [Video Demo](https://youtu.be/TOht5NQbq64)

# [Figma Design](https://www.figma.com/design/dQLJwEKasIdspciJAJrCaf/Sprint-11_-WTWR?node-id=311-433&p=f&t=8heaDjekYZaoSaKv-0)
