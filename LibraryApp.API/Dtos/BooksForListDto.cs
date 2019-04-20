using System;
using LibraryApp.API.Models;

namespace LibraryApp.API.Dtos
{
    public class BooksForListDto
    {
        public int Id   { get; set; }
        public int Isbn { get; set; }
        public string BookName { get; set; }
        public string MainGenre { get; set; }
        public string SubGenre { get; set; }
        public DateTime PublishedDate { get; set; }
        public string IntroHilight { get; set; }
        public string IntroDetail { get; set; }
        public bool IsEbook { get; set; }
        public string PhotoURL {get; set;}
        public int AuthorId { get; set; }
        public string AuthorName {get; set;}

    }
}