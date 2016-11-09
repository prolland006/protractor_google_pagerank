export class Image {
  id: string;
  url: string;
  title: string;
  description: string;
  imageData: string;    // image data as "data:image/jpeg;base64,/9j/4AAQSkZ ..."

  constructor({id, url, title, description, imageData}: {
    id?: string, url?: string, title?: string, description?: string, imageData?: string
  }) {
    this.id = id;
    this.url = url;
    this.title = title;
    this.description = description;
    this.imageData = imageData;
  }
}
