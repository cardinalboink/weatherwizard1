export type ApiSuccess = {
  city: string;
  days: number;
  averageTemperature: number;
  unit?: string;
  cached?: boolean;
};

export type ApiError = {
  error: {
    code?: string;
    message: string;
    details?: unknown;
  };
};

export type ToastType = "success" | "error";

export type ToastState = {
  message: string;
  type: ToastType;
};
