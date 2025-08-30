# Valence - Green Hydrogen Infrastructure Mapping and Optimization
### A secure, private, and interactive map-based application for visualizing, managing, and analyzing personal green energy assets alongside public infrastructure data like pipelines and regulatory zones.

---

## Overview  
Valence is a map-based tool designed to help **urban planners, energy companies, project developers, and policy analysts** identify optimal locations for growing the hydrogen ecosystem.  

The application visualizes **existing and planned hydrogen assets** (plants, storage facilities, pipelines, distribution hubs) and integrates data-driven models to recommend new project sites.  

By combining **geospatial visualization with renewable energy data and optimization algorithms**, Valence guides investment decisions that support sustainable hydrogen infrastructure development.


## Features  

- **Interactive Map** – Visualize hydrogen plants, pipelines, storage hubs, and demand centers.  
- **Data Integration** – Overlay renewable energy sources, transport logistics, and market demand.  
- **Optimization Engine** – Recommend new sites based on:  
  - Proximity to renewable generation  
  - Market demand  
  - Regulatory constraints  
  - Cost optimization  
- **Data Input** – Ingest CSV datasets for infrastructure and renewable energy.  
- **Filtering & Search** – Explore assets by type, region, or development stage.  
- **Scalable Backend** – Built with Node.js & Express.js for API handling.  
- **Database** – MongoDB Atlas stores asset and configuration data.  


## Tech Stack  

### Frontend:
- [Next.js](https://nextjs.org/) – React framework for SSR & routing  
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first styling  
- [TypeScript](https://www.typescriptlang.org/) – Type-safe development  

### Backend: 
- [Node.js](https://nodejs.org/)  (v18.x or later)
- [Express.js](https://expressjs.com/)  

### Database:
- [MongoDB Atlas](https://www.mongodb.com/atlas)  

### Data Sources:
- CSV files for infrastructure, renewable energy sources, and demand datasets  


## Getting Started  

### Clone the Repository  
```bash
git clone https://github.com/VandanKambodi/Valence.git
cd Valence
```

### Install Dependencies
```
npm install
```

### Set up Environment Variables
- Create a .env.local file in the project root.
```
MONGODB_URI=your_mongodb_atlas_connection_string
NEXTAUTH_SECRET=your_mapbox_api_key
GEMINI_API_KEY=your_chat_api
```

### Run the Development Server
```
npm run dev
```
#### Open http://localhost:3000 to view the application.

## Folder Structure
```

Valence
├── public/
└── src/
    ├── app/
    │   ├── (app)/          # PROTECTED application routes (require login)
    │   │   ├── layout.tsx
    │   │   ├── map/
    │   │   ├── dashboard/
    │   │   ├── profile/
    │   │   └── add-asset/
    │   │
    │   ├── api/            # Backend API routes
    │   │   ├── assets/
    │   │   ├── infrastructure/
    │   │   ├── regulatory-zones/
    │   │   ├── auth/
    │   │   └── signup/
    │   │
    │   ├── login/
    │   ├── signup/
    │   │
    │   ├── layout.tsx      # Root layout
    │   └── page.tsx        # Public landing page
    │
    ├── components/         # Reusable React components
    │   ├── ControlSidebar.tsx
    │   ├── Header.tsx
    │   ├── Map.tsx
    │   ├── MapLoader.tsx
    │   └── UserButton.tsx
    │
    ├── lib/                # Utility functions (db connection, data fetching)
    │   ├── data.ts
    │   └── mongodb.ts
    │
    ├── models/             # Mongoose schemas
    │   ├── Asset.ts
    │   └── User.ts
    │
    ├── types/              # TypeScript type definitions
    │   └── next-auth.d.ts
    │
    └── middleware.ts       # Route protection security

```

## Data Handling

- Input datasets are provided in CSV format.

- Data is parsed and stored in MongoDB Atlas.

- The map visualizes data layers dynamically via API.

## Demo / Screenshots

- Video

## Contributing

- Contributions are welcome! To contribute:

### Fork the repository

- Create a feature branch (git checkout -b feature/new-feature)

- Commit your changes (git commit -m "Add new feature")

- Push to the branch (git push origin feature/new-feature)

- Open a Pull Request

## License

- Distributed under the MIT License. See LICENSE for more details.

## Contact

- Project Owners: gitPushForce Team

- Project Link: Valence GitHub Repo
