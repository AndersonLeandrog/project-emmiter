import React, { createContext, useContext } from "react";

const app = createContext({
   appInfo: {
      name: "Emmiter",
      version: "1.2.15-3",
   },
   appSocialInfo: {
      github: "andersonleandrog  ",
      githubProject: "@github/project-emmiter",
      facebook: "andersonlfb",
      twitter: "twitter.com/andersonldev1",
      pixKey: "3cdd66ab-6aa8-4761-bb98b4a48f94ea8aa"
   },
});

export default app;
