using System.Collections.Generic;
using System.Threading.Tasks;
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

        public async Task<IEnumerable<Book>> GetBooks()
        {
            var books = await _context.Books.ToListAsync();
            return books;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}