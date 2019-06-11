namespace LibraryApp.API.Data
{
    public class BookLoanInfo
    {
        public string BookName { get; set; }
        public int BookSubId { get; set; }
        public string LoanStatus { get; set; }
        public string BookStatus { get; set; }
        public string LoanDocRef { get; set; }
        public string LoanDate { get; set; }
        public string ExpectReturnDate { get; set; }
    }
}