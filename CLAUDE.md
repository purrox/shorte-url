# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a URL shortener application built with Node.js/Express backend and React frontend. The application uses an in-memory SQLite database and follows a component-based architecture.

## Key Commands

### Development
- `npm run install` - Install dependencies for both backend and frontend
- `npm start` - Start development server with nodemon
- `npm run serve` - Build frontend and run in production mode

### Frontend (reva-fe directory)
- `cd reva-fe && npm start` - Start React development server
- `cd reva-fe && npm run build` - Build React app for production
- `cd reva-fe && npm test` - Run React tests

## Architecture

### Backend Structure
- **app.js** - Main Express application setup with CORS, body parsing, and static file serving
- **components/url/** - URL shortening module following MVC pattern:
  - **controller.js** - Request handlers for URL operations (create, redirect, find)
  - **service.js** - Business logic layer with database operations
  - **model.js** - Sequelize model definition with URL validation and hash generation
  - **routes.js** - Express route definitions
  - **helper.js** - Utility functions (likely hash generation)
- **dataBaseConfiguration.js** - SQLite in-memory database setup with Sequelize
- **bin/www** - Express server startup script

### Frontend Structure
- **reva-fe/** - React application with routing and Bootstrap UI
- **src/view/** - React components organized by page (home, stats, notFound)

### Key Technical Details
- Uses singleton pattern for controllers and services
- Implements URL validation by attempting HTTP requests to target URLs
- Tracks visit counts for shortened URLs
- Hash generation occurs after database record creation via Sequelize hooks
- Production mode serves React build files through Express static middleware

### Database Schema
- **url** table with fields: id, hash, url, visited (default 1), is_valid (default true)
- Unique constraints on both hash and url fields
- Auto-incrementing ID used for hash generation

## Development Notes

- Backend runs on port 3000 (default Express)
- Frontend development server proxies to backend via package.json proxy setting
- Uses nodemon for development hot-reloading
- SQLite database is in-memory, so data is lost on server restart