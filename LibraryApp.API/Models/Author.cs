using System;
using System.Collections.Generic;

namespace LibraryApp.API.Models
{
    public class Author
    {
        public int Id { get; set; }
        public string AuthorName { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public string Introduction { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PhotoURL { get; set; }
        public ICollection<Book> Books { get; set; }
    }
}