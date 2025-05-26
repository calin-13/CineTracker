import React, { useState, useEffect } from 'react';
import './App.css';

// Expanded movie database with cast and descriptions
const MOCK_MOVIES = [
    {
        id: 1,
        title: "The Shawshank Redemption",
        year: 1994,
        poster: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
        rating: 0,
        cast: "Tim Robbins, Morgan Freeman, Bob Gunton",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
    },
    {
        id: 2,
        title: "The Godfather",
        year: 1972,
        poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
        rating: 0,
        cast: "Marlon Brando, Al Pacino, James Caan",
        description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son."
    },
    {
        id: 3,
        title: "The Dark Knight",
        year: 2008,
        poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
        rating: 0,
        cast: "Christian Bale, Heath Ledger, Aaron Eckhart",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice."
    },
    {
        id: 4,
        title: "Pulp Fiction",
        year: 1994,
        poster: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
        rating: 0,
        cast: "John Travolta, Uma Thurman, Samuel L. Jackson",
        description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
    },
    {
        id: 5,
        title: "Inception",
        year: 2010,
        poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
        rating: 0,
        cast: "Leonardo DiCaprio, Marion Cotillard, Elliot Page",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
    },
    {
        id: 6,
        title: "Fight Club",
        year: 1999,
        poster: "https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
        rating: 0,
        cast: "Brad Pitt, Edward Norton, Helena Bonham Carter",
        description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more."
    },
    {
        id: 7,
        title: "The Matrix",
        year: 1999,
        poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
        rating: 0,
        cast: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
        description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers."
    },
    {
        id: 8,
        title: "Interstellar",
        year: 2014,
        poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
        rating: 0,
        cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
    },
    {
        id: 9,
        title: "Parasite",
        year: 2019,
        poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
        rating: 0,
        cast: "Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong",
        description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan."
    },
    {
        id: 10,
        title: "The Lord of the Rings: The Return of the King",
        year: 2003,
        poster: "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00MjczLWIxOTctZmI0MDFjNTk5YzVjXkEyXkFqcGdeQXVyMTU5OTA4NTIz._V1_SX300.jpg",
        rating: 0,
        cast: "Elijah Wood, Viggo Mortensen, Ian McKellen",
        description: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring."
    },
    {
        id: 11,
        title: "Forrest Gump",
        year: 1994,
        poster: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        rating: 0,
        cast: "Tom Hanks, Robin Wright, Gary Sinise",
        description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75."
    },
    {
        id: 12,
        title: "The Silence of the Lambs",
        year: 1991,
        poster: "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
        rating: 0,
        cast: "Jodie Foster, Anthony Hopkins, Scott Glenn",
        description: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer."
    },
    {
        id: 13,
        title: "Saving Private Ryan",
        year: 1998,
        poster: "https://m.media-amazon.com/images/M/MV5BZjhkMDM4MWItZTVjOC00ZDRhLThmYTAtM2I5NzBmNmNlMzI1XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg",
        rating: 0,
        cast: "Tom Hanks, Matt Damon, Tom Sizemore",
        description: "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action."
    },
    {
        id: 14,
        title: "The Green Mile",
        year: 1999,
        poster: "https://m.media-amazon.com/images/M/MV5BMTUxMzQyNjA5MF5BMl5BanBnXkFtZTYwOTU2NTY3._V1_SX300.jpg",
        rating: 0,
        cast: "Tom Hanks, Michael Clarke Duncan, David Morse",
        description: "The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift."
    },
    {
        id: 15,
        title: "Spirited Away",
        year: 2001,
        poster: "https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
        rating: 0,
        cast: "Rumi Hiiragi, Miyu Irino, Mari Natsuki",
        description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, where humans are changed into beasts."
    },
    {
        id: 16,
        title: "The Prestige",
        year: 2006,
        poster: "https://m.media-amazon.com/images/M/MV5BMjA4NDI0MTIxNF5BMl5BanBnXkFtZTYwNTM0MzY2._V1_SX300.jpg",
        rating: 0,
        cast: "Christian Bale, Hugh Jackman, Scarlett Johansson",
        description: "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other."
    },
    {
        id: 17,
        title: "Whiplash",
        year: 2014,
        poster: "https://m.media-amazon.com/images/M/MV5BOTA5NDZlZGUtMjAxOS00YTRkLTkwYmMtYzY0OWEwZGUyZjlhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
        rating: 0,
        cast: "Miles Teller, J.K. Simmons, Melissa Benoist",
        description: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential."
    },
    {
        id: 18,
        title: "The Departed",
        year: 2006,
        poster: "https://m.media-amazon.com/images/M/MV5BMTI1MTY2OTIxNV5BMl5BanBnXkFtZTYwNjQ4NjY3._V1_SX300.jpg",
        rating: 0,
        cast: "Leonardo DiCaprio, Matt Damon, Jack Nicholson",
        description: "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston."
    },
    {
        id: 19,
        title: "Gladiator",
        year: 2000,
        poster: "https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
        rating: 0,
        cast: "Russell Crowe, Joaquin Phoenix, Connie Nielsen",
        description: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery."
    },
    {
        id: 20,
        title: "The Lion King",
        year: 1994,
        poster: "https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_SX300.jpg",
        rating: 0,
        cast: "Matthew Broderick, James Earl Jones, Jeremy Irons",
        description: "Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself."
    },
    {
        id: 21,
        title: "Goodfellas",
        year: 1990,
        poster: "https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
        rating: 0,
        cast: "Robert De Niro, Ray Liotta, Joe Pesci",
        description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito."
    },
    {
        id: 22,
        title: "Django Unchained",
        year: 2012,
        poster: "https://m.media-amazon.com/images/M/MV5BMjIyNTQ5NjQ1OV5BMl5BanBnXkFtZTcwODg1MDU4OA@@._V1_SX300.jpg",
        rating: 0,
        cast: "Jamie Foxx, Christoph Waltz, Leonardo DiCaprio",
        description: "With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal plantation-owner in Mississippi."
    },
    {
        id: 23,
        title: "The Usual Suspects",
        year: 1995,
        poster: "https://m.media-amazon.com/images/M/MV5BYTViNjMyNmUtNDFkNC00ZDRlLThmMDUtZDU2YmI2OTY4NTM5XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        rating: 0,
        cast: "Kevin Spacey, Gabriel Byrne, Chazz Palminteri",
        description: "A sole survivor tells of the twisty events leading up to a horrific gun battle on a boat, which began when five criminals met at a seemingly random police lineup."
    },
    {
        id: 24,
        title: "Se7en",
        year: 1995,
        poster: "https://m.media-amazon.com/images/M/MV5BOTUwODM5MTctZjczMi00OTk4LTg3NWUtNmVhMTAzNTNjYjcyXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
        rating: 0,
        cast: "Brad Pitt, Morgan Freeman, Gwyneth Paltrow",
        description: "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives."
    },
    {
        id: 25,
        title: "City of God",
        year: 2002,
        poster: "https://m.media-amazon.com/images/M/MV5BMGU5OWEwZDItNmNkMC00NzZmLTk1YTctNzVhZTJjM2NlZTVmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
        rating: 0,
        cast: "Alexandre Rodrigues, Leandro Firmino, Matheus Nachtergaele",
        description: "In the slums of Rio, two kids' paths diverge as one struggles to become a photographer and the other a kingpin."
    },
    {
        id: 26,
        title: "The Pianist",
        year: 2002,
        poster: "https://m.media-amazon.com/images/M/MV5BOWRiZDIxZjktMTA1NC00MDQ2LWEzMjUtMTliZmY3NjQ3NDE4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
        rating: 0,
        cast: "Adrien Brody, Thomas Kretschmann, Frank Finlay",
        description: "A Polish Jewish musician struggles to survive the destruction of the Warsaw ghetto of World War II."
    },
    {
        id: 27,
        title: "Memento",
        year: 2000,
        poster: "https://m.media-amazon.com/images/M/MV5BZTcyNjk1MjgtOWI3Mi00YzQwLWI5MTktMzY4ZmI2NDAyNzYzXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
        rating: 0,
        cast: "Guy Pearce, Carrie-Anne Moss, Joe Pantoliano",
        description: "A man with short-term memory loss attempts to track down his wife's murderer."
    },
    {
        id: 28,
        title: "The Intouchables",
        year: 2011,
        poster: "https://m.media-amazon.com/images/M/MV5BMTYxNDA3MDQwNl5BMl5BanBnXkFtZTcwNTU4Mzc1Nw@@._V1_SX300.jpg",
        rating: 0,
        cast: "François Cluzet, Omar Sy, Anne Le Ny",
        description: "After he becomes a quadriplegic from a paragliding accident, an aristocrat hires a young man from the projects to be his caregiver."
    },
    {
        id: 29,
        title: "Modern Times",
        year: 1936,
        poster: "https://m.media-amazon.com/images/M/MV5BYjJiZjMzYzktNjU0NS00OTkxLWEwYzItYzdhYWJjN2QzMTRlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
        rating: 0,
        cast: "Charlie Chaplin, Paulette Goddard, Henry Bergman",
        description: "The Tramp struggles to live in modern industrial society with the help of a young homeless woman."
    },
    {
        id: 30,
        title: "Once Upon a Time in the West",
        year: 1968,
        poster: "https://m.media-amazon.com/images/M/MV5BODQ3NDExOGYtMzI3Mi00NWRlLTkwNjAtNjc4OGY3MzViZDRhXkEyXkFqcGdeQXVyMjU4Mjg0MjE@._V1_SX300.jpg",
        rating: 0,
        cast: "Henry Fonda, Charles Bronson, Claudia Cardinale",
        description: "A mysterious stranger with a harmonica joins forces with a notorious desperado to protect a beautiful widow from a ruthless assassin working for the railroad."
    }
];

function App() {
    // State management
    const [darkMode, setDarkMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [wantToWatch, setWantToWatch] = useState([]);
    const [watched, setWatched] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const [showAllMovies, setShowAllMovies] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    // Load data from localStorage when component mounts
    useEffect(() => {
        const savedWantToWatch = localStorage.getItem('cinematracker-want-to-watch');
        const savedWatched = localStorage.getItem('cinematracker-watched');
        const savedDarkMode = localStorage.getItem('cinematracker-dark-mode');

        if (savedWantToWatch) {
            setWantToWatch(JSON.parse(savedWantToWatch));
        }
        if (savedWatched) {
            setWatched(JSON.parse(savedWatched));
        }
        if (savedDarkMode) {
            setDarkMode(JSON.parse(savedDarkMode));
        }
    }, []);

    // Save to localStorage whenever lists change
    useEffect(() => {
        localStorage.setItem('cinematracker-want-to-watch', JSON.stringify(wantToWatch));
    }, [wantToWatch]);

    useEffect(() => {
        localStorage.setItem('cinematracker-watched', JSON.stringify(watched));
    }, [watched]);

    useEffect(() => {
        localStorage.setItem('cinematracker-dark-mode', JSON.stringify(darkMode));
    }, [darkMode]);

    // Search functionality
    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term.trim()) {
            const filtered = MOCK_MOVIES.filter(movie =>
                movie.title.toLowerCase().includes(term.toLowerCase())
            );
            setSearchResults(filtered);
            setShowSearch(true);
            setShowAllMovies(false);
        } else {
            setSearchResults([]);
            setShowSearch(false);
        }
    };

    // Toggle showing all movies
    const toggleAllMovies = () => {
        setShowAllMovies(!showAllMovies);
        setShowSearch(false);
        setSearchTerm('');
    };

    // Add movie to want to watch list
    const addToWantToWatch = (movie) => {
        const newMovie = { ...movie, id: Date.now(), addedDate: new Date().toISOString() };
        setWantToWatch([...wantToWatch, newMovie]);
        setSearchTerm('');
        setShowSearch(false);
    };

    // Move movie from want to watch to watched
    const moveToWatched = (movieId) => {
        const movie = wantToWatch.find(m => m.id === movieId);
        if (movie) {
            setWatched([...watched, { ...movie, watchedDate: new Date().toISOString() }]);
            setWantToWatch(wantToWatch.filter(m => m.id !== movieId));
        }
    };

    // Move movie from watched back to want to watch
    const moveToWantToWatch = (movieId) => {
        const movie = watched.find(m => m.id === movieId);
        if (movie) {
            const { watchedDate, ...movieWithoutWatchedDate } = movie;
            setWantToWatch([...wantToWatch, movieWithoutWatchedDate]);
            setWatched(watched.filter(m => m.id !== movieId));
        }
    };

    // Delete movie from lists
    const deleteMovie = (movieId, list) => {
        if (list === 'wantToWatch') {
            setWantToWatch(wantToWatch.filter(m => m.id !== movieId));
        } else {
            setWatched(watched.filter(m => m.id !== movieId));
        }
    };

    // Update movie rating
    const updateRating = (movieId, rating, list) => {
        if (list === 'wantToWatch') {
            setWantToWatch(wantToWatch.map(m =>
                m.id === movieId ? { ...m, rating } : m
            ));
        } else {
            setWatched(watched.map(m =>
                m.id === movieId ? { ...m, rating } : m
            ));
        }
    };

    // Calculate statistics
    const totalMovies = wantToWatch.length + watched.length;
    const averageRating = watched.length > 0
        ? (watched.reduce((sum, movie) => sum + (movie.rating || 0), 0) / watched.length).toFixed(1)
        : 0;

    return (
        <div className={`app ${darkMode ? 'dark' : 'light'}`}>
            {/* Header */}
            <header className="header">
                <div className="header-content">
                    <h1 className="logo">
                        <span className="logo-icon">🎬</span> CineTracker
                    </h1>
                    <button
                        className="theme-toggle"
                        onClick={() => setDarkMode(!darkMode)}
                        aria-label="Toggle theme"
                    >
                        {darkMode ? '☀️' : '🌙'}
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="main-content">
                {/* Search Section */}
                <section className="search-section">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search for movies..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="search-input"
                        />
                        <span className="search-icon">🔍</span>
                    </div>

                    {/* Browse All Movies Button */}
                    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <button
                            className="add-button"
                            onClick={toggleAllMovies}
                            style={{ fontSize: '1rem', padding: '0.75rem 1.5rem' }}
                        >
                            {showAllMovies ? 'Hide All Movies' : '🎥 Browse All Movies (30)'}
                        </button>
                    </div>

                    {/* Search Results */}
                    {showSearch && (
                        <div className="search-results">
                            {searchResults.length > 0 ? (
                                searchResults.map(movie => (
                                    <div key={movie.id} className="search-result-item">
                                        <img src={movie.poster} alt={movie.title} className="search-poster" />
                                        <div className="search-info">
                                            <h3>{movie.title}</h3>
                                            <p>{movie.year}</p>
                                        </div>
                                        <button
                                            className="action-button"
                                            onClick={() => setSelectedMovie(movie)}
                                            style={{ marginRight: '0.5rem', backgroundColor: '#3498db' }}
                                        >
                                            ℹ️ Info
                                        </button>
                                        <button
                                            className="add-button"
                                            onClick={() => addToWantToWatch(movie)}
                                            disabled={wantToWatch.some(m => m.title === movie.title) || watched.some(m => m.title === movie.title)}
                                        >
                                            {wantToWatch.some(m => m.title === movie.title) || watched.some(m => m.title === movie.title) ? '✓ Added' : '+ Add'}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="no-results">No movies found</p>
                            )}
                        </div>
                    )}

                    {/* All Movies Display */}
                    {showAllMovies && (
                        <div className="search-results" style={{ maxWidth: '800px', maxHeight: '400px', overflowY: 'auto' }}>
                            {MOCK_MOVIES.map(movie => (
                                <div key={movie.id} className="search-result-item">
                                    <img src={movie.poster} alt={movie.title} className="search-poster" />
                                    <div className="search-info">
                                        <h3>{movie.title}</h3>
                                        <p>{movie.year}</p>
                                    </div>
                                    <button
                                        className="action-button"
                                        onClick={() => setSelectedMovie(movie)}
                                        style={{ marginRight: '0.5rem', backgroundColor: '#3498db' }}
                                    >
                                        ℹ️ Info
                                    </button>
                                    <button
                                        className="add-button"
                                        onClick={() => addToWantToWatch(movie)}
                                        disabled={wantToWatch.some(m => m.title === movie.title) || watched.some(m => m.title === movie.title)}
                                    >
                                        {wantToWatch.some(m => m.title === movie.title) || watched.some(m => m.title === movie.title) ? '✓ Added' : '+ Add'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Statistics */}
                <section className="stats-section">
                    <div className="stat-card">
                        <h3>Total Movies</h3>
                        <p className="stat-number">{totalMovies}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Movies Watched</h3>
                        <p className="stat-number">{watched.length}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Average Rating</h3>
                        <p className="stat-number">⭐ {averageRating}</p>
                    </div>
                </section>

                {/* Movie Lists */}
                <div className="lists-container">
                    {/* Want to Watch List */}
                    <section className="list-section">
                        <h2 className="list-title">📋 Want to Watch ({wantToWatch.length})</h2>
                        <div className="movies-grid">
                            {wantToWatch.map(movie => (
                                <MovieCard
                                    key={movie.id}
                                    movie={movie}
                                    onMove={() => moveToWatched(movie.id)}
                                    onDelete={() => deleteMovie(movie.id, 'wantToWatch')}
                                    onRatingChange={(rating) => updateRating(movie.id, rating, 'wantToWatch')}
                                    onShowDetails={() => setSelectedMovie(movie)}
                                    moveText="Mark as Watched"
                                    list="wantToWatch"
                                />
                            ))}
                        </div>
                        {wantToWatch.length === 0 && (
                            <p className="empty-message">No movies in your watchlist yet. Search and add some!</p>
                        )}
                    </section>

                    {/* Watched List */}
                    <section className="list-section">
                        <h2 className="list-title">✅ Watched ({watched.length})</h2>
                        <div className="movies-grid">
                            {watched.map(movie => (
                                <MovieCard
                                    key={movie.id}
                                    movie={movie}
                                    onMove={() => moveToWantToWatch(movie.id)}
                                    onDelete={() => deleteMovie(movie.id, 'watched')}
                                    onRatingChange={(rating) => updateRating(movie.id, rating, 'watched')}
                                    onShowDetails={() => setSelectedMovie(movie)}
                                    moveText="Move Back"
                                    list="watched"
                                />
                            ))}
                        </div>
                        {watched.length === 0 && (
                            <p className="empty-message">No watched movies yet. Start watching!</p>
                        )}
                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer className="footer">
                <p>“Never be limited by other people's limited imaginations.”</p>
            </footer>

            {/* Movie Details Modal */}
            {selectedMovie && (
                <MovieDetailsModal
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                    darkMode={darkMode}
                />
            )}
        </div>
    );
}

// MovieCard Component
function MovieCard({ movie, onMove, onDelete, onRatingChange, onShowDetails, moveText, list }) {
    return (
        <div className="movie-card">
            <img src={movie.poster} alt={movie.title} className="movie-poster" />
            <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-year">{movie.year}</p>

                {/* Star Rating */}
                <div className="star-rating">
                    {[1, 2, 3, 4, 5].map(star => (
                        <span
                            key={star}
                            className={`star ${movie.rating >= star ? 'filled' : ''}`}
                            onClick={() => onRatingChange(star)}
                        >
              ⭐
            </span>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="movie-actions">
                    <button
                        className="action-button"
                        onClick={onShowDetails}
                        style={{ backgroundColor: '#3498db', color: 'white', marginBottom: '0.5rem' }}
                    >
                        ℹ️ Details
                    </button>
                </div>
                <div className="movie-actions">
                    <button className="action-button move" onClick={onMove}>
                        {moveText}
                    </button>
                    <button className="action-button delete" onClick={onDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

// Movie Details Modal Component
function MovieDetailsModal({ movie, onClose, darkMode }) {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
                padding: '1rem'
            }}
            onClick={onClose}
        >
            <div
                style={{
                    backgroundColor: darkMode ? '#2d2d2d' : '#ffffff',
                    borderRadius: '10px',
                    padding: '2rem',
                    maxWidth: '600px',
                    width: '100%',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                    color: darkMode ? '#ecf0f1' : '#2c3e50',
                    position: 'relative'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        color: darkMode ? '#ecf0f1' : '#2c3e50',
                        opacity: 0.7,
                        transition: 'opacity 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = 1}
                    onMouseLeave={(e) => e.target.style.opacity = 0.7}
                >
                    ✖
                </button>

                <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    <img
                        src={movie.poster}
                        alt={movie.title}
                        style={{
                            width: '150px',
                            height: '225px',
                            objectFit: 'cover',
                            borderRadius: '5px',
                            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)'
                        }}
                    />
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <h2 style={{ marginBottom: '0.5rem', color: '#e74c3c' }}>{movie.title}</h2>
                        <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem', opacity: 0.8 }}>
                            📅 {movie.year}
                        </p>
                        <div style={{ marginBottom: '1rem' }}>
                            {[1, 2, 3, 4, 5].map(star => (
                                <span
                                    key={star}
                                    style={{
                                        fontSize: '1.2rem',
                                        opacity: movie.rating >= star ? 1 : 0.3
                                    }}
                                >
                                    ⭐
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ marginBottom: '0.5rem', color: '#e74c3c' }}>🎭 Cast</h3>
                    <p style={{ lineHeight: '1.6' }}>{movie.cast}</p>
                </div>

                <div>
                    <h3 style={{ marginBottom: '0.5rem', color: '#e74c3c' }}>📝 Description</h3>
                    <p style={{ lineHeight: '1.6' }}>{movie.description}</p>
                </div>
            </div>
        </div>
    );
}

export default App;