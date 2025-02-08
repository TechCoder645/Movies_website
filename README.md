# 🎬 Movies Website

A modern and responsive movies website built with React, Redux Toolkit, and Tailwind CSS. Browse, search, and explore your favorite movies with an intuitive user interface.

## 🚀 Features

- Modern and responsive design
- Movie browsing and searching
- Infinite scroll for seamless browsing
- Video player integration
- Redux state management
- Responsive UI with Tailwind CSS
- Smooth animations with Framer Motion
- Fetch real-time movie data using Axios from the TMDB API

## 🛠️ Technologies Used

- React 18
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Framer Motion
- Axios
- React Player
- React Icons
- Vite

## 🔗 API Used

This project uses Axios to fetch data from the TMDB (The Movie Database) API, which provides movie details, posters, and other related information.

### Getting API Key

1. Go to TMDB
2. Sign up for an account
3. Generate an API key from the Developer section
4. Add your API key in the `axios` file as follows:

## 🔌 Axios Configuration

The project uses an axios instance for API requests. The configuration is stored in `axios.js`:

```javascript
import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
  }
});

export default instance;
```

## 📦 Installation

### Prerequisites

- Ensure you are connected to a VPN before running the project to successfully fetch movie data.
- Node.js and npm must be installed on your system.

### Steps to Run the Project

1. Clone the repository:
```bash
git clone https://github.com/TechCoder645/Movies_website.git
cd Movies_website
```

2. Install dependencies:
```bash
npm install
```

3. Create a `axios.jsx` file  and add your TMDB API Key:
```
VITE_TMDB_API_KEY=your_api_key_here
```

4. Start the development server (Ensure your VPN is active):
```bash
npm run dev
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

TechCoder645

## 🙏 Acknowledgments

- React Team
- Redux Team
- Tailwind CSS Team
- TMDB API
- All other open-source contributors
