// mock the user api
const crypto = require("crypto");

interface ResponseError extends Error {
  status?: number;
}

const userFetcher = async () => {
  // delay 500 to simulate api response
  await new Promise((res) => setTimeout(res, 500));

  if (document.cookie.includes("swr-test-token=swr")) {
    const email = document.cookie
      .split("; ")
      .find((row) => row.startsWith("email="))
      ?.split("=")[1];

    let hash = crypto
      .createHash("md5")
      .update(email?.toLocaleLowerCase().trim())
      .digest("hex");

    const response = await fetch("/api/gravatar", {
      method: "POST",
      body: hash,
    });

    const gravatar = await response.json();

    let user: { name: string; email: string | undefined; avatar: string };

    if (gravatar && gravatar.entry && gravatar.entry.length > 0) {
      user = {
        name: gravatar.entry[0].preferredUsername || "Guest User",
        email: email,
        avatar: gravatar.entry[0].thumbnailUrl || "/images/astronaut.png",
      };
    } else {
      user = {
        name: "Guest User",
        email: email,
        avatar: "/images/astronaut.png",
      };
    }

    // authorized
    return user;
  }

  // not authorized
  const error: ResponseError = new Error("Not authorized!");
  error.status = 403;
  throw error;
};

export default userFetcher;
