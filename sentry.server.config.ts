import * as Sentry from "@sentry/nuxt";
 
Sentry.init({
  dsn: "https://bf525889a4c2178ec45d750be338d6b4@o4509323868504064.ingest.us.sentry.io/4509323870470144",

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
  
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
