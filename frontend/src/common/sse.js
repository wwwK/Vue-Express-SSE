import axios from 'axios';

export class sse {
  static instance;
  static old_name;

  constructor(name) {
    if(this.instance) {
      this.destroy(name);
    }
    this.old_name = name;
    this.instance = new EventSource(`http://localhost:8888/sse?name=${name}`);
  }

  async destroy() {
    await axios.delete(`http://localhost:8888/sse?name=${this.old_name}`);
    this.instance.close();
    this.old_name = '';
  }

  getName() {
    return this.old_name
  }
}