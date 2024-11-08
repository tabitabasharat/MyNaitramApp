export interface GoogleUser {
  id: string; // Unique Google ID of the user
  email: string; // User's email address
  name: string; // User's full name
  picture: string; // URL to user's Google profile picture
  verified_email: boolean; // Whether the email is verified
}

export interface AuthResponse {
  user: GoogleUser | null;
  error?: string;
}
