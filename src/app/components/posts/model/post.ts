export class Post {
  id: number;
  title: string;
  body: string;
  userId: number;

  constructor(obj: any) {
    this.id = obj.id;
    this.title = obj.title;
    this.body = obj.body;
    this.userId = obj.userId;
  }
}
