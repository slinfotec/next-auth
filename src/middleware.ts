export { default } from "next-auth/middleware";
export const config = {
  matcher: ["/UserPost/:path*","/test/:path*"],
};
