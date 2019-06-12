export interface BookOfAuthor {
    id: number;
    isbn: number;
    bookName: string;
    mainGenre: string;
    subGenre?: string;
    publishedDate: Date;
}
