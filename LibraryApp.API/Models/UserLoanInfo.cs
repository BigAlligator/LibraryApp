namespace LibraryApp.API.Models
{
    public class UserLoanInfo
    {
        public int LoanId { get; set; }
        public int BookId { get; set; }
        public string BookSubId { get; set; }
        public string BookName { get; set; }
        public string BookStatus { get; set; }
        public string LoanStatus { get; set; }
        public string FineMoney { get; set; }
        public string LoanDate { get; set; }
        public string ExpectReturnDate { get; set; }
        public string ActualReturnDate { get; set; }
        public string LoanDocNo { get; set; }
        public string ReturnDocNo { get; set; } 
    }
}