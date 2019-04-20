namespace LibraryApp.API.Helper
{
    public class BookParams
    {
        private const int MaxPageSize = 50;

        public int PageNumber { get; set; } = 1;

        private int pageSize = 2;

        public int PageSize
         { 
             get{return pageSize;}
             set{pageSize = (value > MaxPageSize) ? MaxPageSize : value ;}
          }


    }
}