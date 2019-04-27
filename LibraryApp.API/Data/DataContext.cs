

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

        public DbSet<Borrow> Borrows { get; set; }

        protected  override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Borrow>().HasKey(b => new {b.BorrowerId, b.BookId, b.LoanDate});
            builder.Entity<Borrow>().HasOne(b => b.Borrower).WithMany(b => b.Books).HasForeignKey(b => b.BorrowerId).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Borrow>().HasOne(b => b.Book).WithMany(b => b.Borrowers).HasForeignKey(b => b.BookId).OnDelete(DeleteBehavior.Restrict);


        }


    }
}