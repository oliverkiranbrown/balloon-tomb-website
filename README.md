# Balloon Tomb Website

## Aim of Project

First 'full stack' website for a band. Build from a standard Next.js template, using [Pixelact-ui](https://www.pixelactui.com/) for some gorgous retro/8-bit styling to match the band asthetic. 

## Tech Stack

Goal for this project was to become familiar with key fundamentals of modern full stack development and deployment (in preparation for a more ambitious personal project down the road). 

**Technologies employed**:
- Next.js framework (TypeScript) with the App Router API.
- PostgreSQL database for data storage (pgAdmin to view user submitted data locally)
- Containerised application with Docker. Used docker-compose to spin up a container for both the db and app. 
- Using nginx for a reverse proxy to route internet traffic the VPS-hosted website. 

**Development Requirements**
- docker
- (Optionally) docker desktop
- (Optionally) pgAdmin

## Getting started with development

Simply run 




## Helpful Docker commands

```sh
# Build container from scratch and put in watch mode
docker compose up --build
```