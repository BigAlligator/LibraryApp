export interface Book {
    id: number;
    isbn: number;
    bookName: string;
    mainGenre: string;
    subGenre?: string;
    publishedDate: Date;
    introHilight: string;
    introDetail?: string;
    isEbook: boolean;
    photoURL: string;
    authorId: number;   
}
