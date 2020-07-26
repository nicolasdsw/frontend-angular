export class PostFilter {
  any: string;
  id: number;
  title: string;
  body: string;
  userId: number;

  constructor(obj?: any) {
    if (obj) {
      this.any = obj.any;
      this.id = +obj.id;
      this.title = obj.title;
      this.body = obj.body;
      this.userId = obj.userId;
      if (isNaN(this.id)) {
        this.id = null;
      }
    }
  }
}
