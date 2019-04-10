

using LibraryApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options ) : base(options)
        {
            
        }

        public DbSet<Value> Values { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Photo> Photos {get; set;}

        public DbSet<Book> Books { get; set; }

        public DbSet<Author> Authors { get; set; }

        public DbSet<BookLoan> BookLoans { get; set; }


    }
}