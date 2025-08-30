export { default } from "next-auth/middleware"

export const config = {
  // Add all pages you want to protect here
  matcher: [
    '/map',
    '/dashboard',
    '/analytics',
    '/add-asset-visual', 
    '/analyze',
  ],
}