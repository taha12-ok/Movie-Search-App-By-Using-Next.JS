"use client"; // Enables client-side rendering for this component

import { useState, ChangeEvent } from "react"; // Import useState and ChangeEvent from React
import { Input } from "@/components/ui/input"; // Import custom Input component
import { Button } from "@/components/ui/button"; // Import custom Button component
import { CalendarIcon, StarIcon } from "lucide-react"; // Import icons from lucide-react
import Image from "next/image"; // Import Next.js Image component
import ClipLoader from "react-spinners/ClipLoader";

// Define the MovieDetails type
type MovieDetails = {
    Title: string;
    Year: string;
    Plot: string;
    Poster: string;
    imdbRating: string;
    Genre: string;
    Director: string;
    Actors: string;
    Runtime: string;
    Released: string;
  };
  

export default function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    setMovieDetails(null);
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?t=${searchTerm}&apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.Response === "False") {
        throw new Error(data.Error);
      }
      setMovieDetails(data);
    } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg border border-gray-300">
        {/* Title of the Movie Search component */}
        <h1 className="text-4xl font-extrabold mb-2 text-center text-gray-800">
          Movie Search
        </h1>
        <p className="mb-6 text-center text-gray-600">
          Search for any movies and display details.
        </p>
        <div className="flex items-center mb-6">
          {/* Search input field */}
          <Input
            type="text"
            placeholder="Enter a movie title"
            value={searchTerm}
            onChange={handleChange}
            className="flex-1 mr-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          {/* Search button */}
          <Button
            onClick={handleSearch}
            className="px-4 py-2 bg-purple-700 text-white font-semibold rounded-lg shadow-md hover:bg-purple-800 transition duration-200 ease-in-out"
          >
            Search
          </Button>
        </div>
        {/* Loading spinner */}
        {loading && (
          <div className="flex justify-center items-center mb-4">
            <ClipLoader color="#6b46c1" />
          </div>
        )}
        {/* Error message */}
        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}. Please try searching for another movie.
          </div>
        )}
        {/* Movie details */}
        {movieDetails && (
          <div className="flex flex-col items-center">
            <div className="w-full mb-4">
              {/* Movie poster image */}
              <Image
                src={
                  movieDetails.Poster !== "N/A"
                    ? movieDetails.Poster
                    : "/placeholder.svg"
                }
                alt={movieDetails.Title}
                width={200}
                height={300}
                className="rounded-md shadow-md mx-auto"
              />
            </div>
            <div className="w-full text-center">
              <h2 className="text-2xl font-bold mb-2 text-gray-900">
                {movieDetails.Title}
              </h2>
              <p className="text-gray-600 mb-4 italic">{movieDetails.Plot}</p>
              {/* Movie details section */}
              <div className="flex justify-center items-center text-purple-600 mb-2">
                <CalendarIcon className="w-4 h-4 mr-1" />
                <span className="mr-4">{movieDetails.Year}</span>
                <StarIcon className="w-4 h-4 mr-1 fill-yellow-500" />
                <span>{movieDetails.imdbRating}</span>
              </div>
              <div className="flex justify-center items-center text-gray-600 mb-2">
                <span className="mr-4">
                  <strong>Genre:</strong> {movieDetails.Genre}
                </span>
              </div>
              <div className="flex justify-center items-center text-gray-600 mb-2">
                <span className="mr-4">
                  <strong>Director:</strong> {movieDetails.Director}
                </span>
              </div>
              <div className="flex justify-center items-center text-gray-600 mb-2">
                <span className="mr-4">
                  <strong>Actors:</strong> {movieDetails.Actors}
                </span>
              </div>
              <div className="flex justify-center items-center text-gray-600 mb-2">
                <span className="mr-4">
                  <strong>Runtime:</strong> {movieDetails.Runtime}
                </span>
              </div>
              <div className="flex justify-center items-center text-gray-600 mb-2">
                <span className="mr-4">
                  <strong>Released:</strong> {movieDetails.Released}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
