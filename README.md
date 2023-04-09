# Functional and technological specification

### Functional:
We aim to create a website that people can use to find suitable toilets on the move. The insperation for the service  Tripadvisor and Google Maps. We aim to create something similar but with focus on toilets. The main function of the website is a map where nearby toilets are displayed as markers, when a marker is pressed some quickinfo using tags and icons about the toilet should be displayed. More elaborate info together with reviews are then displayed on a page you go to by pressing the quickinfobox. The user can then if logged in also add there own reviews.

### Technological:

- React
- Nextjs
- Typescript
- Leaflet
- ChakraUi
- Vercel
- Prisma
- Supabase

##### Client Framework: React and Next.js
React is a popular JavaScript library used for building user interfaces, while Next.js is a framework built on top of React that adds features such as server-side rendering and automatic code splitting. Using React and Next.js will allow us to build a fast and responsive web application with a seamless user experience.

##### Mapping Framework: Leaflet
Leaflet is a JavaScript library for creating interactive maps. With React Leaflet we also get react components for leaflet maps which we will use Leaflet to display nearby toilets on the map as markers and allow users to interact with them.

##### UI Framework: Chakra UI
Chakra UI is a simple and modular component library for building user interfaces. It has a wide range of customizable components that will enable us to create a consistent and visually appealing design for our website.

##### Hosting Service: Vercel
Vercel is a cloud-based hosting service for web applications. It supports serverless functions and provides automatic deployment and scaling. We will use Vercel to deploy and host our website.

##### Backend Framework: Prisma
Prisma is a modern database toolkit that provides an ORM (Object Relational Mapping) layer to interact with databases. It simplifies database management and provides a type-safe API that can be used with TypeScript. We will use Prisma to interact with our database.

##### Database Service: Supabase
Supabase is an open-source alternative to Firebase that provides a range of services including real-time data updates and authentication. We will use Supabase to store our toilet data and user authentication information.
