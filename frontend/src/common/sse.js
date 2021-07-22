import axios from 'axios';

export class sse {
  static instance;

  constructor(name) {
    if(this.instance) {
      this.destroy(name);
    }
    this.instance = new EventSource(`http://localhost:8888/sse?name=${name}`);
    return this.instance;
  }

  async destroy(name) {
    await axios.delete(`http://localhost:8888/sse?name=${name}`);
    return this.instance.close();
  }
}