using System.Collections.Generic;
using System.Threading.Tasks;
using LibraryApp.API.Models;

namespace LibraryApp.API.Data
{
    public interface IBookShowRepository
    {
         void Add<T>(T entity) where T: class;

         void Delete<T> (T entity) where T: class;

         Task<bool> SaveAll();

         Task<IEnumerable<Book>> GetBooks();

         Task<Book> GetBook(int id);
    }
}