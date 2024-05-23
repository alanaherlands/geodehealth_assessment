import { ComplaintData } from "./Complaint";

export interface ApiResponse {
    hits: {
      hits: Array<{
        _source: ComplaintData;
      }>;
    };
  }