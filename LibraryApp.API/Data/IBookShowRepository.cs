using System.Collections.Generic;
using System.Threading.Tasks;
using LibraryApp.API.Helper;
using LibraryApp.API.Models;

namespace LibraryApp.API.Data
{
    public interface IBookShowRepository
    {
         void Add<T>(T entity) where T: class;

         void Delete<T> (T entity) where T: class;

         Task<bool> SaveAll();

         Task<PagedList<Book>> GetBooks(BookParams bookParams);

         Task<Book> GetBook(int id);

         Task<Borrow> GetBorrow(int userId, int bookId);

         Task<int> CountBorrow(int userId);
    }
}