import allowedOrigins from './allowedOrigins';

const corsOptions = {
  origin: (origin: string, callback: (err: Error | null, success: boolean) => void) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  optionSuccessStatus: 200,
  methods: ['GET', 'PUT', 'POST'],
  credentials: true,
};

export default corsOptions;
