import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth) {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: "https://pryonaut.com" });
    }
  },
  isSatellite: true,
  signInUrl: "https://club.elestrals.dev/sign-in",
  domain: (url) => url.host,
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
