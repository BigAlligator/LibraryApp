namespace LibraryApp.API.Helper
{
    public class BookParams
    {
        private const int MaxPageSize = 50;

        public int PageNumber { get; set; } = 1;

        private int pageSize = 12;

        public int PageSize
         { 
             get{return pageSize;}
             set{pageSize = (value > MaxPageSize) ? MaxPageSize : value ;}
         }

         public int UserId { get; set; }

         public string MainGenre { get; set; }

         public string BookName { get; set; }

         public string OrderBy { get; set; }

         public bool Loanbook { get; set; } = false;


    }
}