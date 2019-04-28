using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LibraryApp.API.Helper;
using LibraryApp.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace LibraryApp.API.Data
{
    public class BookShowRepository : IBookShowRepository
    {
        private readonly DataContext _context;

        public BookShowRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Book> GetBook(int id)
        {
            var book = await _context.Books.FirstOrDefaultAsync(p => p.Id == id);
            return book;
        }

        public async Task<PagedList<Book>> GetBooks(BookParams bookParams)
        {
            var books =  _context.Books.OrderByDescending(u => u.PublishedDate).AsQueryable();
            
            if(bookParams.Loanbook)
            {
                var bookLoans = await GetBorrowBook(bookParams.UserId);
                books = books.Where(u => bookLoans.Contains(u.Id));
            }

            if(bookParams.BookName == "ALL" && bookParams.MainGenre == "ALL" )
            {
                if(!string.IsNullOrEmpty(bookParams.OrderBy))
                {
                    switch(bookParams.OrderBy)
                    {
                        case "A-Z":
                            books = books.OrderBy(u => u.BookName);
                            break;
                        default:
                            books = books.OrderByDescending(u => u.PublishedDate);
                            break;

                    }
                 }
                return await PagedList<Book>.CreateAsync(books, bookParams.PageNumber, bookParams.PageSize);
            }
            else if (bookParams.BookName == "ALL")
            {
                
                books = books.Where(p => p.MainGenre.ToLower() == bookParams.MainGenre.ToLower());
                if(!string.IsNullOrEmpty(bookParams.OrderBy))
                {
                    switch(bookParams.OrderBy)
                    {
                        case "A-Z":
                            books = books.OrderBy(u => u.BookName);
                            break;
                        default:
                            books = books.OrderByDescending(u => u.PublishedDate);
                            break;

                    }
                 }
                return await PagedList<Book>.CreateAsync(books, bookParams.PageNumber, bookParams.PageSize);
            }
            else if (bookParams.MainGenre == "ALL")
            {
                books = books.Where(p => p.BookName.ToLower().Contains(bookParams.BookName.ToLower()));
                if(!string.IsNullOrEmpty(bookParams.OrderBy))
                {
                    switch(bookParams.OrderBy)
                    {
                        case "A-Z":
                            books = books.OrderBy(u => u.BookName);
                            break;
                        default:
                            books = books.OrderByDescending(u => u.PublishedDate);
                            break;

                    }
                 }
                return await PagedList<Book>.CreateAsync(books, bookParams.PageNumber, bookParams.PageSize);
            }
            else
            {
                books = books.Where(p => p.MainGenre.ToLower() == bookParams.MainGenre.ToLower());
                books = books.Where(p => p.BookName.ToLower().Contains(bookParams.BookName.ToLower()));
                if(!string.IsNullOrEmpty(bookParams.OrderBy))
                {
                    switch(bookParams.OrderBy)
                    {
                        case "A-Z":
                            books = books.OrderBy(u => u.BookName);
                            break;
                        default:
                            books = books.OrderByDescending(u => u.PublishedDate);
                            break;

                    }
                 }
                return await PagedList<Book>.CreateAsync(books, bookParams.PageNumber, bookParams.PageSize);
            }
         
        }

        public async Task<Borrow> GetBorrow(int userId, int bookId)
        {
            return await _context.Borrows.Where(x => x.ReturnDate == DateTime.MinValue)
            .FirstOrDefaultAsync(u => u.BorrowerId == userId && u.BookId == bookId );
        }

        private async Task<IEnumerable<int>> GetBorrowBook(int id)
        {
            var user = await _context.Users.Include(x=> x.Books).FirstOrDefaultAsync(u => u.Id == id);

            return user.Books.Where(u => u.BorrowerId== id && u.ReturnDate == DateTime.MinValue).Select(i => i.BookId);

        }


        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<int> CountBorrow(int userId)
        {
            return await _context.Borrows.CountAsync( u => u.BorrowerId == userId && u.ReturnDate == DateTime.MinValue);
        }
    }
}