export default class AppServerResponse {
  success: boolean;
  data?: { date: string, name: string }[];
  error?: { [key: string]: string[] };

  constructor(success, data?, error?) {
    this.success = success;
    this.data = data;
    this.error = error;
  }
}
