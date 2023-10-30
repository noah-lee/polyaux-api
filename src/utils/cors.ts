const corsOptions = {
  origin:
    process.env.NODE_ENV === "development" ? "*" : "https://polyaux.fly.dev",
};

export default corsOptions;
