using System;

namespace LibraryApp.API.Models
{
    public class Borrow
    {
        public int BorrowerId { get; set; }
        public int BookId { get; set; }
        public Book Book { get; set; }
        public User Borrower { get; set; }
        public DateTime LoanDate { get; set; }
        public DateTime ReturnDate { get; set;}

    }
}