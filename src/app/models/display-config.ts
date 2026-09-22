export interface DisplayConfig {
  hero: boolean;
  featuredMovies: boolean;
  topRatedMovies: boolean;
  recommendations: boolean;
}

export const DEFAULT_DISPLAY_CONFIG: DisplayConfig = {
  hero: true,
  featuredMovies: true,
  topRatedMovies: true,
  recommendations: true,
};
