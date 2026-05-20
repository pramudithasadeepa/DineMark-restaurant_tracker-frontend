export interface User {
    id: number;
    email: string;
    name: string;
  }
  
  export interface Restaurant {
    id: number;
    name: string;
    cuisine: string;
    location: string;
    priceRange: string;
    imageUrl?: string;
    status: 'want_to_try' | 'visited';
    rating?: number;
    review?: string;
    visitedDate?: Date;
    whatIOrdered?: string;
    recommendedDish?: string;
    pricePaid?: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface RestaurantInput {
    name: string;
    cuisine: string;
    location: string;
    priceRange: string;
    imageUrl?: string;
    status: string;
    rating?: number;
    review?: string;
    visitedDate?: Date;
    whatIOrdered?: string;
    recommendedDish?: string;
    pricePaid?: number;
  }
  
  export interface DashboardStats {
    total: number;
    visitedCount: number;
    wantToTryCount: number;
    averageRating: number;
  }
  
  export interface AuthResponse {
    token: string;
    user: User;
  }