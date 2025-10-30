
export interface VehicleAd {
  id: number;
  title: string;
  price: number;
  year: number;
  mileage: number;
  location: string;
  imageUrls: string[];
  category: string;
  ownerId: string; // Changed to string to match Supabase User ID
  description: string;
}

export interface User {
  id: string; // Changed from number to string for Supabase Auth UUID
  name: string;
  email?: string; // Made optional as it's not in the 'profiles' table for all users
  phone?: string;
  address?: string;
  imageUrl?: string;
  favorites: number[];
}

export interface SearchCriteria {
  query: string;
  category: string;
  yearFrom: string;
  yearTo: string;
}

export interface BlogAuthor {
  name: string;
  imageUrl: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: BlogAuthor;
  date: string;
  category: string;
}

export interface Testimonial {
  id: number;
  authorName: string;
  authorImageUrl: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
}

export enum Page {
  Landing = 'LANDING',
  Login = 'LOGIN',
  Register = 'REGISTER',
  VerifyAccount = 'VERIFY_ACCOUNT',
  Home = 'HOME',
  Dashboard = 'DASHBOARD',
  PostAd = 'POST_AD',
  EditAd = 'EDIT_AD',
  Messages = 'MESSAGES',
  Profile = 'PROFILE',
  Contact = 'CONTACT',
  About = 'ABOUT',
  Terms = 'TERMS',
  Privacy = 'PRIVACY',
  SearchResults = 'SEARCH_RESULTS',
  Faq = 'FAQ',
  AdDetail = 'AD_DETAIL',
  Blog = 'BLOG',
  BlogPost = 'BLOG_POST',
  ForgotPassword = 'FORGOT_PASSWORD',
  AllAds = 'ALL_ADS',
}