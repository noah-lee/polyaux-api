const corsOptions = {
  origin:
    process.env.NODE_ENV === "development" ? "*" : ["https://polyaux.fly.dev", "https://polyaux.com"],
};

export default corsOptions;
