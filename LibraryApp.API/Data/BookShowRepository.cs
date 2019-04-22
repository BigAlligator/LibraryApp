using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LibraryApp.API.Helper;
using LibraryApp.API.Models;
using Microsoft.EntityFrameworkCore;

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

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}