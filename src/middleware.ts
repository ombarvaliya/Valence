export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    '/map',
    '/dashboard',
    '/analytics',
    '/add-asset-visual', 
    '/analyze',
  ],
}