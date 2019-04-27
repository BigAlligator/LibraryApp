using System;
using System.Collections.Generic;

namespace LibraryApp.API.Models
{
    public class Book
    {
        public int Id { get; set; }
        public int Isbn { get; set; }
        public string BookName { get; set; }
        public string MainGenre { get; set; }
        public string SubGenre { get; set; }
        public DateTime PublishedDate { get; set; }
        public string IntroHilight { get; set; }
        public string IntroDetail { get; set; }
        public bool IsEbook { get; set; }
        public string PhotoURL {get; set;}
        public Author Author { get; set; }
        public int AuthorId { get; set; }     
        public ICollection<Borrow> Borrowers { get; set; }   
    }
}