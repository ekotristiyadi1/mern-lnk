export interface BaseResponse {
  data?: any;
  status?: number;
  message?: string | null;
}

export class BaseResponses {
  status: number;
  data: any;
  message: string | null;

  constructor({ data, status, message }: BaseResponse) {
    this.status = status ?? 200;
    this.data = data ?? null;
    this.message = message ?? '';
  }
}
